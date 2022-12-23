import React from 'react'
import { TransactionInterface } from '../../../../../Interfaces/TransactionInterface';

const DashboardSubcategory = (props: {
  subcategory: string;
  transactions: TransactionInterface[];
}) => {

  let transactions = props.transactions.filter(transaction => {
    return transaction.subcategory === props.subcategory;
  })

  return (
    <div>
    <h3>{props.subcategory}</h3>
    <ul>
    {transactions?.map((transaction, index) => {
      return (
        <li key={index}>
          {transaction.title} for {transaction.value}
        </li>
      );
    })}
  </ul>
    </div>
  )
}

export default DashboardSubcategory