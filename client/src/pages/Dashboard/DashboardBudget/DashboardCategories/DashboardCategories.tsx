import React, { FormEvent, useState } from "react";
import { TransactionInterface } from "../../../../Interfaces/TransactionInterface";
import { CategoryInterface } from "../../../../Interfaces/CategoryInterface";
import style from "./DashboardCategories.module.css";
import Card from "../../../../components/UI/Card/Card";
import Button from "../../../../components/UI/Button/Button";
import DashboardCategory from "./DashboardCategory/DashboardCategory";
import { useForm } from "react-hook-form";
import axios from "axios";

const DashboardCategories = (props: {
  transactions: TransactionInterface[];
  categories: CategoryInterface[];
  totalSetBudget: number;
  totalSetIncome: number;
  isOverBudget: boolean;
  year: number;
  month: number;
  day: number;
  addCategory: (category: CategoryInterface) => void;
  onAddSubcategory: (
    subcategory: string,
    category: string,
    dateMonth: number,
    dateYear: number
  ) => void;
  onDeleteCategory: (
    category: string,
    dateMonth: number,
    dateYear: number
  ) => void;
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
  onCreateBudget: () => void;
  deleteTransactions: (transactionsToDelete: TransactionInterface[]) => void;
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [isFormShown, setisFormShown] = useState<boolean>(false);
  const [newCategoryInput, setNewCategoryInput] = useState<string>("");

  const showForm = () => {
    setisFormShown(true);
  };

  const hideForm = () => {
    setisFormShown(false);
    setNewCategoryInput("");
    reset();
  };

  const onSubmit = (data: any) => {
    let categoryTitle = data.category || newCategoryInput;
    let newCategory = {
      title: String(categoryTitle),
      subcategories: [],
      dateMonth: props.month,
      dateYear: props.year,
    };

    let valid = true;
    for (const cat of props.categories) {
      if (cat.title === categoryTitle) {
        valid = false;
      }
    }
    if (valid) {
      axios
        .post(
          "/dashboard/addCategory",
          {
            newCategory,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          props.addCategory(newCategory);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Category already exists");
    }

    setisFormShown(false);
    setNewCategoryInput("");
    reset();
  };

  const deleteCategory = (category: string) => {
    let categoryTitle = category.includes("/")
      ? category.replaceAll("/", "&dash")
      : category;
    axios
      .delete(
        `/dashboard/deleteCategory/${categoryTitle}/${props.month}/${props.year}/${props.day}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        props.onDeleteCategory(category, props.month, props.year);

        const filteredTransactions = props.transactions.filter(
          (trx) => trx.category === category
        );
        props.deleteTransactions(filteredTransactions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onAddSubcategory = (
    subcategory: string,
    category: string,
    dateMonth: number,
    dateYear: number
  ) => {
    props.onAddSubcategory(subcategory, category, dateMonth, dateYear);
  };

  const onUpdateBudget = (
    subcategory: {
      title: string;
      budget: number;
      dateMonth: number;
      dateYear: number;
    },
    category: string,
    budgetAmount: number
  ) => {
    props.onUpdateBudget(subcategory, category, budgetAmount);
  };

  const deleteTransactions = (transactionsToDelete: TransactionInterface[]) => {
    props.deleteTransactions(transactionsToDelete);
  };

  return (
    <section className={style["dashboard__categories"]}>
      {props.categories.length === 0 ? (
        <div className={style["start-budget-btn"]}>
          <Button
            onClick={props.onCreateBudget}
            type="button"
            kind="btn--secondary--green"
            value="Start Budget"
            disabled={false}
          ></Button>
        </div>
      ) : (
        <>
          {props.isOverBudget ? (
            <div className={style["budget-left"]}>
              <p style={{ color: "red" }}>
                <span className={style["budget-dollars"]}>
                  $
                  {(props.totalSetBudget - props.totalSetIncome).toLocaleString(
                    "en-US",
                    { maximumFractionDigits: 2, minimumFractionDigits: 2 }
                  )}{" "}
                </span>
                over budget
              </p>
            </div>
          ) : (
            <>
              {props.totalSetIncome === props.totalSetBudget ? (
                <div className={style["budget-left"]}>
                  <p style={{ color: "green" }}>You've got a Better Budget!</p>
                </div>
              ) : (
                <div className={style["budget-left"]}>
                  <p>
                    <span className={style["budget-dollars"]}>
                      $
                      {(
                        props.totalSetIncome - props.totalSetBudget
                      ).toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}{" "}
                    </span>
                    left to budget
                  </p>
                </div>
              )}
            </>
          )}
          {props.categories.map((category, index) => {
            return (
              <Card key={index}>
                <DashboardCategory
                  transactions={props.transactions}
                  category={category}
                  subcategories={category.subcategories}
                  year={props.year}
                  month={props.month}
                  day={props.day}
                  onDeleteCategory={deleteCategory}
                  onDeleteSubcategory={props.onDeleteSubcategory}
                  onAddSubcategory={onAddSubcategory}
                  onUpdateBudget={onUpdateBudget}
                  onUpdateCategory={props.onUpdateCategory}
                  onUpdateSubcategory={props.onUpdateSubcategory}
                  deleteTransactions={deleteTransactions}
                />
              </Card>
            );
          })}
          {isFormShown ? (
            <form
              className={style["dashboard__categories__form"]}
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                placeholder="New Category"
                value={newCategoryInput}
                {...register("category")}
                onChange={(event) => setNewCategoryInput(event.target.value)}
                required
              />
              <div className={style["form-buttons"]}>
                <Button
                  type="button"
                  value="Cancel"
                  kind="btn--secondary--transparent--dark"
                  modifier="btn--small"
                  disabled={false}
                  onClick={hideForm}
                ></Button>
                <Button
                  type="submit"
                  value="Add"
                  kind="btn--primary--green"
                  modifier="btn--small"
                  disabled={newCategoryInput ? false : true}
                ></Button>
              </div>
            </form>
          ) : (
            <Button
              type="submit"
              value="Add Category"
              kind="btn--primary--green"
              modifier="btn--small"
              disabled={false}
              onClick={showForm}
            ></Button>
          )}
        </>
      )}
    </section>
  );
};

export default DashboardCategories;
