import React, { useState } from "react";
import Button from "../../../../../components/UI/Button/Button";
import { CategoryInterface } from "../../../../../Interfaces/CategoryInterface";
import { TransactionInterface } from "../../../../../Interfaces/TransactionInterface";
import BudgetSummary from "./BudgetSummary/BudgetSummary";
import style from "./DashboardSummary.module.css";
import RemainingSummary from "./RemainingSummary/RemainingSummary";
import SpentSummary from "./SpentSummary/SpentSummary";

const DashboardSummary = (props: {
  categories: CategoryInterface[];
  transactions: TransactionInterface[];
}) => {
  const [currentTab, setCurrentTab] = useState<string>("Budget");

  return (
    <section className={style["dashboard-stats__summary"]}>
      <section className={style["summary-tabs"]}>
        <Button
          type="button"
          kind={`btn--tab--green`}
          modifier={currentTab === "Budget" ? "btn--tab--green--selected" : ""}
          value="Budget"
          disabled={false}
          onClick={() => setCurrentTab("Budget")}
        />
        <Button
          type="button"
          kind="btn--tab--green"
          modifier={currentTab === "Spent" ? "btn--tab--green--selected" : ""}
          value="Spent"
          disabled={false}
          onClick={() => setCurrentTab("Spent")}
        />
        <Button
          type="button"
          kind="btn--tab--green"
          modifier={
            currentTab === "Remaining" ? "btn--tab--green--selected" : ""
          }
          value="Remaining"
          disabled={false}
          onClick={() => setCurrentTab("Remaining")}
        />
      </section>
      <section className={style["summary-info"]}>
        {currentTab === "Budget" ? (
          <BudgetSummary
            categories={props.categories}
            transactions={props.transactions}
          />
        ) : currentTab === "Spent" ? (
          <SpentSummary
            categories={props.categories}
            transactions={props.transactions}
          />
        ) : (
          <RemainingSummary
            categories={props.categories}
            transactions={props.transactions}
          />
        )}
      </section>
    </section>
  );
};

export default DashboardSummary;
