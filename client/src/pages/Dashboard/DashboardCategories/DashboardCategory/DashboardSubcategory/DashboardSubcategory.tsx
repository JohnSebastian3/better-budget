import React, { ChangeEvent, useState } from "react";
import { TransactionInterface } from "../../../../../Interfaces/TransactionInterface";
import { FaRegTrashAlt } from "react-icons/fa";
import style from "./DashboardSubcategory.module.css";
import axios from "axios";
const DashboardSubcategory = (props: {
  subcategory: {title?: string, budget?: number};
  category: string;
  transactions: TransactionInterface[];
  onDeleteSubcategory: (subcategory: {title?: string, budget?: number}) => void;
}) => {
  let transactions = props.transactions.filter((transaction) => {
    return transaction.subcategory === props.subcategory.title;
  });

  const [subcategoryDeleteIsVisible, setSubcategoryDeleteIsVisible] =
    useState<boolean>(false);
  const [transactionDeleteIsVisible, setTransactionDeleteIsVisible] =
    useState<boolean>(false);
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
  };

  const setBudget = (event: ChangeEvent<HTMLInputElement>) => {
    setBudgetAmount(Number(event.target.value));
  };

  const updateBudget = () => {
    axios
      .put(
        `http://localhost:4000/dashboard/setSubcategoryBudget/${props.category}/${props.subcategory}`,
        { budgetAmount },
        { withCredentials: true }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={style["dashboard__subcategory"]}>
      <div
        className={style.test}
        onMouseOver={(event) => showSubcategoryDeleteOption(event)}
        onMouseLeave={(event) => hideSubcategoryDeleteOption(event)}
      >
        <h3>{props.subcategory.title}</h3>
        <input
          type="text"
          value={budgetAmount}
          onChange={(event) => setBudget(event)}
          onBlur={updateBudget}
          placeholder={String(budgetAmount)}
        />
        {subcategoryDeleteIsVisible ? (
          <a onClick={onDeleteSubcategory} className={style.testtwo}>
            X
          </a>
        ) : (
          ""
        )}
      </div>
      <ul>
        {transactions?.map((transaction, index) => {
          return (
            <li
              key={index}
              className={style["dashboard__transaction"]}
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
                  ""
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p>
        Left: {} of {props.subcategory.budget}
      </p>
    </div>
  );
};

export default DashboardSubcategory;
