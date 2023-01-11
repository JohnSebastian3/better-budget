import React, { ChangeEvent, useEffect, useState } from "react";
import { TransactionInterface } from "../../../../../Interfaces/TransactionInterface";
import { FaRegTrashAlt } from "react-icons/fa";
import style from "./DashboardSubcategory.module.css";
import axios from "axios";
import BudgetBar from "./BudgetBar/BudgetBar";

const DashboardSubcategory = (props: {
  subcategory: { title: string; budget: number, dateMonth: number, dateYear: number};
  category: string;
  transactions: TransactionInterface[];
  year: number;
  month: number;
  day: number;
  onDeleteSubcategory: (subcategory: {
    title: string;
    budget: number;
  }) => void;
  onUpdateBudget: (subcategory: {
    title: string;
    budget: number;
    dateMonth: number;
    dateYear: number;
  }, budgetAmount: number) => void;
}) => {
  let transactions = props.transactions.filter((transaction) => {
    return transaction.subcategory === props.subcategory.title;
  });

  useEffect(() => {
    setExpenseAmount(transactions.reduce((prev, curr) => {
      return prev += curr.value;
    }, 0))
  }, [transactions])


  const [subcategoryDeleteIsVisible, setSubcategoryDeleteIsVisible] =
    useState<boolean>(false);
  const [transactionDeleteIsVisible, setTransactionDeleteIsVisible] =
    useState<boolean>(false);
  const [budgetAmount, setBudgetAmount] = useState<number>(0);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  useEffect(() => {
    setBudgetAmount(props.subcategory.budget);
  }, [props.subcategory.budget])

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
        `http://localhost:4000/dashboard/setSubcategoryBudget/${props.category}/${props.subcategory.title}/${props.year}/${props.month}`,
        { budgetAmount },
        { withCredentials: true }
      )
      .then((res) => {
        setBudgetAmount(budgetAmount);
        props.onUpdateBudget(props.subcategory, budgetAmount);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return props.subcategory.title !== undefined ? (
    <div className={style["dashboard__subcategory"]}>
        <div
          className={style.test}
          onMouseOver={(event) => showSubcategoryDeleteOption(event)}
          onMouseLeave={(event) => hideSubcategoryDeleteOption(event)}
        >
          <h3>{props.subcategory.title}</h3>
          <input
            type="number"
            step=".01"
            value={budgetAmount.toString()}
            min="0"
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
        <div>
          {props.category === 'Income' ? (
            <BudgetBar totalBudgetValue={budgetAmount} currentValue={expenseAmount} isIncome={true} />
          ) : (
            <BudgetBar totalBudgetValue={budgetAmount} currentValue={expenseAmount} isIncome={false} />
          )}
          
        </div>
    </div>
  ) : (
    <div></div>
  )

};

export default DashboardSubcategory;
