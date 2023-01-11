import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import React, { useForm } from "react-hook-form";
import Button from "../../../components/UI/Button/Button";
import { CategoryInterface } from "../../../Interfaces/CategoryInterface";
import { TransactionInterface } from "../../../Interfaces/TransactionInterface";

const DashboardTransactionForm = (props: {
  onAddExpense: (expense: TransactionInterface) => void;
  onChangeDay: (event: ChangeEvent<HTMLInputElement>) => void;
  // categories: CategoryInterface[];
  filteredCategories: CategoryInterface[];
  selectedMonth: number;
  selectedYear: number;
  selectedDay: number;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [currentFilteredCategories, setCurrentFilteredCategories] = useState<
    CategoryInterface[]
  >([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [currentSubcategory, setCurrentSubcategory] = useState<
    string | undefined
  >("");
  const { register, handleSubmit, reset } = useForm();

  console.log(currentCategory, currentSubcategory);

  const filteredCategory = currentFilteredCategories.filter((category) => {
    return category.title === currentCategory;
  });

  useEffect(() => {
    // console.log("there was a change");
    setCurrentFilteredCategories(props.filteredCategories);
    if (props.filteredCategories.length >= 1) {
      if (isIncome) {
        setCurrentCategory(props.filteredCategories[0].title);
        if (props.filteredCategories[0].subcategories.length >= 1) {
          setCurrentSubcategory(
            props.filteredCategories[0].subcategories[0].title
          );
        } else {
          setCurrentCategory("");
        }
      } else if (!isIncome) {
        const currentCat = props.filteredCategories.find(
          (cat) => cat.title === currentCategory
        );
        if (currentCat) {
          setCurrentCategory(currentCat?.title);
          if (currentCat.subcategories.length >= 1) {
            setCurrentSubcategory(currentCat.subcategories[0].title);
          } else {
            setCurrentSubcategory("");
          }
        } else {
          setCurrentCategory("Spending");
          setCurrentSubcategory("");
        }
      }
    } else {
      setCurrentCategory("");
      setCurrentSubcategory("");
    }
  }, [props.filteredCategories]);

  useEffect(() => {
    if (filteredCategory.length >= 1) {
      setCurrentCategory(filteredCategory[0].title)
      if (filteredCategory[0].subcategories.length >= 1) {
        setCurrentSubcategory(filteredCategory[0].subcategories[0].title);
      } else {
        setCurrentSubcategory("");
      }
    }
  }, []);

  useEffect(() => {
    console.log("there was a change 3");
    const filteredCategory = currentFilteredCategories.filter((category) => {
      return category.title === currentCategory;
    });
    if (filteredCategory.length >= 1) {
      setCurrentCategory(filteredCategory[0].title);
      if (filteredCategory[0].subcategories.length >= 1) {
        setCurrentSubcategory(filteredCategory[0].subcategories[0].title);
      } else {
        setCurrentSubcategory("");
      }
    } else {
      setCurrentCategory("");
      setCurrentSubcategory("");
    }
  }, [currentCategory]);

  useEffect(() => {
    setIsIncome(false);
  }, [props.selectedMonth, props.selectedYear]);

  useEffect(() => {
    if (isIncome) {
      setCurrentCategory("Income");
      const incomeCategory = currentFilteredCategories.filter((category) => {
        return category.title === "Income";
      });
      if (incomeCategory.length >= 1) {
        if (incomeCategory[0].subcategories.length >= 1) {
          console.log("setting to:", incomeCategory);
          setCurrentSubcategory(incomeCategory[0].subcategories[0].title);
        } else {
          setCurrentSubcategory("");
        }
      }
    } else {
      setCurrentCategory("Spending");
      if (filteredCategory.length >= 1) {
        const spendingCategory = currentFilteredCategories.filter(
          (category) => {
            return category.title === "Spending";
          }
        );
        if (spendingCategory[0].subcategories.length >= 1) {
          setCurrentSubcategory(spendingCategory[0].subcategories[0].title);
        }
      }
    }
    reset();
  }, [isIncome]);

  const onSubmit = (data: any) => {
    axios
      .post(
        "http://localhost:4000/dashboard/addTransaction",
        {
          title: data.title || "N/A",
          category: isIncome ? "Income" : currentCategory,
          subcategory: currentSubcategory ? currentSubcategory : "",
          value: Number(data.value),
          isIncome: isIncome,
          dateDay: props.selectedDay,
          dateMonth: props.selectedMonth,
          dateYear: props.selectedYear,
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
    setIsIncome(false);
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
            defaultValue={currentSubcategory}
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
          <input type="text" placeholder="Description" {...register("title")}/>
          <input
            type="number"
            step=".01"
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
              value="Disabled"
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
            defaultValue={currentCategory}
            {...register("category")}
            onChange={(event) => onChangeCategory(event)}
          >
            <option value="default" disabled>
              Category
            </option>
            {props.filteredCategories.map((category, index) => {
              if (category.title !== "Income") {
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
            defaultValue={currentSubcategory ? currentSubcategory : "default"}
            onChange={(event) => onChangeSubcategory(event)}
          >
            <option value="default" disabled>
              Subcategory
            </option>
            {filteredCategory.length > 0 ? (
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
            step=".01"
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
              value="Disabled"
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
