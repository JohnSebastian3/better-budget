import React from "react";
import style from "./BudgetBar.module.css";

const BudgetBar = (props: {
  totalBudgetValue: number;
  currentValue: number;
  isIncome: boolean;
}) => {
  let barFillAmount = "0%";

  if (props.totalBudgetValue > 0) {
    if(props.isIncome) {
      barFillAmount =
        Math.round((props.currentValue / props.totalBudgetValue) * 100) + "%";
    } else {
      barFillAmount = Math.round(((props.totalBudgetValue - props.currentValue) / props.totalBudgetValue) * 100) + "%";
    }
    
  }

  return (
    <div className={style["chart-bar"]}>
      {props.isIncome ? (
        <>
          <div className={style["chart-bar__label chart-bar--income"]}>
            Received ${props.currentValue} of ${props.totalBudgetValue}
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
            ${props.totalBudgetValue - props.currentValue} / $
            {props.totalBudgetValue} left
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
