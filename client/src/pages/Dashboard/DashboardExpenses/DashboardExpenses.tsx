import React from "react";
import ExpensesContext from "../../../context/ExpensesContext";
import { TransactionInterface } from "../../../Interfaces/TransactionInterface";
import DashboardExpensesList from "./DashboardExpensesList/DashboardExpensesList";
const DashboardExpenses = (props: {
  expenses: TransactionInterface[];
  totalExpenses: number;
  totalIncome: number;
}) => {
  return (
    <ExpensesContext>
      <DashboardExpensesList
        expenses={props.expenses}
        totalExpenses={props.totalExpenses}
        totalIncome={props.totalIncome}
      />
    </ExpensesContext>
  );
};

export default DashboardExpenses;
