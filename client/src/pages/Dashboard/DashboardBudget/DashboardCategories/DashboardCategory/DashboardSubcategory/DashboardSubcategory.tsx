import React, { ChangeEvent, useEffect, useState } from "react";
import { TransactionInterface } from "../../../../../../Interfaces/TransactionInterface";
import { FaRegTrashAlt } from "react-icons/fa";
import style from "./DashboardSubcategory.module.css";
import axios from "axios";
import BudgetBar from "./BudgetBar/BudgetBar";
import { AiOutlineClose } from "react-icons/ai";

const DashboardSubcategory = (props: {
  subcategory: {
    title: string;
    budget: number;
    dateMonth: number;
    dateYear: number;
  };
  category: string;
  transactions: TransactionInterface[];
  year: number;
  month: number;
  day: number;
  onDeleteSubcategory: (subcategory: { title: string; budget: number }) => void;
  onUpdateBudget: (
    subcategory: {
      title: string;
      budget: number;
      dateMonth: number;
      dateYear: number;
    },
    budgetAmount: number
  ) => void;
}) => {
  let transactions = props.transactions.filter((transaction) => {
    return transaction.subcategory === props.subcategory.title;
  });

  useEffect(() => {
    setExpenseAmount(
      transactions.reduce((prev, curr) => {
        return (prev += curr.value);
      }, 0)
    );
  }, [transactions]);

  const [subcategoryDeleteIsVisible, setSubcategoryDeleteIsVisible] =
    useState<boolean>(false);
  const [transactionDeleteIsVisible, setTransactionDeleteIsVisible] =
    useState<boolean>(false);
  const [budgetAmount, setBudgetAmount] = useState<number>(0);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  useEffect(() => {
    setBudgetAmount(props.subcategory.budget);
  }, [props.subcategory.budget]);

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
    let categoryTitle = props.category;
    if (categoryTitle.includes("/")) {
      categoryTitle = categoryTitle.replace("/", "&dash");
    }

    let subcategoryTitle = props.subcategory.title;
    if (subcategoryTitle.includes("/")) {
      subcategoryTitle = subcategoryTitle.replace("/", "&dash");
    }
    axios
      .put(
        `http://localhost:4000/dashboard/setSubcategoryBudget/${categoryTitle}/${subcategoryTitle}/${props.year}/${props.month}`,
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
        className={style["subcategory__container"]}
        onMouseOver={(event) => showSubcategoryDeleteOption(event)}
        onMouseLeave={(event) => hideSubcategoryDeleteOption(event)}
      >
        <div className={style["subcategory-header"]}>
          <h3>{props.subcategory.title}</h3>
          <div className={style["delete-icon"]}>
            {subcategoryDeleteIsVisible ? (
              <div className={style['subcategory-delete']}>
                <AiOutlineClose
                  size={"15px"}
                  onClick={onDeleteSubcategory}
                  style={{ cursor: "pointer" }}
                ></AiOutlineClose>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={style["subcategory__budget-amount"]}>
          <label htmlFor="budgetAmount">Budget</label>
          <input
            className={style["budget-input"]}
            type="number"
            step=".01"
            value={budgetAmount.toString()}
            min="0"
            id="budgetAmount"
            onChange={(event) => setBudget(event)}
            onBlur={updateBudget}
            placeholder={`$${String(budgetAmount)}`}
          />
        </div>
        {props.category === "Income" ? (
          <div className={style["received-spent"]}>
            <span>Received</span>
            <span className={style["budget-expense"]}>${expenseAmount}</span>
          </div>
        ) : (
          <div className={style["received-spent"]}>
            <span>Spent</span>
            <span className={style["budget-expense"]}>
              $
              {expenseAmount.toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        )}
      </div>
      <div>
        {props.category === "Income" ? (
          <BudgetBar
            totalBudgetValue={budgetAmount}
            currentValue={expenseAmount}
            isIncome={true}
          />
        ) : (
          <BudgetBar
            totalBudgetValue={budgetAmount}
            currentValue={expenseAmount}
            isIncome={false}
          />
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default DashboardSubcategory;
