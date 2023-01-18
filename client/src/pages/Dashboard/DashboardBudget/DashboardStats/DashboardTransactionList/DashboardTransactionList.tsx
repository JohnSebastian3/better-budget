import React, { useState } from "react";
import style from "./DashboardTransactionList.module.css";
import { TransactionInterface } from "../../../../../Interfaces/TransactionInterface";
import DashboardTransactionItem from "./DashboardTransactionItem/DashboardTransactionItem";
const DashboardTransactionList = (props: {
  transactions: TransactionInterface[];
  onDeleteTransaction: (transaction: TransactionInterface) => void;
}) => {
  const reversedTransactions = [...props.transactions].reverse();

  const onDeleteTransaction = (transaction: TransactionInterface) => {
    props.onDeleteTransaction(transaction);
  };

  return (
    <div className={style["dashboard-stats__transactions"]}>
      <ul className={style["transactions-list"]}>
        {props.transactions.length > 0 ? (
          <>
            {reversedTransactions.map((transaction, index) => {
              return (
                <li key={index} className={style["transactions-item"]}>
                  <DashboardTransactionItem
                    transaction={transaction}
                    onDeleteTransaction={onDeleteTransaction}
                  ></DashboardTransactionItem>
                </li>
              );
            })}
          </>
        ) : (
          <div className={style["empty-msg"]}>
            <span>No transactions</span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default DashboardTransactionList;
