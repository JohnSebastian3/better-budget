import React, { useEffect, useState } from "react";
import { CategoryInterface } from "../../../../../../Interfaces/CategoryInterface";
import { TransactionInterface } from "../../../../../../Interfaces/TransactionInterface";
import style from "./BudgetSummary.module.css";

const BudgetSummary = (props: {
  categories: CategoryInterface[];
  transactions: TransactionInterface[];
}) => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [totalBudget, setTotalBudget] = useState<number>(0);

  useEffect(() => {
    setCategories(props.categories);
    setTransactions(props.transactions);

    let totalBudget = 0;
    props.categories.forEach((category) => {
      if (category.title !== "Income") {
        totalBudget += category.subcategories.reduce((acc, prev) => {
          return (acc += prev.budget);
        }, 0);
      }
    });
    setTotalBudget(totalBudget);
  }, [props.categories, props.transactions]);

  useEffect(() => {
    let totalBudget = 0;
    props.categories.forEach((category) => {
      if (category.title !== "Income") {
        totalBudget += category.subcategories.reduce((acc, prev) => {
          return (acc += prev.budget);
        }, 0);
      }
      setTotalBudget(totalBudget);
    });
  }, []);

  return (
    <div>
      {categories.length > 0 ? (
        <ul>
          {categories.map((category, index) => {
            let currBudget = category.subcategories.reduce((acc, curr) => {
              return (acc += curr.budget);
            }, 0);
            if (category.title !== "Income") {
              return (
                <li className={style["budget-item"]} key={index}>
                  <span className={style["budget-title"]}>
                    {category.title}
                  </span>
                  <div className={style["budget-amount"]}>
                    <span>
                      $
                      {currBudget.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <span className={style['budget-percentage']}>
                      (
                      {totalBudget > 0
                        ? ((currBudget / totalBudget) * 100).toLocaleString(
                            "en-US",
                            {
                              maximumFractionDigits: 2,
                              minimumFractionDigits: 2,
                            }
                          )
                        : 0}
                      %)
                    </span>
                  </div>
                </li>
              );
            }
            return <></>;
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default BudgetSummary;
