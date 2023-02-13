import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./DashboardTransactionForm.module.css";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Button from "../../../../components/UI/Button/Button";
import Modal from "../../../../components/UI/Modal/Modal";
import { CategoryInterface } from "../../../../Interfaces/CategoryInterface";
import { TransactionInterface } from "../../../../Interfaces/TransactionInterface";
import { AnimatePresence } from "framer-motion";

const DashboardTransactionForm = (props: {
  onAddExpense: (expense: TransactionInterface) => void;
  onChangeDay: (event: ChangeEvent<HTMLInputElement>) => void;
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setModalOpen(false);
    setIsIncome(false);
  };

  const openModal = () => {
    setModalOpen(true);
    setIsIncome(false);
  };

  const filteredCategory = currentFilteredCategories.filter((category) => {
    return category.title === currentCategory;
  });

  useEffect(() => {
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
      setCurrentCategory(filteredCategory[0].title);
      if (filteredCategory[0].subcategories.length >= 1) {
        setCurrentSubcategory(filteredCategory[0].subcategories[0].title);
      } else {
        setCurrentSubcategory("");
      }
    }
  }, []);

  useEffect(() => {
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
        "/dashboard/addTransaction",
        {
          title: data.title || "No Description",
          category: isIncome ? "Income" : currentCategory,
          subcategory: currentSubcategory ? currentSubcategory : "",
          value: Number(data.value),
          isIncome: isIncome,
          dateDay: selectedDate.getUTCDate(),
          dateMonth: selectedDate.getUTCMonth(),
          dateYear: selectedDate.getUTCFullYear(),
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setSelectedDate(new Date());
        props.onAddExpense(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    reset();
    setIsIncome(false);
    setModalOpen(false);
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
    <>
      <BsFillPlusCircleFill
        className={style["add-transaction-btn"]}
        onClick={openModal}
      ></BsFillPlusCircleFill>
      <AnimatePresence initial={false}>
        {modalOpen && (
          <Modal handleClose={closeModal}>
            <form
              action="dashboard/addExpense"
              method="POST"
              className={style["dashboard__form"]}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={style["form-header"]}>
                <h2>Add {isIncome ? "Income" : "Expense"}</h2>
              </div>
              <div className={style["income-expense-inputs"]}>
                <div className={style["radio-label"]}>
                  <input
                    type="radio"
                    id="income"
                    name="income/expense"
                    value="Income"
                    checked={isIncome}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setIncome(event)
                    }
                  />
                  <label htmlFor="income">Income</label>
                </div>

                <div className={style["radio-label"]}>
                  <input
                    type="radio"
                    id="expense"
                    name="income/expense"
                    value="Expense"
                    checked={!isIncome}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setIncome(event)
                    }
                  />
                  <label htmlFor="expense">Expense</label>
                </div>
              </div>
              {isIncome ? (
                <>
                  <input
                    type="text"
                    placeholder="Income Description"
                    {...register("title")}
                    required
                  />
                  <div className={style["amount-date-inputs"]}>
                    <input
                      type="number"
                      step=".01"
                      placeholder="$0.00"
                      {...register("value")}
                      className={style["amount-input"]}
                      required
                    />
                    <input
                      type="date"
                      {...register("date")}
                      id="dateOfIncome"
                      className={style["date-input"]}
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
                  </div>
                  <select
                    defaultValue={currentSubcategory}
                    onChange={(event) => onChangeSubcategory(event)}
                    className={style["income-select"]}
                  >
                    <option value="default" disabled>
                      Subcategory
                    </option>
                    {filteredCategory.length > 0 ? (
                      filteredCategory[0].subcategories.map(
                        (subcategory, index) => {
                          return (
                            <option key={index} value={subcategory.title}>
                              {subcategory.title}
                            </option>
                          );
                        }
                      )
                    ) : (
                      <></>
                    )}
                  </select>
                  <div className={style["form-buttons"]}>
                    <Button
                      type="button"
                      value="Cancel"
                      kind="btn--secondary--transparent"
                      modifier="btn--small"
                      onClick={() => setModalOpen(false)}
                      disabled={false}
                    ></Button>
                    {currentSubcategory ? (
                      <Button
                        type="submit"
                        value="Add Income"
                        kind="btn--primary--green"
                        modifier="btn--small"
                        disabled={false}
                      ></Button>
                    ) : (
                      <Button
                        type="submit"
                        value="Add Income"
                        kind="btn--primary--green"
                        disabled={true}
                      ></Button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Expense Description"
                    {...register("title")}
                    required
                  ></input>
                  <div className={style["amount-date-inputs"]}>
                    <input
                      type="number"
                      step=".01"
                      placeholder="$0.00"
                      {...register("value")}
                      className={style["amount-input"]}
                      required
                    />
                    <input
                      type="date"
                      {...register("date")}
                      id="dateOfExpense"
                      className={style["date-input"]}
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
                  </div>
                  <div className={style["form-selects"]}>
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
                      defaultValue={
                        currentSubcategory ? currentSubcategory : "default"
                      }
                      onChange={(event) => onChangeSubcategory(event)}
                    >
                      <option value="default" disabled>
                        Subcategory
                      </option>
                      {filteredCategory.length > 0 ? (
                        filteredCategory[0].subcategories.map(
                          (subcategory, index) => {
                            if (subcategory.title === currentSubcategory) {
                              return (
                                <option
                                  key={index}
                                  value={subcategory.title}
                                  selected
                                >
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
                          }
                        )
                      ) : (
                        <></>
                      )}
                    </select>
                  </div>
                  <div className={style["form-buttons"]}>
                    <Button
                      type="button"
                      value="Cancel"
                      kind="btn--secondary--transparent"
                      modifier="btn--small"
                      onClick={() => setModalOpen(false)}
                      disabled={false}
                    ></Button>
                    {currentSubcategory ? (
                      <Button
                        type="submit"
                        value="Add Expense"
                        kind="btn--primary--green"
                        modifier="btn--small"
                        disabled={false}
                      ></Button>
                    ) : (
                      <Button
                        type="submit"
                        value="Add Expense"
                        kind="btn--primary--green"
                        modifier="btn--small"
                        disabled={true}
                      ></Button>
                    )}
                  </div>
                </>
              )}
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardTransactionForm;
