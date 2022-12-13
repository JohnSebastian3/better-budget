import React from "react";
import ExpensesContext from "../../../context/ExpensesContext";
import DashboardExpensesList from "./DashboardExpensesList/DashboardExpensesList";
const DashboardExpenses = () => {
  return (
    <ExpensesContext>
      <DashboardExpensesList />
    </ExpensesContext>
  );
};

export default DashboardExpenses;
