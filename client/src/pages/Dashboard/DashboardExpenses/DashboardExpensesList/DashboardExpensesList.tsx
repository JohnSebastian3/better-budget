import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ExpenseInterface } from "../../../../Interfaces/ExpenseInterface";
// import { expensesContext } from "../../../../context/ExpensesContext";

const DashboardExpensesList = () => {
  // const ctx = useContext(expensesContext);

  // LIFT STATE UP TO MAIN DASHBOARD COMPONENT TO BE ABLE TO SET STATE CORRECTLY AND REFRESU AUTO
  const [expenses, setExpenses] = useState<ExpenseInterface[]>([]);
  useEffect(() => {
    console.log('getting expenses');
    axios
      .get("http://localhost:4000/dashboard", { withCredentials: true })
      .then((data) => {
        setExpenses(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [])
  return (
  <ul>
    {expenses.map((expense, index) => {
      return <li key={index}>{expense?.title}</li>
    })}
  </ul>
  );
};

export default DashboardExpensesList;
