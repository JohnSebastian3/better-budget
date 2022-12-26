import React from "react";
import style from "./DashboardGraph.module.css";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip);

const DashboardGraph = (props: {
  totalExpenses: number;
  totalIncome: number;
}) => {
  const moneyLeft =
    props.totalIncome - props.totalExpenses ;
  const config = {
    type: "Doughnut",
    data: {
      labels: ["Amount Spent", "Amount Left"],
      datasets: [
        {
          data: [
            props.totalExpenses < props.totalIncome
            ? props.totalExpenses
            : Math.abs(moneyLeft),
            props.totalExpenses > 0 ? moneyLeft  > 0 ? moneyLeft : props.totalIncome - Math.abs(moneyLeft) : 1,
          ],
          backgroundColor: [
            "#ff6961",
            moneyLeft >= 0 ? "#40b480" : '#dedede',
          ],
          hoverOffset: 5,
          borderRadius: 6,
          spacing: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      cutout: 100,
    },
  };

  return (
    <div className={style["dashboard__graph"]}>
      <div className={style["dashboard__item"]}>
        <div className={style["dashboard__chart"]}>
          <Doughnut {...config}></Doughnut>
          <div className={style["dashboard__info"]}>
            <h3 className={style["dashboard__heading"]}>Total</h3>
            <span className={style["dashboard__total-value"]}>
              Spent: ${props.totalExpenses} of ${props.totalIncome}
              <br></br>
              Left: ${moneyLeft}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
