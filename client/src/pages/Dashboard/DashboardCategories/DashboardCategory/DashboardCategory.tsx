import React from 'react'
import { TransactionInterface } from '../../../../Interfaces/TransactionInterface'
import style from './DashboardCategory.module.css';
const DashboardCategory = (props: {transactions: TransactionInterface[]; category: string;}) => {
  const transactions = props.transactions.filter(transaction => {
    return transaction.category === props.category;
  })
 
  return (
    <>
    <div className={style['income-header']}>
      <h2>{props.category}</h2>
    </div>
    <ul>
      {transactions?.map((transaction, index) => {
        return <li key={index}>{transaction.title} for {transaction.value}</li>;
      })}
    </ul>
    
    </>
  )
}

export default DashboardCategory