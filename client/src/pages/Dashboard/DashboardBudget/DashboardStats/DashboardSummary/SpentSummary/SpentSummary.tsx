import React, { useEffect, useState } from "react";
import { CategoryInterface } from "../../../../../../Interfaces/CategoryInterface";
import { TransactionInterface } from "../../../../../../Interfaces/TransactionInterface";
import style from './SpentSummary.module.css';

const SpentSummary = (props: {
  categories: CategoryInterface[];
  transactions: TransactionInterface[];
}) => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [totalSpent, setTotalSpent] = useState<number>(0);


  useEffect(() => {
    setCategories(props.categories);
    setTransactions(props.transactions);
    let totalSpent = 0;
    props.transactions.forEach((trx) => {
      if (trx.category !== "Income") {
        totalSpent += trx.value;
      }
    });
    setTotalSpent(totalSpent);
  }, [props.categories, props.transactions]);

  useEffect(() => {
    let totalSpent = 0;
    props.transactions.forEach((trx) => {
      if (trx.category !== "Income") {
        totalSpent += trx.value;
      }
    });
    setTotalSpent(totalSpent);
  }, []);

  return (
    <div>
      {transactions.length > 0 ? (
        <ul>
           {categories.map((category, index) => {
            if(category.title !== 'Income') {
              let currSpent = transactions.reduce((acc, curr) => {
                if(curr.category === category.title) {
                  return acc += curr.value;
                }
                return acc;
               }, 0)
              return (
                <li key={index} className={style['spent-item']}>
                <span className={style["spent-title"]}>{category.title}</span>
                <span className={style["spent-amount"]}>
                  <span>
                    $
                    {currSpent.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  <span className={style["spent-percentage"]}>
                  (
                    {totalSpent > 0
                      ? ((currSpent / totalSpent) * 100).toLocaleString(
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
            return <></>
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default SpentSummary;
