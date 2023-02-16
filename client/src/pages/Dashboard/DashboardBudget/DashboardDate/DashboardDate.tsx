import React, { useContext, useEffect } from "react";
import Button from "../../../../components/UI/Button/Button";
import { userContext } from "../../../../context/UserContext";
import style from "./DashboardDate.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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
    <section className={style["dashboard__date"]}>
      <div className={style["dashboard__date__container"]}>
        <button
          type="button"
          onClick={goToPrevMonth}
          className={style["dashboard__month-control"]}
        >
          <IoIosArrowBack size={"30px"} />
        </button>
        <div className={style["dashboard__date__current"]}>
          <h1 className={style["dashboard__date__month"]}>
            {months[props.month]}
          </h1>
          <h2 className={style["dashboard__date__year"]}>{props.year}</h2>
        </div>
        <button
          type="button"
          onClick={goToNextMonth}
          className={style["dashboard__month-control"]}
        >
          <IoIosArrowForward size={"30px"} />
        </button>
      </div>
    </section>
  );
};

export default DashboardDate;
