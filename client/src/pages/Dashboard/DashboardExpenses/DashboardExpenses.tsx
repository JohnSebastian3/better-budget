import React from "react";
import ExpensesContext from "../../../context/ExpensesContext";
import { ExpenseInterface } from "../../../Interfaces/ExpenseInterface";
import DashboardExpensesList from "./DashboardExpensesList/DashboardExpensesList";
const DashboardExpenses = (props: {
  expenses: ExpenseInterface[];
  selectedMonth: number;
  selectedYear: number;
}) => {
  return (
    <ExpensesContext>
      <DashboardExpensesList expenses={props.expenses} selectedMonth={props.selectedMonth} selectedYear={props.selectedYear} />
    </ExpensesContext>
  );
};

export default DashboardExpenses;
