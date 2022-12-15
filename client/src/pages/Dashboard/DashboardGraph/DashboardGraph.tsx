import React from "react";
import style from "./DashboardGraph.module.css";
import { Chart, ArcElement, Tooltip} from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip);

const config = {
  type: 'Doughnut',
  data: {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "#40b480",
          "#73e7b3",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 5,
        borderRadius: 6,
        spacing: 2,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    // radius: 100,
    cutout: 100,
  },
};
const DashboardGraph = () => {
  return (
    <div className={style["dashboard__graph"]}>
      <div className={style["dashboard__item"]}>
        <div className={style["dashboard__chart"]}>
          <Doughnut {...config}></Doughnut>
          <div className={style['dashboard__info']}>
            <h3 className={style["dashboard__heading"]}>Total</h3>
            <span className={style["dashboard__total-value"]}>${0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
