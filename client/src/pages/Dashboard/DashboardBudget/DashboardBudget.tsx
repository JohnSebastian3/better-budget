import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import style from "./DashboardBudget.module.css";
import { userContext } from "../../../context/UserContext";
import { TransactionInterface } from "../../../Interfaces/TransactionInterface";
import DashboardDate from "./DashboardDate/DashboardDate";
import DashboardStats from "./DashboardStats/DashboardStats";
import DashboardTransactionForm from "../DashboardTransactionForm/DashboardTransactionForm";
import DashboardCategories from "../DashboardCategories/DashboardCategories";
import { CategoryInterface } from "../../../Interfaces/CategoryInterface";

const DashboardBudget = () => {
  const ctx = useContext(userContext);

  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [day, setDay] = useState<number>(new Date().getDate());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard", { withCredentials: true })
      .then((data) => {
        const categories = data.data.categories.map(
          (category: CategoryInterface) => {
            return {
              title: category.title,
              subcategories: category.subcategories,
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
    console.log(new Date(event.target.value).getMonth());
    setDay(new Date(event.target.value).getUTCDate());
  };

  const addCategory = (newCategory: CategoryInterface) => {
    setCategories((prev) => {
      return [...prev, newCategory];
    });
  };

  const addSubcategory = (subcategory: string, category: string) => {
    setCategories((prev) => {
      for(const cat of prev) {
        if(cat.title === category) {
          console.log(`Adding subcat ${subcategory.toUpperCase()} to ${category.toUpperCase()}`)
          cat.subcategories.push(subcategory);
        }
      }
      return prev
    });
  }

  const deleteCategory = (category: string) => {
    console.log('running');
    setCategories((prev) => {
      return prev.filter(cat => cat.title !== category);
    })
  }


  const filteredTransactions = transactions.filter(
    (transaction: TransactionInterface) => {
      const transactionMonth = new Date(transaction.date).getUTCMonth();
      const transactionYear = new Date(transaction.date).getUTCFullYear();
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
          categories={categories}
          addCategory={addCategory}
          onAddSubcategory={addSubcategory}
          onDeleteCategory={deleteCategory}
        />
      </div>
      <div className={style["dashboard__stats"]}>
        <DashboardStats
          totalExpenses={totalExpenses}
          totalIncome={totalIncome}
          transactions={transactions}
        />
        <DashboardTransactionForm
          onAddExpense={addExpense}
          categories={categories}
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
