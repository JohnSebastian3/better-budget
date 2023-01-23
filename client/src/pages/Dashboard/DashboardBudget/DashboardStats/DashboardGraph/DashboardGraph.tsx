import React from "react";
import style from "./DashboardGraph.module.css";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip);

const DashboardGraph = (props: {
  totalExpenses: number;
  totalIncome: number;
}) => {
  const moneyLeft = props.totalIncome - props.totalExpenses;
  const config = {
    type: "Doughnut",
    data: {
      labels: ["Spent", "Remaining"],
      datasets: [
        {
          data: [
            moneyLeft > 0 ? props.totalIncome - moneyLeft : props.totalExpenses,
            props.totalExpenses > 0 && moneyLeft > 0
              ? props.totalIncome - props.totalExpenses
              : 1,
          ],
          backgroundColor: ["#ff6961", "#40b480"],
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
    <div className={style["dashboard-stats__graph"]}>
      <div className={style["dashboard__graph"]}>
        <div className={style["dashboard__item"]}>
          <div className={style["dashboard__chart"]}>
            <Doughnut {...config}></Doughnut>
            <div className={style["dashboard__info"]}>
              <span className={style["dashboard__total-value"]}>
                <div className={style["dashboard__spent"]}>
                  Spent: <br></br>$
                  {props.totalExpenses.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}{" "}
                  of ${props.totalIncome}
                </div>
                <br></br>
                <div className={style["dashboard__remaining"]}>
                  {moneyLeft < 0 ? (
                    <span style={{ color: "red" }}>
                      $
                      {Math.abs(moneyLeft).toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}{" "}
                      over spent
                    </span>
                  ) : (
                    <span>
                      Remaining: <br></br>$
                      {moneyLeft.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}{" "}
                    </span>
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
