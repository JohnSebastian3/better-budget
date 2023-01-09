import axios from "axios";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { userContext } from "../../context/UserContext";
import { TransactionInterface } from "../../Interfaces/TransactionInterface";
import DashboardExpenseForm from "./DashboardTransactionForm/DashboardTransactionForm";
import DashboardExpenses from "./DashboardCategories/DashboardCategories";
import DashboardGraph from "./DashboardGraph/DashboardGraph";
import style from "./Dashboard.module.css";
import DashboardNav from "./DashboardNav/DashboardNav";
import DashboardBudget from "./DashboardBudget/DashboardBudget";
import DashboardStats from "./DashboardBudget/DashboardStats/DashboardStats";
export default function Dashboard() {
  const ctx = useContext(userContext);

  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [day, setDay] = useState<number>(new Date().getDate());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard", { withCredentials: true })
      .then((data) => {
        setTransactions(data.data.transactions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    setMonth(currentMonth);
    setYear(currentYear);
  }, []);

  const addExpense = (expense: TransactionInterface): void => {
    setTransactions((prev) => {
      return [...prev, expense];
    });
  };

  const goToNextMonth = () => {
    let nextMonth = 0;
    if (month === 11) {
      nextMonth = 0;
      setMonth(nextMonth);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const goToPrevMonth = () => {
    let prevMonth = 0;
    if (month === 0) {
      prevMonth = 11;
      setMonth(prevMonth);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const changeDay = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(new Date(event.target.value).getMonth());
    setDay(new Date(event.target.value).getUTCDate());
  };

  const filteredTransactions = transactions.filter(
    (expense: TransactionInterface) => {
      const expenseMonth = expense.dateMonth;
      const expenseYear = expense.dateYear;
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
    <div className={style.dashboard}>
      <DashboardNav />
      <DashboardBudget month={month} year={year} />
    </div>
  );
}
