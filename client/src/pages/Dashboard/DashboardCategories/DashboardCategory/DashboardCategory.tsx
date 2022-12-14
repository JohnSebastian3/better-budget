import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/UI/Button/Button";
import { TransactionInterface } from "../../../../Interfaces/TransactionInterface";
import style from "./DashboardCategory.module.css";
import DashboardSubcategory from "./DashboardSubcategory/DashboardSubcategory";
import { AiOutlineClose } from "react-icons/ai";
import { CategoryInterface } from "../../../../Interfaces/CategoryInterface";
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

  useEffect(() => {
    setSubcategories(props.subcategories);
  }, []);

  const transactions = props.transactions.filter((transaction) => {
    return transaction.category === props.category.title;
  });

  const onSubmit = (data: any) => {
    let newSubcategory = data.subcategory.toLowerCase();
    newSubcategory = newSubcategory[0].toUpperCase() + newSubcategory.slice(1);
    const subcategory = {
      title: newSubcategory,
      budget: 0,
      dateMonth: props.month,
      dateYear: props.year,
    };

    let valid = true;
    for(const subcat of props.category.subcategories) {
      if(subcat.title === newSubcategory) {
        valid = false;
      }
    }
    if(valid) {
      axios
      .post(
        `https://better-budget-production.up.railway.app/dashboard/addSubcategory/${props.category.title}`,
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
          for(const subcat of props.category.subcategories) {
            if(subcat.title === subcategory.title) {
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
      });
    } else {
      alert('Subcategory already exists');
    }
   

    reset();
    setIsFormShown(false);
  };

  const showForm = () => {
    setIsFormShown(true);
  };

  const hideForm = () => {
    setIsFormShown(false);
  };

  const deleteSubcategory = (subcategory: {
    title: string;
    budget: number;
  }) => {
    axios
      .delete(
        `http://localhost:4000/dashboard/deleteSubcategory/${props.category.title}/${subcategory.title}/${props.month}/${props.year}/${props.day}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const newSubcategories = props.subcategories.filter((currSubcategory) => {
            return currSubcategory.title !== subcategory.title;
        });
        setSubcategories(newSubcategories);
        props.onDeleteSubcategory(newSubcategories, props.category.title, props.month, props.year);

        props.deleteTransactions(transactions);
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

  return (
    <>
      <div className={style["income-header"]}>
        <h2>{props.category.title}</h2>
        {props.category.title !== "Income" &&
        props.category.title !== "Spending" ? (
          <AiOutlineClose
            size={"25px"}
            onClick={deleteCategory}
          ></AiOutlineClose>
        ) : (
          ""
        )}
      </div>
      <div>
        {props.subcategories.length === 0 ? (
          <p>No subcateogires. Add one now!</p>
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
              />
            );
          })}
          </>
        ) }
        
      </div>

      {isFormShown ? (
        <form
          className={style["dashboard__categories__form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Sub Category"
            {...register("subcategory")}
          />
          <button type="submit">Add</button>
          <button type="button" onClick={hideForm}>
            Cancel
          </button>
        </form>
      ) : (
        <Button
          type="submit"
          value="Add Subcategory"
          kind="btn--primary--green"
          disabled={false}
          onClick={showForm}
        ></Button>
      )}
    </>
  );
};

export default DashboardCategory;
