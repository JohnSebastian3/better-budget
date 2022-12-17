import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import style from "./DashboardBudget.module.css";
import { userContext } from "../../../context/UserContext";
import { TransactionInterface } from "../../../Interfaces/TransactionInterface";
// import DashboardExpenseForm from "./DashboardExpenseForm/DashboardExpenseForm";
import DashboardExpenses from "../DashboardExpenses/DashboardExpenses";
import DashboardDate from "./DashboardDate/DashboardDate";
import DashboardStats from "./DashboardStats/DashboardStats";
import DashboardExpenseForm from "../DashboardExpenseForm/DashboardExpenseForm";
// import DashboardGraph from "./DashboardGraph/DashboardGraph";
// import DashboardNav from "./DashboardNav/DashboardNav";

const DashboardBudget = () => {
  const ctx = useContext(userContext);

  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [day, setDay] = useState<number>(new Date().getDate());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard", { withCredentials: true })
      .then((data) => {
        setTransactions(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const addExpense = (expense: TransactionInterface): void => {
    setTransactions((prev) => {
      return [...prev, expense];
    });
  };
  
  const setNewMonth = (month: number) => {
    setMonth(month);
  }

  const setNewYear = (year: number) => {
    setYear(year)
  }
  

  const changeDay = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(new Date(event.target.value).getMonth());
    setDay(new Date(event.target.value).getUTCDate());
  };

  const filteredTransactions = transactions.filter(
    (expense: TransactionInterface) => {
      const expenseMonth = new Date(expense.date).getUTCMonth();
      const expenseYear = new Date(expense.date).getUTCFullYear();
      // console.log(`expense ${expense.title} was bought on ${expenseMonth}, ${expenseYear}`);
      return expenseMonth === month && expenseYear === year;
    }
  );

  const totalExpenses = filteredTransactions.reduce((acc, curr) => {
    if (!curr.isIncome) {
      return (acc += curr.value);
    } else {
      return acc;
    }
  }, 0);

  const totalIncome = filteredTransactions.reduce((acc, curr) => {
    if (curr.isIncome) {
      return (acc += curr.value);
    } else {
      return acc;
    }
  }, 0);

  return (
    <div className={style["dashboard__budget"]}>
      <div className={style["dashboard__content"]}>
        <DashboardDate
          setNewMonth={setNewMonth}
          setNewYear={setNewYear}
          month={month}
          year={year}
        />
        <DashboardExpenses
          expenses={filteredTransactions}
          totalExpenses={totalExpenses}
          totalIncome={totalIncome}
        />
      </div>
      <div className={style['dashboard__stats']}>
      <DashboardStats totalExpenses={totalExpenses} totalIncome={totalIncome}/>
      <DashboardExpenseForm
          onAddExpense={addExpense}
          onChangeDay={changeDay}
          selectedMonth={month}
          selectedYear={year}
          selectedDay={day}
        />
      </div>
    </div>
  );
};

export default DashboardBudget;
