import axios from "axios";
import { ChangeEvent, useState } from "react";
import React, { useForm } from "react-hook-form";
import Button from "../../../components/UI/Button/Button";
import { ExpenseInterface } from "../../../Interfaces/ExpenseInterface";

const DashboardExpenseForm = (props: {
  onAddExpense: (expense: ExpenseInterface) => void;
  onChangeDay: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedMonth: number;
  selectedYear: number;
  selectedDay: number;
}) => {

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data: any) => {
    axios
      .post(
        "http://localhost:4000/dashboard/addExpense",
        {
          title: data.title,
          category: data.category,
          value: Number(data.value),
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
  };


  const onChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    const pickedDate = event.target.value.split("-");
    const year = +pickedDate[0];
    const month = +pickedDate[1] - 1;
    const day = +pickedDate[2];
    const date = new Date(year, month, day);
    setSelectedDate(date);
  };

  return (
    <form
      action="dashboard/addExpense"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        placeholder="what did  you spend it on"
        {...register("title")}
      ></input>
      <label htmlFor="dateOfExpense">
        Enter Expense Date
        <input
          type="date"
          {...register("date")}
          id="dateOfExpense"
          value={`${selectedDate.toLocaleDateString().split("/")[2]}-${
            selectedDate.toLocaleDateString().split("/")[0].padStart(2, '0')
          }-${selectedDate.toLocaleDateString().split("/")[1].padStart(2, '0')}`}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChangeDate(event);
          }}
        />
      </label>
      <input type="text" placeholder="category?" {...register("category")} />
      <input type="number" placeholder="amount spent?" {...register("value")} />
      <Button
        type="submit"
        value="Add Expense"
        kind="btn--primary--green"
      ></Button>
    </form>
  );
};

export default DashboardExpenseForm;
