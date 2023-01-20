import React, { useEffect, useState } from "react";
import { CategoryInterface } from "../../../../../../Interfaces/CategoryInterface";
import { TransactionInterface } from "../../../../../../Interfaces/TransactionInterface";
import style from "./RemainingSummary.module.css";

const RemainingSummary = (props: {
  categories: CategoryInterface[];
  transactions: TransactionInterface[];
}) => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [totalRemaining, setTotalRemaining] = useState<number>(0);

  useEffect(() => {
    setCategories(props.categories);
    setTransactions(props.transactions);
    let totalRemaining = 0;
    props.categories.forEach((category) => {
      if (category.title !== "Income") {
        totalRemaining +=
          category.subcategories.reduce((acc, curr) => {
            return (acc += curr.budget);
          }, 0) -
          transactions.reduce((acc, curr) => {
            if (curr.category === category.title) {
              return (acc += curr.value);
            }
            return acc;
          }, 0);
      }
    });
    setTotalRemaining(totalRemaining);
  }, [props.categories, props.transactions]);

  useEffect(() => {
    let totalRemaining = 0;
    props.categories.forEach((category) => {
      if (category.title !== "Income") {
        totalRemaining +=
          category.subcategories.reduce((acc, curr) => {
            return (acc += curr.budget);
          }, 0) -
          transactions.reduce((acc, curr) => {
            if (curr.category === category.title) {
              return (acc += curr.value);
            }
            return acc;
          }, 0);
      }
    });
    setTotalRemaining(totalRemaining);
  }, []);

  return (
    <div>
      {categories.length > 0 ? (
        <ul>
          {categories.map((category, index) => {
            if (category.title !== "Income") {
              let currRemaining =
                category.subcategories.reduce((acc, curr) => {
                  return (acc += curr.budget);
                }, 0) -
                transactions.reduce((acc, curr) => {
                  if (curr.category === category.title) {
                    return (acc += curr.value);
                  }
                  return acc;
                }, 0);
                currRemaining = currRemaining < 0 ? 0 : currRemaining;
              return (
                <li key={index} className={style['remaining-item']}>
                  <span className={style["remaining-title"]}>{category.title}</span>
                  <span className={style["remaining-amount"]}>
                    <span>
                      $
                      {currRemaining.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <span className={style["remaining-percentage"]}>
                      (
                      {totalRemaining > 0
                        ? ((currRemaining / totalRemaining) * 100).toLocaleString(
                            "en-US",
                            {
                              maximumFractionDigits: 2,
                              minimumFractionDigits: 2,
                            }
                          )
                        : 0}
                      %)
                    </span>
                  </span>
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

export default RemainingSummary;
