import React, { useState } from "react";
import ExpensesContext from "../../../context/ExpensesContext";
import { TransactionInterface } from "../../../Interfaces/TransactionInterface";
import style from "./DashboardCategories.module.css";
import Card from "../../../components/UI/Card/Card";
import Button from "../../../components/UI/Button/Button";
import DashboardCategory from "./DashboardCategory/DashboardCategory";
import { useForm } from "react-hook-form";
const DashboardCategories = (props: {
  transactions: TransactionInterface[];
  totalExpenses: number;
  totalIncome: number;
}) => {
  const [categories, setCategories] = useState<string[]>([
    "Income",
    "Spending",
    "Bills",
    "Subscriptions",
    "Debt",
    "Charity",
  ]);
  
  const { register, handleSubmit, reset } = useForm();
  const [isFormShown, setisFormShown] = useState<boolean>(false);

  const showForm = () => {
    setisFormShown(true);
  }

  const hideForm = () => {
    setisFormShown(false);
  }

  const onSubmit = (data: any) => {
    setCategories((prev) => {
      return [...prev, data.category]
    })
    reset();
    setisFormShown(false);
  }

  return (
    <ExpensesContext>
      <div className={style["dashboard__categories"]}>
        {categories.map((category, index) => {
          return (
            <Card key={index}>
              <DashboardCategory
                transactions={props.transactions}
                category={category}
              />
            </Card>
          );
        })}

        {isFormShown ? (
           <form className={style['dashboard__categories__form']} onSubmit={handleSubmit(onSubmit)}>
           <input type="text" placeholder="Category" {...register('category')}/>
           <button type="submit">Add</button>
           <button type="button" onClick={hideForm}>Cancel</button>
         </form>
        ) : (
          <Button
          type="submit"
          value="Add Category"
          kind="btn--primary--green"
          onClick={showForm}
        ></Button>
        )}

       

      
      </div>
    </ExpensesContext>
  );
};

export default DashboardCategories;
