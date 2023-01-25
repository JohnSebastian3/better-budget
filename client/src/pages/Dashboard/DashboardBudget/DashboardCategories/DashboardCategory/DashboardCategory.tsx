import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../../components/UI/Button/Button";
import { TransactionInterface } from "../../../../../Interfaces/TransactionInterface";
import style from "./DashboardCategory.module.css";
import DashboardSubcategory from "./DashboardSubcategory/DashboardSubcategory";
import { AiOutlineClose } from "react-icons/ai";
import { CategoryInterface } from "../../../../../Interfaces/CategoryInterface";
const DashboardCategory = (props: {
  transactions: TransactionInterface[];
  category: CategoryInterface;
  subcategories: {
    title: string;
    budget: number;
    dateMonth: number;
    dateYear: number;
  }[];
  year: number;
  month: number;
  day: number;
  onUpdateBudget: (
    subcategory: {
      title: string;
      budget: number;
      dateMonth: number;
      dateYear: number;
    },
    category: string,
    budgetAmount: number
  ) => void;
  onAddSubcategory: (
    newSubcategory: string,
    category: string,
    dateMonth: number,
    dateYear: number
  ) => void;
  onUpdateCategory: (
    oldTitle: string,
    newTitle: string,
    month: number,
    year: number
  ) => void;

  onUpdateSubcategory: (
    oldTitle: string,
    newTitle: string,
    category: string,
    month: number,
    year: number
  ) => void;
  onDeleteCategory: (category: string) => void;
  onDeleteSubcategory: (
    subcategories: {
      title: string;
      budget: number;
      dateMonth: number;
      dateYear: number;
    }[],
    category: string,
    dateMonth: number,
    dateYear: number
  ) => void;
  deleteTransactions: (transactionsToDelete: TransactionInterface[]) => void;
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [isFormShown, setIsFormShown] = useState<boolean>(false);
  const [subcategories, setSubcategories] = useState<
    { title: string; budget: number; dateMonth: number; dateYear: number }[]
  >([]);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [newSubcategoryInput, setNewSubcategoryInput] = useState<string>("");

  useEffect(() => {
    setSubcategories(props.subcategories);
    setCategoryTitle(props.category.title);
  }, []);

  const transactions = props.transactions.filter((transaction) => {
    return transaction.category === props.category.title;
  });

  const onSubmit = (data: any) => {
    let categoryTitle = props.category.title.includes("/")
      ? props.category.title.replaceAll("/", "&dash")
      : props.category.title;
    let newSubcategory = data.subcategory;
    const subcategory = {
      title: newSubcategory,
      budget: 0,
      dateMonth: props.month,
      dateYear: props.year,
    };

    let valid = true;
    for (const subcat of props.category.subcategories) {
      if (subcat.title === newSubcategory) {
        valid = false;
      }
    }
    if (valid) {
      axios
        .post(
          `https://better-budget-production.up.railway.app/dashboard/addSubcategory/${categoryTitle}`,
          {
            subcategory,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setSubcategories((prev) => {
            let foundDuplicate = false;
            for (const subcat of props.category.subcategories) {
              if (subcat.title === subcategory.title) {
                foundDuplicate = true;
              }
            }
            if (!foundDuplicate) {
              return [...prev, subcategory];
            } else {
              return [...prev];
            }
          });
          props.onAddSubcategory(
            newSubcategory,
            props.category.title,
            subcategory.dateMonth,
            subcategory.dateYear
          );
          reset();
        });
    } else {
      alert("Subcategory already exists");
    }

    reset();
    setIsFormShown(false);
  };

  const showForm = () => {
    setIsFormShown(true);
  };

  const hideForm = () => {
    setIsFormShown(false);
    setNewSubcategoryInput("");
    reset();
  };

  const deleteSubcategory = (subcategory: {
    title: string;
    budget: number;
  }, transactionsToDelete: TransactionInterface[]) => {
    let categoryTitle = props.category.title;
    if (categoryTitle.includes("/")) {
      categoryTitle = categoryTitle.replaceAll("/", "&dash");
    }

    let subcategoryTitle = subcategory.title;
    if (subcategoryTitle.includes("/")) {
      subcategoryTitle = subcategoryTitle.replaceAll("/", "&dash");
    }
    axios
      .delete(
        `https://better-budget-production.up.railway.app/dashboard/deleteSubcategory/${categoryTitle}/${subcategoryTitle}/${props.month}/${props.year}/${props.day}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const newSubcategories = props.subcategories.filter(
          (currSubcategory) => {
            return currSubcategory.title !== subcategory.title;
          }
        );
        setSubcategories(newSubcategories);
        props.onDeleteSubcategory(
          newSubcategories,
          props.category.title,
          props.month,
          props.year
        );

        props.deleteTransactions(transactionsToDelete);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCategory = () => {
    props.onDeleteCategory(props.category.title);
  };

  const onUpdateBudget = (
    subcategory: {
      title: string;
      budget: number;
      dateMonth: number;
      dateYear: number;
    },
    budgetAmount: number
  ) => {
    props.onUpdateBudget(subcategory, props.category.title, budgetAmount);
  };

  const updateCategoryTitle = (newTitle: string) => {
    let categoryTitle = props.category.title;
    if (categoryTitle.includes("/")) {
      categoryTitle = categoryTitle.replaceAll("/", "&dash");
    }

    axios
      .put(
        `http://localhost:4000/dashboard/updateCategory/${categoryTitle}/${props.year}/${props.month}`,
        { newTitle },
        { withCredentials: true }
      )
      .then((res) => {
        setCategoryTitle(newTitle);
        props.onUpdateCategory(
          props.category.title,
          newTitle,
          props.month,
          props.year
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={style["categories"]}>
      <div className={style["category-header"]}>
        <div className={style["header-title"]}>
          {!(categoryTitle === "Income") && !(categoryTitle === "Spending") ? (
            <input
              type="text"
              value={categoryTitle}
              className={style["category-title"]}
              onChange={(event) => setCategoryTitle(event.target.value)}
              onBlur={(event) => updateCategoryTitle(event.target.value)}
            />
          ) : (
            <h3 className={style["category-title-alternate"]}>
              {categoryTitle}
            </h3>
          )}
          {props.category.title !== "Income" &&
          props.category.title !== "Spending" ? (
            <div className={style["category-delete"]}>
              <AiOutlineClose
                size={"25px"}
                onClick={deleteCategory}
              ></AiOutlineClose>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={style["subcategory-info"]}>
        {props.subcategories.length === 0 ? (
          <p
            style={{
              padding: "2rem 0",
              fontSize: "1.75rem",
              color: "#666",
              fontStyle: "italic",
            }}
          >
            No subcateogires. Add one now!
          </p>
        ) : (
          <>
            {props.subcategories.map((subcategory, index) => {
              return (
                <DashboardSubcategory
                  key={index}
                  subcategory={subcategory}
                  transactions={transactions}
                  year={props.year}
                  month={props.month}
                  day={props.day}
                  category={props.category.title}
                  onDeleteSubcategory={deleteSubcategory}
                  onUpdateBudget={onUpdateBudget}
                  onUpdateSubcategory={props.onUpdateSubcategory}
                />
              );
            })}
          </>
        )}
      </div>

      {isFormShown ? (
        <form
          className={style["dashboard__subcategories__form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            value={newSubcategoryInput}
            placeholder="New Subcategory"
            {...register("subcategory")}
            onChange={(event) => setNewSubcategoryInput(event.target.value)}
            required
          />
          <div className={style["form-buttons"]}>
            <Button
              type="button"
              value="Cancel"
              kind="btn--secondary--transparent"
              modifier="btn--small"
              disabled={false}
              onClick={hideForm}
            ></Button>
            <Button
              type="submit"
              value="Add"
              kind="btn--primary--green"
              modifier="btn--small"
              disabled={newSubcategoryInput ? false : true}
            ></Button>
          </div>
        </form>
      ) : (
        <Button
          type="submit"
          value="Add Subcategory"
          kind="btn--secondary--green"
          modifier="btn--small"
          disabled={false}
          onClick={showForm}
        ></Button>
      )}
    </div>
  );
};

export default DashboardCategory;
