import React, { useState } from "react";
import { TransactionInterface } from "../../../Interfaces/TransactionInterface";
import { CategoryInterface } from "../../../Interfaces/CategoryInterface";
import style from "./DashboardCategories.module.css";
import Card from "../../../components/UI/Card/Card";
import Button from "../../../components/UI/Button/Button";
import DashboardCategory from "./DashboardCategory/DashboardCategory";
import { useForm } from "react-hook-form";
import axios from "axios";
const DashboardCategories = (props: {
  transactions: TransactionInterface[];
  categories: CategoryInterface[];
  year: number;
  month: number;
  day: number;
  addCategory: (category: CategoryInterface) => void;
  onAddSubcategory: (subcategory: string, category: string, dateMonth: number, dateYear: number) => void;
  onDeleteCategory: (category: string, dateMonth: number, dateYear: number) => void;
  onUpdateBudget: (
    subcategory: {
      title: string;
      budget: number;
      dateMonth: number;
      dateYear: number;
    },
    category: string,
    budgetAmount: number,
  ) => void;
  onCreateBudget: () => void;
  deleteTransactions: (transactionsToDelete: TransactionInterface[]) => void;
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [isFormShown, setisFormShown] = useState<boolean>(false);

  const showForm = () => {
    setisFormShown(true);
  };

  const hideForm = () => {
    setisFormShown(false);
  };

  const onSubmit = (data: any) => {
    let categoryTitle = data.category.toLowerCase();
    categoryTitle = categoryTitle[0].toUpperCase() + categoryTitle.slice(1);
    let newCategory = { title: String(categoryTitle), subcategories: [], dateMonth: props.month, dateYear: props.year };
    axios
      .post(
        "http://localhost:4000/dashboard/addCategory",
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

    reset();
    setisFormShown(false);
  };

  const deleteCategory = (category: string) => {
    axios
      .delete(`http://localhost:4000/dashboard/deleteCategory/${category}/${props.month}/${props.year}/${props.day}`, {
        withCredentials: true,
      })
      .then((res) => {
        props.onDeleteCategory(category, props.month, props.year);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onAddSubcategory = (subcategory: string, category: string, dateMonth: number, dateYear: number) => {
    props.onAddSubcategory(subcategory, category, dateMonth, dateYear);
  };

  const onUpdateBudget = (
    subcategory: { title: string; budget: number, dateMonth: number, dateYear: number },
    category: string,
    budgetAmount: number,
  ) => {
    props.onUpdateBudget(subcategory, category, budgetAmount);
  };

  const deleteTransactions = (transactionsToDelete: TransactionInterface[]) => {
    props.deleteTransactions(transactionsToDelete);
  }


  return (
    <div className={style["dashboard__categories"]}>
      {props.categories.length === 0 ? (
        <button onClick={props.onCreateBudget}>Start a budget here</button>
      ) : (
        <>
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
                onAddSubcategory={onAddSubcategory}
                onUpdateBudget={onUpdateBudget}
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
            <input type="text" placeholder="Category" {...register("category")} />
            <button type="submit">Add</button>
            <button type="button" onClick={hideForm}>
              Cancel
            </button>
          </form>
        ) : (
          <Button
            type="submit"
            value="Add Category"
            kind="btn--primary--green"
            disabled={false}
            onClick={showForm}
          ></Button>
        )}
      </>
      )}
    </div>
  );
};

export default DashboardCategories;
