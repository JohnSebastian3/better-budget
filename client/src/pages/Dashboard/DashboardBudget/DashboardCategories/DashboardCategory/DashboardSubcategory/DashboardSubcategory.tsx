import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
  onDeleteSubcategory: (
    subcategory: { title: string; budget: number },
    transactionsToDelete: TransactionInterface[]
  ) => void;
  onUpdateBudget: (
    subcategory: {
      title: string;
      budget: number;
      dateMonth: number;
      dateYear: number;
    },
    budgetAmount: number
  ) => void;
  onUpdateSubcategory: (
    oldTitle: string,
    newTitle: string,
    category: string,
    month: number,
    year: number
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

  const [budgetAmount, setBudgetAmount] = useState<number>(0);
  const [subcategoryTile, setSubcategoryTitle] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [inputIsClicked, setInputIsClicked] = useState<boolean>(false);

  useEffect(() => {
    setBudgetAmount(props.subcategory.budget);
    setSubcategoryTitle(props.subcategory.title);
  }, [props.subcategory.budget, props.subcategory.title]);

  const onDeleteSubcategory = () => {
    props.onDeleteSubcategory(props.subcategory, transactions);
  };

  const updateBudget = () => {
    setInputIsClicked(false);

    let categoryTitle = props.category;
    if (categoryTitle.includes("/")) {
      categoryTitle = categoryTitle.replaceAll("/", "&dash");
    }

    let subcategoryTitle = props.subcategory.title;
    if (subcategoryTitle.includes("/")) {
      subcategoryTitle = subcategoryTitle.replaceAll("/", "&dash");
    }
    axios
      .put(
        `/dashboard/setSubcategoryBudget/${categoryTitle}/${subcategoryTitle}/${props.year}/${props.month}`,
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

  const updateSubcategoryTitle = (newTitle: string) => {
    let categoryTitle = props.category;
    if (categoryTitle.includes("/")) {
      categoryTitle = categoryTitle.replaceAll("/", "&dash");
    }

    let oldSubcategoryTitle = props.subcategory.title;
    if (oldSubcategoryTitle.includes("/")) {
      oldSubcategoryTitle = oldSubcategoryTitle.replaceAll("/", "&dash");
    }

    axios
      .put(
        `/dashboard/updateSubcategory/${categoryTitle}/${oldSubcategoryTitle}/${props.year}/${props.month}`,
        { newTitle },
        { withCredentials: true }
      )
      .then((res) => {
        setSubcategoryTitle(newTitle);
        props.onUpdateSubcategory(
          props.subcategory.title,
          newTitle,
          props.category,
          props.month,
          props.year
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return props.subcategory.title !== undefined ? (
    <div className={style["dashboard__subcategory"]}>
      <div className={style["subcategory__container"]}>
        <section className={style["subcategory-header"]}>
          {/* <h3>{props.subcategory.title}</h3> */}
          <input
            type="text"
            value={subcategoryTile}
            className={style["subcategory-title"]}
            onChange={(event) => setSubcategoryTitle(event.target.value)}
            onBlur={(event) => updateSubcategoryTitle(event.target.value)}
          ></input>
          <div className={style["delete-icon"]}>
            <div className={style["subcategory-delete"]}>
              <AiOutlineClose
                size={"18px"}
                onClick={onDeleteSubcategory}
                style={{ cursor: "pointer" }}
              ></AiOutlineClose>
            </div>
          </div>
        </section>
        <section className={style["subcategory__budget-amount"]}>
          <label htmlFor="budgetAmount">Budget</label>
          {!inputIsClicked ? (
            <input
              className={style["budget-input"]}
              type="text"
              value={`$${budgetAmount.toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}`}
              onClick={() => setInputIsClicked(true)}
            ></input>
          ) : (
            <input
              className={style["budget-input"]}
              type="number"
              step=".01"
              value={budgetAmount}
              min="0"
              autoFocus
              id="budgetAmount"
              onChange={(event) => setBudgetAmount(Number(event.target.value))}
              onBlur={updateBudget}
              // placeholder={`$${String(budgetAmount)}`}
            />
          )}
        </section>
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
