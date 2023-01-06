import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/UI/Button/Button";
import { TransactionInterface } from "../../../../Interfaces/TransactionInterface";
import style from "./DashboardCategory.module.css";
import DashboardSubcategory from "./DashboardSubcategory/DashboardSubcategory";
import { AiOutlineClose } from "react-icons/ai";
import { CategoryInterface } from "../../../../Interfaces/CategoryInterface";
const DashboardCategory = (props: {
  transactions: TransactionInterface[];
  category: CategoryInterface;
  subcategories: { title: string; budget: number, date: Date }[];
  onUpdateBudget: (subcategory: { title: string; budget: number }, category: string) => void;
  onAddSubcategory: (newSubcategory: string, category: string, date: Date) => void;
  onDeleteCategory: (category: string) => void;
}) => {

  const { register, handleSubmit, reset } = useForm();
  const [isFormShown, setIsFormShown] = useState<boolean>(false);
  const [subcategories, setSubcategories] = useState<
    { title: string; budget: number, date: Date }[]
  >([]);

  useEffect(() => {
    setSubcategories(props.subcategories);
  }, []);

  const transactions = props.transactions.filter((transaction) => {
    return transaction.category === props.category.title;
  });

  const onSubmit = (data: any) => {
    let newSubcategory = data.subcategory.toLowerCase();
    newSubcategory = newSubcategory[0].toUpperCase() + newSubcategory.slice(1);
    const subcategory =  { title: newSubcategory, budget: 0, date: new Date() }
    axios
      .post(
        `http://localhost:4000/dashboard/addSubcategory/${props.category.title}`,
        {
          subcategory: subcategory,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setSubcategories((prev) => {
          if (!prev.includes(newSubcategory)) {
            return [...prev, subcategory];
          } else {
            return [...prev];
          }
        });
        props.onAddSubcategory(newSubcategory, props.category.title, subcategory.date);
      });

    reset();
    setIsFormShown(false);
  };

  const showForm = () => {
    setIsFormShown(true);
  };

  const hideForm = () => {
    setIsFormShown(false);
  };

  const deleteSubcategory = (subcategory: {
    title: string;
    budget: number;
  }) => {
    axios
      .delete(
        `http://localhost:4000/dashboard/deleteSubcategory/${props.category.title}/${subcategory.title}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const newSubcategories = subcategories.filter(
          (currSubcategory) => currSubcategory !== subcategory
        );
        setSubcategories(newSubcategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCategory = () => {
    props.onDeleteCategory(props.category.title);
  };

  const onUpdateBudget = (subcategory: { title: string; budget: number }) => {
    props.onUpdateBudget(subcategory, props.category.title);
  };

  return (
    <>
      <div className={style["income-header"]}>
        <h2>{props.category.title}</h2>
        {props.category.title !== "Income" &&
        props.category.title !== "Spending" ? (
          <AiOutlineClose
            size={"25px"}
            onClick={deleteCategory}
          ></AiOutlineClose>
        ) : (
          ""
        )}
      </div>
      <div>
        {subcategories.map((subcategory, index) => {
          return (
            <DashboardSubcategory
              key={index}
              subcategory={subcategory}
              transactions={transactions}
              category={props.category.title}
              onDeleteSubcategory={deleteSubcategory}
              onUpdateBudget={onUpdateBudget}
            />
          );
        })}
      </div>

      {isFormShown ? (
        <form
          className={style["dashboard__categories__form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Sub Category"
            {...register("subcategory")}
          />
          <button type="submit">Add</button>
          <button type="button" onClick={hideForm}>
            Cancel
          </button>
        </form>
      ) : (
        <Button
          type="submit"
          value="Add Subcategory"
          kind="btn--primary--green"
          disabled={false}
          onClick={showForm}
        ></Button>
      )}
    </>
  );
};

export default DashboardCategory;
