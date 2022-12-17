import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import React, { useForm } from "react-hook-form";
import Button from "../../../components/UI/Button/Button";
import { TransactionInterface } from "../../../Interfaces/TransactionInterface";

const DashboardExpenseForm = (props: {
  onAddExpense: (expense: TransactionInterface) => void;
  onChangeDay: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedMonth: number;
  selectedYear: number;
  selectedDay: number;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isIncome, setIsIncome] = useState<boolean>(true);
  const { register, handleSubmit, reset } = useForm();


  const onSubmit = (data: any) => {
    axios
      .post(
        "http://localhost:4000/dashboard/addTransaction",
        {
          title: data.title || "Income",
          category: data.category || "Job",
          value: Number(data.value),
          isIncome: isIncome,
          date: new Date(data.date),
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        props.onAddExpense(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    reset();
    setIsIncome(true);
  };

  const onChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    const pickedDate = event.target.value.split("-");
    const year = +pickedDate[0];
    const month = +pickedDate[1] - 1;
    const day = +pickedDate[2];
    const date = new Date(year, month, day);
    setSelectedDate(date);
  };

  const setIncome = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    value === "Income" ? setIsIncome(true) : setIsIncome(false);
  };

  return (
    <form
      action="dashboard/addExpense"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="radio"
        id="income"
        name="income/expense"
        value="Income"
        checked={isIncome}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setIncome(event)}
      />
      <label htmlFor="income">Income</label>
      <input
        type="radio"
        id="expense"
        name="income/expense"
        value="Expense"
        checked={!isIncome}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setIncome(event)}
      />
      <label htmlFor="expense">Expense</label>
      {isIncome ? (
        <>
          <label htmlFor="dateOfExpense">
            Enter Income Date
            <input
              type="date"
              {...register("date")}
              id="dateOfIncome"
              value={`${
                selectedDate.toLocaleDateString().split("/")[2]
              }-${selectedDate
                .toLocaleDateString()
                .split("/")[0]
                .padStart(2, "0")}-${selectedDate
                .toLocaleDateString()
                .split("/")[1]
                .padStart(2, "0")}`}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChangeDate(event);
              }}
            />
          </label>
          <input
            type="number"
            placeholder="amount earned?"
            {...register("value")}
          />
          <Button
            type="submit"
            value="Add Income"
            kind="btn--primary--green"
          ></Button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Where you spend"
            {...register("title")}
          ></input>
          <label htmlFor="dateOfExpense">
            Enter Expense Date
            <input
              type="date"
              {...register("date")}
              id="dateOfExpense"
              value={`${
                selectedDate.toLocaleDateString().split("/")[2]
              }-${selectedDate
                .toLocaleDateString()
                .split("/")[0]
                .padStart(2, "0")}-${selectedDate
                .toLocaleDateString()
                .split("/")[1]
                .padStart(2, "0")}`}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChangeDate(event);
              }}
            />
          </label>
          <input
            type="text"
            placeholder="category?"
            {...register("category")}
          />
          <input
            type="number"
            placeholder="amount spent?"
            {...register("value")}
          />
          <Button
            type="submit"
            value="Add Expense"
            kind="btn--primary--green"
          ></Button>
        </>
      )}
    </form>
  );
};

export default DashboardExpenseForm;
