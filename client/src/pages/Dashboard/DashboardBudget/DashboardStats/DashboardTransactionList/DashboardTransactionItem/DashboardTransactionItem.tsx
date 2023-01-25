import React, { useEffect, useState } from "react";
import { TransactionInterface } from "../../../../../../Interfaces/TransactionInterface";
import style from "./DashboardTransactionItem.module.css";
import { HiTrash } from "react-icons/hi";

const DashboardTransactionItem = (props: {
  transaction: TransactionInterface;
  onDeleteTransaction: (transaction: TransactionInterface) => void;
  onUpdateTransactionTitle: (
    newTitle: string,
    transaction: TransactionInterface
  ) => void;
  onUpdateTransactionValue: (
    newValue: number,
    transaction: TransactionInterface
  ) => void;
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [transactionTitle, setTransactionTitle] = useState<string>("");
  const [transactionValue, setTransactionValue] = useState<string>("");
  const [inputIsClicked, setInputIsClicked] = useState<boolean>(false);

  useEffect(() => {
    setTransactionTitle(props.transaction.title);
    setTransactionValue(
      props.transaction.value.toLocaleString("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })
    );
  }, [props.transaction]);

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
  };

  const onUpdateTransactionTitle = (newTitle: string) => {
    props.onUpdateTransactionTitle(newTitle, props.transaction);
  };

  const onUpdateTransactionValue = (newValue: number) => {
    setInputIsClicked(false);
    setTransactionValue(
      newValue.toLocaleString("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })
    );
    props.onUpdateTransactionValue(newValue, props.transaction);
  };

  return (
    <div
      className={style["transactions-item__container"]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={style["transactions-wrapper"]}>
        <div className={style["transactions-date__wrapper"]}>
          <div className={style["transactions-date"]}>
            <div className={style["transactions-month"]}>
              {months[Number(props.transaction.dateMonth)]}
            </div>
            <div className={style["transactions-day"]}>
              {Number(props.transaction.dateDay)}
            </div>
          </div>
          {isHovered ? (
            <div className={style["transaction-delete"]}>
              <HiTrash size={"18px"} onClick={onDeleteTransaction}></HiTrash>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className={style["transactions-info"]}>
          <div className={style["transactions-title"]}>
            {/* <span className={style["title"]}>{props.transaction.title}</span> */}
            <input
              type="text"
              value={transactionTitle}
              className={style["title-input"]}
              onChange={(event) => setTransactionTitle(event.target.value)}
              onBlur={(event) => onUpdateTransactionTitle(event.target.value)}
            />
            <span className={style["subcategory"]}>
              {props.transaction.subcategory}
            </span>
          </div>

          <div className={style["transactions-value"]}>
            {props.transaction.category === "Income" ? (
              <div className={style["value-wrapper"]}>
                {!inputIsClicked ? (
                  <input
                    className={style["transactions-clickable"]}
                    value={`+ $${transactionValue}`}
                    onClick={() => setInputIsClicked(true)}
                  />
                ) : (
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    className={style["transactions-input"]}
                    value={transactionValue.replaceAll(',', '')}
                    autoFocus
                    onChange={(event) =>
                      setTransactionValue(event.target.value)
                    }
                    onBlur={(event) =>
                      onUpdateTransactionValue(Number(event.target.value))
                    }
                  />
                )}
              </div>
            ) : (
              <div className={style["value-wrapper"]}>
                {!inputIsClicked ? (
                   <input
                   className={style["transactions-clickable"]}
                   value={`- $${transactionValue}`}
                   onClick={() => setInputIsClicked(true)}
                 />
                ) : (
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    autoFocus
                    className={style["transactions-input"]}
                    value={transactionValue.replaceAll(',', '')}
                    onChange={(event) =>
                      setTransactionValue(event.target.value)
                    }
                    onBlur={(event) =>
                      onUpdateTransactionValue(Number(event.target.value))
                    }
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTransactionItem;
