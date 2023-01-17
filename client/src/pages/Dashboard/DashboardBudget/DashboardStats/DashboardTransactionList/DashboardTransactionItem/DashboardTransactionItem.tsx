import React, { useState } from "react";
import { TransactionInterface } from "../../../../../../Interfaces/TransactionInterface";
import style from "./DashboardTransactionItem.module.css";
import { HiTrash } from "react-icons/hi";

const DashboardTransactionItem = (props: {
  transaction: TransactionInterface;
  onDeleteTransaction: (transaction: TransactionInterface) => void;
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const onDeleteTransaction = () => {
    props.onDeleteTransaction(props.transaction);
  }

  return (
    <div
      className={style["transactions-item__container"]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={style['transactions-wrapper']}>
        <div className={style["transactions-date__wrapper"]}>
          <div className={style["transactions-date"]}>
            <div className={style["transactions-month"]}>
              {months[Number(props.transaction.dateMonth)]}
            </div>
            <div className={style["transactions-day"]}>
              {Number(props.transaction.dateDay)}
            </div>
          </div>
          {isHovered ? <HiTrash size={"17px"} color="#666" onClick={onDeleteTransaction}></HiTrash> : ""}
        </div>

        <div className={style["transactions-info"]}>
          <div className={style["transactions-title"]}>
            <span className={style['title']}>{props.transaction.title}</span>
            <span className={style['subcategory']}>{props.transaction.subcategory}</span>
          </div>

          <div className={style["transactions-value"]}>
            {props.transaction.category === "Income" ? (
              <span>
                + $
                {props.transaction.value.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </span>
            ) : (
              <span>
                - $
                {props.transaction.value.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTransactionItem;
