import React, { useContext, useEffect } from "react";
import { userContext } from "../../../../context/UserContext";
import style from "./DashboardDate.module.css";
const DashboardDate = (props: {
  setNewMonth: (month: number) => void;
  setNewYear: (year: number) => void;
  month: number;
  year: number;
}) => {
  const ctx = useContext(userContext);

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
    props.setNewMonth(currentMonth);
    props.setNewYear(currentYear);
  }, []);

  const goToNextMonth = () => {
    let nextMonth = 0;
    if (props.month === 11) {
      nextMonth = 0;
      props.setNewMonth(nextMonth);
      props.setNewYear(props.year + 1);
    } else {
      props.setNewMonth(props.month + 1);
    }
  };


  const goToPrevMonth = () => {
    let prevMonth = 0;
    if (props.month === 0) {
      prevMonth = 11;
      props.setNewMonth(prevMonth);
      props.setNewYear(props.year - 1);
    } else {
      props.setNewMonth(props.month - 1);
    }
  };

  return (
    <div className="dashboard__date">
      <h3>Welcome back, {ctx.username}</h3>
      <button type="button" onClick={goToPrevMonth}>
        prev month
      </button>
      <h1>{months[props.month]}</h1>
      <h2>{props.year}</h2>
      <button type="button" onClick={goToNextMonth}>
        {" "}
        next month{" "}
      </button>
    </div>
  );
};

export default DashboardDate;
