import React from "react";
import { ExpenseInterface } from "../../../../Interfaces/ExpenseInterface";
// import { expensesContext } from "../../../../context/ExpensesContext";

const DashboardExpensesList = (props: {
  expenses: ExpenseInterface[];
  selectedMonth: number;
  selectedYear: number;
}) => {
  // const ctx = useContext(expensesContext);

  const filteredExpenses = props.expenses.filter((expense: ExpenseInterface) => {
    const expenseMonth = new Date(expense.date).getUTCMonth();
    const expenseYear = new Date(expense.date).getUTCFullYear();
    // console.log(`expense ${expense.title} was bought on ${expenseMonth}, ${expenseYear}`);
    return expenseMonth === props.selectedMonth && expenseYear === props.selectedYear;
  })

  const calculateFullExpenses = (expenses: ExpenseInterface[]) => {
    return expenses.reduce((acc, curr) => {
      return acc += curr.value;
    }, 0)
  }

  return (
    <>
    <h1>Total spent this month: {calculateFullExpenses(filteredExpenses)}</h1>
    <ul>
      {filteredExpenses.map((expense, index) => {
        return <li key={index}>{expense.title} for {expense.value}</li>;
      })}
    </ul>
    </>
  );
};

export default DashboardExpensesList;
