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
  }

  return (
    <ul className={style["transactions-list"]}>
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
    </ul>
  );
};

export default DashboardTransactionList;
