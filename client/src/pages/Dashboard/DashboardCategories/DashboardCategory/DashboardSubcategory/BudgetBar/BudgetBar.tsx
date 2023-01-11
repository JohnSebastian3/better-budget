import React from "react";
import style from "./BudgetBar.module.css";

const BudgetBar = (props: {
  totalBudgetValue: number;
  currentValue: number;
  isIncome: boolean;
}) => {
  let barFillAmount = "0%";

  if (props.totalBudgetValue > 0) {
    if (props.totalBudgetValue - props.currentValue >= 0) {
      if (props.isIncome) {
        barFillAmount =
          Math.round((props.currentValue / props.totalBudgetValue) * 100) + "%";
      } else {
        barFillAmount =
          Math.round(
            ((props.totalBudgetValue - props.currentValue) /
              props.totalBudgetValue) *
              100
          ) + "%";
      }
    } else {
      barFillAmount = "0%";
    }
  } else {
    barFillAmount = "0%";
  }

  return (
    <div className={style["chart-bar"]}>
      {props.isIncome ? (
        <>
          <div className={style["chart-bar__label chart-bar--income"]}>
            <span>
              Received ${props.currentValue} of ${props.totalBudgetValue}
            </span>
          </div>
          <div className={style["chart-bar__inner"]}>
            <div
              className={style["chart-bar__fill"]}
              style={{ width: barFillAmount }}
            ></div>
          </div>
        </>
      ) : (
        <>
          <div className={style["chart-bar__label chart-bar--expense"]}>
            {props.totalBudgetValue - props.currentValue < 0 ? (
              <span style={{ color: "red" }}>
                ${Math.abs(props.totalBudgetValue - props.currentValue).toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2})} over
                budget
              </span>
            ) : (
              <span>
                $
                {(props.totalBudgetValue - props.currentValue).toLocaleString(
                  "en-US",
                  { maximumFractionDigits: 2, minimumFractionDigits: 2 }
                )}{" "}
                / ${props.totalBudgetValue} left
              </span>
            )}
          </div>
          <div className={style["chart-bar__inner"]}>
            <div
              className={style["chart-bar__fill"]}
              style={{ width: barFillAmount }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetBar;
