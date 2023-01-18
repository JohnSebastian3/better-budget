import React, { useEffect, useState } from "react";
import { CategoryInterface } from "../../../../../../Interfaces/CategoryInterface";
import { TransactionInterface } from "../../../../../../Interfaces/TransactionInterface";

const RemainingSummary = (props: {
  categories: CategoryInterface[];
  transactions: TransactionInterface[];
}) => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);

  useEffect(() => {
    setCategories(props.categories);
    setTransactions(props.transactions);
  }, [props.categories, props.transactions]);

  return (
    <div>
      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => {
            if (category.title !== "Income") {
              return (
                <li>
                  {category.title} $
                  {(
                    category.subcategories.reduce((acc, curr) => {
                      return (acc += curr.budget);
                    }, 0) -
                    transactions.reduce((acc, curr) => {
                      if (curr.category === category.title) {
                        return (acc += curr.value);
                      }
                      return acc;
                    }, 0)
                  ).toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
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
