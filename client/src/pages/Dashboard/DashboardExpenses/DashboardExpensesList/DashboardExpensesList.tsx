import React from "react";
import { TransactionInterface } from "../../../../Interfaces/TransactionInterface";
// import { expensesContext } from "../../../../context/ExpensesContext";

const DashboardExpensesList = (props: {
  expenses: TransactionInterface[];
  totalExpenses: number;
  totalIncome: number;
}) => {
  // const ctx = useContext(expensesContext);

  return (
    <>
    <h1>Total spent this month ${props.totalExpenses} and you made ${props.totalIncome}</h1>
    <ul>
      {props.expenses.map((expense, index) => {
        return <li key={index}>{expense.title} for {expense.value}</li>;
      })}
    </ul>
    </>
  );
};

export default DashboardExpensesList;
