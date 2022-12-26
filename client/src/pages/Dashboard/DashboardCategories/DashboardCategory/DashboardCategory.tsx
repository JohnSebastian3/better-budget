import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/UI/Button/Button";
import { TransactionInterface } from "../../../../Interfaces/TransactionInterface";
import style from "./DashboardCategory.module.css";
import DashboardSubcategory from "./DashboardSubcategory/DashboardSubcategory";
const DashboardCategory = (props: {
  transactions: TransactionInterface[];
  category: string;
  subcategories: string[];
  onAddSubcategory: (newSubcategory: string, category: string) => void;
}) => {
  const { register, handleSubmit, reset } = useForm();

  const [isFormShown, setIsFormShown] = useState<boolean>(false);
  const [subcategories, setSubcategories] = useState<string[]>([]);

  useEffect(() => {
    setSubcategories(props.subcategories);
  }, []);

  const transactions = props.transactions.filter((transaction) => {
    return transaction.category === props.category;
  });

  const onSubmit = (data: any) => {
    let newSubcategory = data.subcategory.toLowerCase();
    newSubcategory = newSubcategory[0].toUpperCase() + newSubcategory.slice(1);
    axios
      .post(
        `http://localhost:4000/dashboard/addSubcategory/${props.category}`,
        {
          subcategory: newSubcategory,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setSubcategories((prev) => {
          return [...prev, newSubcategory];
        });
        props.onAddSubcategory(newSubcategory, props.category);
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

  return (
    <>
      <div className={style["income-header"]}>
        <h2>{props.category}</h2>
      </div>
      <div>
        {subcategories.map((subcategory, index) => {
          return (
            <DashboardSubcategory
              key={index}
              subcategory={subcategory}
              transactions={transactions}
              category={props.category}
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
