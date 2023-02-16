import React, { useState } from "react";
import Button from "../../../../components/UI/Button/Button";
import { CategoryInterface } from "../../../../Interfaces/CategoryInterface";
import { TransactionInterface } from "../../../../Interfaces/TransactionInterface";
import DashboardGraph from "./DashboardGraph/DashboardGraph";
import style from "./DashboardStats.module.css";
import DashboardSummary from "./DashboardSummary/DashboardSummary";
import DashboardTransactionList from "./DashboardTransactionList/DashboardTransactionList";
const DashboardStats = (props: {
  totalExpenses: number;
  totalIncome: number;
  transactions: TransactionInterface[];
  categories: CategoryInterface[];
  onDeleteTransaction: (transaction: TransactionInterface) => void;
  onUpdateTransactionTitle: (
    newTitle: string,
    transaction: TransactionInterface
  ) => void;
  onUpdateTransactionValue: (
    newValue: number,
    transaction: TransactionInterface
  ) => void;
}) => {
  const [currentlySelected, setCurrentlySelected] = useState<string>("Graph");

  const setSelectedTransactions = () => {
    setCurrentlySelected("Transactions");
  };

  const setSelectedGraph = () => {
    setCurrentlySelected("Graph");
  };

  const onDeleteTransaction = (transaction: TransactionInterface) => {
    props.onDeleteTransaction(transaction);
  };

  return (
    <section className={style["dashboard-stats"]}>
      <div className={style["dashboard-stats__controls__wrapper"]}>
        <div className={style["dashboard-stats__controls"]}>
          <Button
            type="button"
            onClick={setSelectedGraph}
            value="Breakdown"
            kind={`btn--tab--green`}
            modifier={`${
              currentlySelected === "Graph" ? "btn--tab--green--selected" : ""
            }`}
            disabled={false}
          />
          <Button
            type="button"
            onClick={setSelectedTransactions}
            value="Transactions"
            kind={`btn--tab--green`}
            modifier={`${
              currentlySelected === "Transactions"
                ? "btn--tab--green--selected"
                : ""
            }`}
            disabled={false}
          />
        </div>

        <>
          {currentlySelected === "Graph" ? (
            <>
              <DashboardGraph
                totalExpenses={props.totalExpenses}
                totalIncome={props.totalIncome}
              />
              <DashboardSummary
                categories={props.categories}
                transactions={props.transactions}
              ></DashboardSummary>
            </>
          ) : (
            <DashboardTransactionList
              transactions={props.transactions}
              onDeleteTransaction={onDeleteTransaction}
              onUpdateTransactionTitle={props.onUpdateTransactionTitle}
              onUpdateTransactionValue={props.onUpdateTransactionValue}
            ></DashboardTransactionList>
          )}
        </>
      </div>
    </section>
  );
};

export default DashboardStats;
