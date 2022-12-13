import React, { useContext } from "react";
import { userContext } from "../../context/UserContext";
import DashboardExpenseForm from "./DashboardExpenseForm/DashboardExpenseForm";
import DashboardExpenses from "./DashboardExpenses/DashboardExpenses";

export default function Dashboard() {
  const ctx = useContext(userContext);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octover",
    "November",
    "December",
  ];
  return (
    <div>
      <h1>{months[new Date().getMonth()]}</h1>
      <h2>{new Date().getFullYear()}</h2>
      <DashboardExpenseForm />
      <DashboardExpenses />
    </div>
  );
}
