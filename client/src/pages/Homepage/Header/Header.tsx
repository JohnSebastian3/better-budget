import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./Header.module.css";
export default function Header() {
  return (
    <header className={classes.header}>
      <div className="container">
        <section className={classes['header__main-section']}>
          <h1 className={classes["header__h1"]}>
            It's time to make money work in your favor.
          </h1>
          <h2 className={classes["header__h2"]}>
            Gain freedom by taking charge of your finances.
          </h2>
          <Button type='button' value='Start Budgeting' classes='btn btn-primary'></Button>
        </section>
      </div>
    </header>
  );
}
