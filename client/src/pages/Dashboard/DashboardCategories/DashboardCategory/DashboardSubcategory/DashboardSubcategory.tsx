import axios from "axios";
import React, { useState } from "react";
import { TransactionInterface } from "../../../../../Interfaces/TransactionInterface";
import style from "./DashboardSubcategory.module.css";
const DashboardSubcategory = (props: {
  subcategory: string;
  category: string;
  transactions: TransactionInterface[];
}) => {
  let transactions = props.transactions.filter((transaction) => {
    return transaction.subcategory === props.subcategory;
  });

  const [deleteIsVisible, setDeleteIsVisible] = useState<boolean>(false);

  const showDeleteOption = (event: any) => {
    setDeleteIsVisible(true);
  };

  const hideDeleteOption = (event: any) => {
    setDeleteIsVisible(false);
  };

  const deleteSubcategory = () => {
    axios.delete(`http://localhost:4000/dashboard/deleteSubcategory/${props.category}/${props.subcategory}`)
  }

  return (
    <div className={style["dashboard__subcategory"]}>
      <div
        className={style.test}
        onMouseOver={(event) => showDeleteOption(event)}
        onMouseLeave={(event) => hideDeleteOption(event)}
      >
        <h3>{props.subcategory}</h3>
        {deleteIsVisible ? <a onClick={deleteSubcategory}>Delete</a> : ""}
      </div>
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
  );
};

export default DashboardSubcategory;
