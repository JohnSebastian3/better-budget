import axios from "axios";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { userContext } from "../../context/UserContext";
import { ExpenseInterface } from "../../Interfaces/ExpenseInterface";
import DashboardExpenseForm from "./DashboardExpenseForm/DashboardExpenseForm";
import DashboardExpenses from "./DashboardExpenses/DashboardExpenses";

export default function Dashboard() {
  const ctx = useContext(userContext);

  const [expenses, setExpenses] = useState<ExpenseInterface[]>([]);
  const [day, setDay] = useState<number>(new Date().getDate());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard", { withCredentials: true })
      .then((data) => {
        setExpenses(data.data);
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

  const addExpense = (expense: ExpenseInterface): void => {
    setExpenses((prev) => {
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
  }

  return (
    <div>
      <h3>Welcome back, {ctx.username}</h3>
      <button type="button" onClick={goToPrevMonth}>
        prev month
      </button>
      <h1>{months[month]}</h1>
      <h2>{year}</h2>
      <button type="button" onClick={goToNextMonth}>
        {" "}
        next month{" "}
      </button>
      <DashboardExpenseForm onAddExpense={addExpense} onChangeDay={changeDay} selectedMonth={month} selectedYear={year} selectedDay={day}/>
      <DashboardExpenses expenses={expenses} selectedMonth={month} selectedYear={year}/>
    </div>
  );
}
