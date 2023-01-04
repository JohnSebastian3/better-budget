import React, { ChangeEvent, useState } from "react";
import { TransactionInterface } from "../../../../../Interfaces/TransactionInterface";
import {FaRegTrashAlt} from 'react-icons/fa';
import style from "./DashboardSubcategory.module.css";
const DashboardSubcategory = (props: {
  subcategory: string;
  category: string;
  transactions: TransactionInterface[];
  onDeleteSubcategory: (subcategory: string) => void;
}) => {
  let transactions = props.transactions.filter((transaction) => {
    return transaction.subcategory === props.subcategory;
  });

  const [subcategoryDeleteIsVisible, setSubcategoryDeleteIsVisible] = useState<boolean>(false);
  const [transactionDeleteIsVisible, setTransactionDeleteIsVisible] = useState<boolean>(false);
  const [budgetAmount, setBudgetAmount] = useState<number>(0);

  const showSubcategoryDeleteOption = (event: any) => {
    setSubcategoryDeleteIsVisible(true);
  };

  const hideSubcategoryDeleteOption = (event: any) => {
    setSubcategoryDeleteIsVisible(false);
  };

  const showTransactionDeleteOption = (event: any) => {
    setTransactionDeleteIsVisible(true);
  };

  const hideTransactionDeleteOption = (event: any) => {
    setTransactionDeleteIsVisible(false);
  };

  const onDeleteSubcategory = () => {
    props.onDeleteSubcategory(props.subcategory);
  }

  const setBudget = (event: ChangeEvent<HTMLInputElement>) => {
    setBudgetAmount(Number(event.target.value));
  }
 

  return (
    <div className={style["dashboard__subcategory"]}>
      <div
        className={style.test}
        onMouseOver={(event) => showSubcategoryDeleteOption(event)}
        onMouseLeave={(event) => hideSubcategoryDeleteOption(event)}
      >
        <h3>{props.subcategory}</h3>
        <input type="text" value={budgetAmount} onChange={(event) => setBudget(event)} placeholder={String(budgetAmount)}/>
        {subcategoryDeleteIsVisible ? <a onClick={onDeleteSubcategory} className={style.testtwo}>X</a> : ""}
      </div>
      <ul>
        {transactions?.map((transaction, index) => {
          return (
            <li key={index} className={style['dashboard__transaction']}
            onMouseOver={(event) => showTransactionDeleteOption(event)}
            onMouseLeave={(event) => hideTransactionDeleteOption(event)}
            >
              <div>
              {transaction.title} for {transaction.value}
              </div>
              <div>
                {transactionDeleteIsVisible ? (
                  <FaRegTrashAlt size={"15px"}></FaRegTrashAlt>
                ) : (
                  ''
                )}
                
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DashboardSubcategory;
