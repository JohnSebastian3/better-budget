import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import React, { useForm } from "react-hook-form";
import Button from "../../../components/UI/Button/Button";
import { CategoryInterface } from "../../../Interfaces/CategoryInterface";
import { TransactionInterface } from "../../../Interfaces/TransactionInterface";

const DashboardTransactionForm = (props: {
  onAddExpense: (expense: TransactionInterface) => void;
  onChangeDay: (event: ChangeEvent<HTMLInputElement>) => void;
  categories: CategoryInterface[];
  selectedMonth: number;
  selectedYear: number;
  selectedDay: number;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isIncome, setIsIncome] = useState<boolean>(true);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [currentSubcategory, setCurrentSubcategory] = useState<string | undefined>("");
  const { register, handleSubmit, reset } = useForm();

  
  const filteredCategory = props.categories.filter((category) => {
    return category.title === currentCategory;
  });
  
  useEffect(() => {
    if (filteredCategory.length >= 1) {
      console.log("reached");
      setCurrentSubcategory(filteredCategory[0].subcategories[0].title);
    }
  }, [currentCategory]);

  useEffect(() => {
    if (isIncome) {
      setCurrentCategory("Income");
      setCurrentSubcategory("");
    } else {
      setCurrentCategory("Spending");
      setCurrentSubcategory("");
    }
    reset();
  }, [isIncome]);


  const onSubmit = (data: any) => {
    axios
      .post(
        "http://localhost:4000/dashboard/addTransaction",
        {
          title: data.title || "Unknown",
          category: isIncome ? "Income" : currentCategory,
          subcategory: currentSubcategory ? currentSubcategory : '',
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

  const onChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(event.target.selectedOptions[0].innerText);
  };

  const onChangeSubcategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentSubcategory(event.target.selectedOptions[0].innerText);
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
          <select
            defaultValue={currentSubcategory ? currentSubcategory : 'default'}
            onChange={(event) => onChangeSubcategory(event)}
          >
            <option value="default" disabled>
              Subcategory
            </option>
            {filteredCategory.length > 0 ? (
              filteredCategory[0].subcategories.map((subcategory, index) => {
                return (
                  <option key={index} value={subcategory.title}>
                    {subcategory.title}
                  </option>
                );
              })
            ) : (
              <></>
            )}
          </select>
          <input
            type="number"
            placeholder="amount earned?"
            {...register("value")}
          />
          {currentSubcategory ? (
            <Button
            type="submit"
            value="Add Income"
            kind="btn--primary--green"
            disabled={false}
          ></Button>
          ) : (
            <Button
            type="submit"
            value="Must select subcategory"
            kind="btn--primary--green"
            disabled={true}
          ></Button>
          )}
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
          <select
            defaultValue={currentCategory ? currentCategory : 'default'}
            {...register("category")}
            onChange={(event) => onChangeCategory(event)}
          >
            <option value="default" disabled>
              Category
            </option>
            {props.categories.map((category, index) => {
              if(category.title !== "Income") {
                return (
                  <option
                    key={index}
                    // {...register("category")}
                    value={category.title}
                  >
                    {category.title}
                  </option>
                );
              }
            })}
          </select>
          <select
            defaultValue={currentSubcategory ? currentSubcategory : 'default'}
            onChange={(event) => onChangeSubcategory(event)}
          >
            <option value="default" disabled>
              Subcategory
            </option>
            {currentCategory ? (
              filteredCategory[0].subcategories.map((subcategory, index) => {
                if (subcategory.title === currentSubcategory) {
                  return (
                    <option key={index} value={subcategory.title} selected>
                      {subcategory.title}
                    </option>
                  );
                } else {
                  return (
                    <option key={index} value={subcategory.title}>
                      {subcategory.title}
                    </option>
                  );
                }
              })
            ) : (
              <></>
            )}
          </select>
          <input
            type="number"
            placeholder="amount spent?"
            {...register("value")}
          />
          {currentSubcategory ? (
            <Button
            type="submit"
            value="Add Expense"
            kind="btn--primary--green"
            disabled={false}
          ></Button>
          ) : (
            <Button
            type="submit"
            value="Must select subcategory"
            kind="btn--primary--green"
            disabled={true}
          ></Button>
          )}
          
        </>
      )}
    </form>
  );
};

export default DashboardTransactionForm;
