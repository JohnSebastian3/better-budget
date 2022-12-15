import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import style from "./Header.module.css";
export default function Header() {
  return (
    <header className={style.header}>
      <div className="container">
        <section className={style["header__main-section"]}>
          <h1 className={style["header__h1"]}>
            It's time to make money work in your favor.
          </h1>
          <h2 className={style["header__h2"]}>
            Gain freedom and peace of mind by taking charge of your finances
            with BetterBudget.
          </h2>
          <div>
            <Link to={"/register"}>
              <Button
                type="button"
                value="Start Budgeting"
                kind="btn--primary--green"
              ></Button>
            </Link>
          </div>
        </section>
      </div>
    </header>
  );
}
