import React from 'react'
import DashboardGraph from '../../DashboardGraph/DashboardGraph'
import style from './DashboardStats.module.css';
const DashboardStats = (props: {totalExpenses: number; totalIncome: number}) => {
  return (
    <div>
      <DashboardGraph totalExpenses={props.totalExpenses} totalIncome={props.totalIncome}/>
    </div>
  )
}

export default DashboardStats