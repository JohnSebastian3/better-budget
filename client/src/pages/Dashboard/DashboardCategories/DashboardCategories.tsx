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
    let newCategory = {
      title: String(categoryTitle),
      subcategories: [],
      dateMonth: props.month,
      dateYear: props.year,
    };

    let valid = true;
    for(const cat of props.categories) {
      if(cat.title === categoryTitle) {
        valid = false;
      }
    }
    if(valid) {
      axios
      .post(
        "https://better-budget-production.up.railway.app/dashboard/addCategory",
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
      //PLaceholder for now
      alert('Category already exists');
    }
    
    reset();
    setisFormShown(false);
  };

  const deleteCategory = (category: string) => {
    axios
      .delete(
        `https://better-budget-production.up.railway.app/dashboard/deleteCategory/${category}/${props.month}/${props.year}/${props.day}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        props.onDeleteCategory(category, props.month, props.year);
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
    <div className={style["dashboard__categories"]}>
      {props.categories.length === 0 ? (
        <button onClick={props.onCreateBudget}>Start a budget here</button>
      ) : (
        <>
        {props.isOverBudget ? (
        <p style={{color: 'red'}}>${(props.totalSetBudget - props.totalSetIncome).toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2})} over budget</p>
      ) : (
        <>
        {props.totalSetIncome === props.totalSetBudget ? (
          <p style={{color: 'green'}}>You've got a Better Budget!</p>
        ) : (
          <p>${(props.totalSetIncome - props.totalSetBudget).toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2})} left to budget</p>
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
                placeholder="Category"
                {...register("category")}
              />
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
