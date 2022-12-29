import React from 'react'
import style from 'DashboardTransactionList.module.css';
import { TransactionInterface } from '../../../../../Interfaces/TransactionInterface';
const DashboardTransactionList = (props: {transactions: TransactionInterface[]}) => {
  const reversedTransactions = [...props.transactions].reverse();
  return (
    <ul>
      {reversedTransactions.map((transaction, index) => {
        return <li key={index}>{transaction.title}</li>
      })}
    </ul>
  )

}

export default DashboardTransactionList