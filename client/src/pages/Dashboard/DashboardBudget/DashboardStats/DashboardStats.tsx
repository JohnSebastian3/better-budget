import React, { useState } from "react";
import Button from "../../../../components/UI/Button/Button";
import { TransactionInterface } from "../../../../Interfaces/TransactionInterface";
import DashboardGraph from "./DashboardGraph/DashboardGraph";
import style from "./DashboardStats.module.css";
import DashboardTransactionList from "./DashboardTransactionList/DashboardTransactionList";
const DashboardStats = (props: {
  totalExpenses: number;
  totalIncome: number;
  transactions: TransactionInterface[];
  onDeleteTransaction: (transaction: TransactionInterface) => void;
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
  }

  return (
    <div className={style["dashboard-stats"]}>
      <div className={style["dashboard-stats__controls"]}>
        <Button
          type="button"
          onClick={setSelectedGraph}
          value="Breakdown"
          kind={`btn--tab--green`}
          modifier={`${
            currentlySelected === "Graph"
              ? "btn--tab--green-selected"
              : ""
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
              ? "btn--tab--green-selected"
              : ""
          }`}
          disabled={false}
        />
      </div>
      <>
        {currentlySelected === "Graph" ? (
          <div className={style["dashboard-stats__graph"]}>
            <DashboardGraph
              totalExpenses={props.totalExpenses}
              totalIncome={props.totalIncome}
            />
          </div>
        ) : (
          <div className={style['dashboard-stats__transactions']}>
            <DashboardTransactionList
              transactions={props.transactions}
              onDeleteTransaction={onDeleteTransaction}
            ></DashboardTransactionList>
          </div>
        )}
      </>
    </div>
  );
};

export default DashboardStats;
