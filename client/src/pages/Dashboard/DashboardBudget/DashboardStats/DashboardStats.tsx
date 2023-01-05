import React, { useState } from 'react'
import { TransactionInterface } from '../../../../Interfaces/TransactionInterface';
import DashboardGraph from '../../DashboardGraph/DashboardGraph'
import style from './DashboardStats.module.css';
import DashboardTransactionList from './DashboardTransactionList/DashboardTransactionList';
const DashboardStats = (props: {totalExpenses: number; totalIncome: number, transactions: TransactionInterface[]}) => {

  const [currentlySelected, setCurrentlySelected] = useState<string>('Graph');

  return (
    <div>
      {currentlySelected === 'Graph'? (
              <DashboardGraph totalExpenses={props.totalExpenses} totalIncome={props.totalIncome}/>

      ) : (
          <DashboardTransactionList transactions={props.transactions}></DashboardTransactionList>
      )}
      <button onClick={() => setCurrentlySelected('Graph')}>Graph</button>
      <button onClick={() => setCurrentlySelected('Transactions')}>Transactions</button>
    </div> 
  )
}

export default DashboardStats