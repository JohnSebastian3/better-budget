import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import style from "./DashboardBudget.module.css";
import { TransactionInterface } from "../../../Interfaces/TransactionInterface";
import DashboardDate from "./DashboardDate/DashboardDate";
import DashboardStats from "./DashboardStats/DashboardStats";
import DashboardTransactionForm from "./DashboardTransactionForm/DashboardTransactionForm";
import DashboardCategories from "./DashboardCategories/DashboardCategories";
import { CategoryInterface } from "../../../Interfaces/CategoryInterface";

const DashboardBudget = () => {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [day, setDay] = useState<number>(new Date().getDate());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [currentFilteredCategories, setCurrentFilteredCategories] = useState<
    CategoryInterface[]
  >([]);
  const [totalSetBudget, setTotalSetBudget] = useState<number>(0);
  const [totalSetIncome, setTotalSetIncome] = useState<number>(0);
  const [isOverBudget, setIsOverBudget] = useState<boolean>(false);

  useEffect(() => {
    const filteredCategories = categories.filter((category) => {
      if (categories) {
        return category.dateMonth === month && category.dateYear === year;
      }
      return category;
    });
    setCurrentFilteredCategories(filteredCategories);
    determineIsOverBudget(filteredCategories);
  }, [categories, month, year]);

  useEffect(() => {
    axios
      .get("/dashboard", { withCredentials: true })
      .then((data) => {
        const categories = data.data.categories.map(
          (category: CategoryInterface) => {
            return {
              title: category.title,
              subcategories: [...category.subcategories],
              dateMonth: category.dateMonth,
              dateYear: category.dateYear,
            };
          }
        );

        setCategories(categories);
        setTransactions(data.data.transactions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const determineIsOverBudget = (filteredCategories: CategoryInterface[]) => {
    const incomeCategory = filteredCategories.find(
      (cat) => cat.title === "Income"
    );
    if (incomeCategory) {
      const totalIncomeAmount = incomeCategory.subcategories.reduce(
        (acc, curr) => {
          return (acc += curr.budget);
        },
        0
      );
      let totalBudgetAmount = 0;
      for (const cat of filteredCategories) {
        if (cat.title !== "Income") {
          totalBudgetAmount += cat.subcategories.reduce((acc, curr) => {
            return (acc += curr.budget);
          }, 0);
        }
      }
      setTotalSetBudget(totalBudgetAmount);
      setTotalSetIncome(totalIncomeAmount);
      setIsOverBudget(totalIncomeAmount < totalBudgetAmount);
    }
  };

  const addExpense = (expense: TransactionInterface): void => {
    setTransactions((prev) => {
      return [...prev, expense];
    });
  };

  const setNewMonth = (month: number) => {
    setMonth(month);
  };

  const setNewYear = (year: number) => {
    setYear(year);
  };

  const changeDay = (event: ChangeEvent<HTMLInputElement>): void => {
    setDay(new Date(event.target.value).getUTCDate());
  };

  const addCategory = (newCategory: CategoryInterface) => {
    setCategories((prev) => {
      let foundDuplicate = false;
      for (const cat of categories) {
        if (
          cat.title === newCategory.title &&
          cat.dateMonth === newCategory.dateMonth &&
          cat.dateYear === newCategory.dateYear
        ) {
          foundDuplicate = true;
        }
      }
      if (!foundDuplicate) {
        return [...prev, newCategory];
      } else {
        return [...prev];
      }
    });
  };

  const addSubcategory = (
    subcategory: string,
    category: string,
    dateMonth: number,
    dateYear: number
  ) => {
    setCategories((prev) => {
      const updated = prev.map((cat) => {
        if (
          cat.title === category &&
          cat.dateMonth === dateMonth &&
          cat.dateYear === dateYear
        ) {
          cat.subcategories.push({
            title: subcategory,
            budget: 0,
            dateMonth,
            dateYear,
          });
          return cat;
        }
        return cat;
      });
      return updated;
    });
  };

  const deleteCategory = (
    category: string,
    dateMonth: number,
    dateYear: number
  ) => {
    setCategories((prev) => {
      return prev.filter((cat) => {
        if (cat.dateMonth === dateMonth && cat.dateYear === dateYear) {
          return cat.title !== category;
        } else {
          return true;
        }
      });
    });
  };

  const deleteSubcategory = (
    subcategories: {
      title: string;
      budget: number;
      dateMonth: number;
      dateYear: number;
    }[],
    category: string,
    dateMonth: number,
    dateYear: number
  ) => {
    setCategories((prev) => {
      const updated = prev.map((cat) => {
        if (
          cat.title === category &&
          cat.dateMonth === dateMonth &&
          cat.dateYear === dateYear
        ) {
          cat.subcategories = subcategories;
          return cat;
        }
        return cat;
      });
      return updated;
    });
  };

  const filteredTransactions = transactions.filter(
    (transaction: TransactionInterface) => {
      const transactionMonth = transaction.dateMonth;
      const transactionYear = transaction.dateYear;
      return transactionMonth === month && transactionYear === year;
    }
  );

  const totalExpenses = filteredTransactions.reduce((acc, curr) => {
    if (!curr.isIncome) {
      return (acc += curr.value);
    } else {
      return acc;
    }
  }, 0);

  const totalIncome = filteredTransactions.reduce((acc, curr) => {
    if (curr.isIncome) {
      return (acc += curr.value);
    } else {
      return acc;
    }
  }, 0);

  const updateBudget = (
    subcategory: {
      title: string;
      budget: number;
      dateMonth: number;
      dateYear: number;
    },
    category: string,
    budgetAmount: number
  ) => {
    setCategories((prev) => {
      const updated = prev.map((cat) => {
        if (
          cat.title === category &&
          cat.dateMonth === subcategory.dateMonth &&
          cat.dateYear === subcategory.dateYear
        ) {
          cat.subcategories = cat.subcategories.map((subcat) => {
            if (subcat.title === subcategory.title) {
              subcat.budget = budgetAmount;
              return subcat;
            }
            return subcat;
          });
          return cat;
        }
        return cat;
      });
      return updated;
    });
  };

  const updateSubcategory = (
    oldTitle: string,
    newTitle: string,
    category: string,
    month: number,
    year: number
  ) => {
    setCategories((prev) => {
      const updatedCats = prev.map((cat) => {
        if (
          cat.title === category &&
          cat.dateMonth === month &&
          cat.dateYear === year
        ) {
          cat.subcategories = cat.subcategories.map((subcat) => {
            if (subcat.title === oldTitle) {
              subcat.title = newTitle;
              return subcat;
            }
            return subcat;
          });
          return cat;
        }
        return cat;
      });
      return updatedCats;
    });

    setTransactions((prev) => {
      const updatedTrx = prev.map((trx) => {
        if (
          trx.category === category &&
          trx.subcategory === oldTitle &&
          trx.dateMonth === month &&
          trx.dateYear === year
        ) {
          trx.subcategory = newTitle;
        }
        return trx;
      });
      return updatedTrx;
    });
  };

  const updateCategory = (
    oldTitle: string,
    newTitle: string,
    month: number,
    year: number
  ) => {
    setCategories((prev) => {
      const updatedCats = prev.map((cat) => {
        if (
          cat.title === oldTitle &&
          cat.dateMonth === month &&
          cat.dateYear === year
        ) {
          cat.title = newTitle;
          return cat;
        }
        return cat;
      });
      return updatedCats;
    });

    setTransactions((prev) => {
      const updatedTrx = prev.map((trx) => {
        if (
          trx.category === oldTitle &&
          trx.dateMonth === month &&
          trx.dateYear === year
        ) {
          trx.category = newTitle;
        }
        return trx;
      });
      return updatedTrx;
    });
  };

  const createBudget = () => {
    axios
      .post(
        "/dashboard/createBudget",
        { month, year },
        { withCredentials: true }
      )
      .then((res) => {
        setCategories((prev) => {
          return [...prev, ...res.data];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTransactions = (transactionsToDelete: TransactionInterface[]) => {
    const filteredTransactions = transactions.filter(
      (trxToRemove) =>
        !transactionsToDelete.find(
          (trx) =>
            trx.title === trxToRemove.title &&
            trx.dateMonth === trxToRemove.dateMonth &&
            trx.dateYear === trxToRemove.dateYear &&
            trx.category === trxToRemove.category &&
            trx.subcategory === trxToRemove.subcategory
        )
    );
    setTransactions(filteredTransactions);
  };

  const deleteTransaction = (transaction: TransactionInterface) => {
    axios
      .delete(`/dashboard/deleteTransaction/${transaction._id}`)
      .then((res) => {
        const filteredTransactions = transactions.filter((trx) => {
          console.log(trx._id, transaction._id);
          return trx._id !== transaction._id;
        });
        setTransactions(filteredTransactions);
      })
      .catch((err) => {});
  };

  const updateTransactionTitle = (
    newTitle: string,
    transaction: TransactionInterface
  ) => {
    axios
      .put(
        `/dashboard/updateTransactionTitle/${transaction._id}`,
        { newTitle },
        { withCredentials: true }
      )
      .then((res) => {
        setTransactions((prev) => {
          const updated = prev.map((trx) => {
            if (trx._id === transaction._id) {
              trx.title = newTitle;
              return trx;
            }
            return trx;
          });
          return updated;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTransactionValue = (
    newValue: number,
    transaction: TransactionInterface
  ) => {
    axios
      .put(
        `/dashboard/updateTransactionValue/${transaction._id}`,
        { newValue },
        { withCredentials: true }
      )
      .then((res) => {
        setTransactions((prev) => {
          const updated = prev.map((trx) => {
            if (trx._id === transaction._id) {
              trx.value = newValue;
              return trx;
            }
            return trx;
          });
          return updated;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={style["dashboard__budget"]}>
      <div className={style["dashboard__content"]}>
        <DashboardDate
          setNewMonth={setNewMonth}
          setNewYear={setNewYear}
          month={month}
          year={year}
        />
        <DashboardCategories
          transactions={filteredTransactions}
          categories={currentFilteredCategories}
          totalSetBudget={totalSetBudget}
          totalSetIncome={totalSetIncome}
          isOverBudget={isOverBudget}
          month={month}
          year={year}
          day={day}
          addCategory={addCategory}
          onAddSubcategory={addSubcategory}
          onDeleteCategory={deleteCategory}
          onDeleteSubcategory={deleteSubcategory}
          onUpdateCategory={updateCategory}
          onUpdateSubcategory={updateSubcategory}
          onUpdateBudget={updateBudget}
          onCreateBudget={createBudget}
          deleteTransactions={deleteTransactions}
        />
      </div>
      <div className={style["dashboard-info"]}>
        <DashboardStats
          totalExpenses={totalExpenses}
          totalIncome={totalIncome}
          transactions={filteredTransactions}
          onDeleteTransaction={deleteTransaction}
          onUpdateTransactionTitle={updateTransactionTitle}
          onUpdateTransactionValue={updateTransactionValue}
          categories={currentFilteredCategories}
        />
        <DashboardTransactionForm
          onAddExpense={addExpense}
          filteredCategories={currentFilteredCategories}
          onChangeDay={changeDay}
          selectedMonth={month}
          selectedYear={year}
          selectedDay={day}
        />
      </div>
    </div>
  );
};

export default DashboardBudget;
