import React from "react";
import style from "./MainDescription.module.css";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";
const MainDescription = () => {
  return (
    <section id="main__description" className={style["main__description"]}>
      <div className="container">
        <div className={style["main__description-content"]}>
          <TbDeviceDesktopAnalytics size={"80px"} style={{ marginBottom: "20px" }}></TbDeviceDesktopAnalytics>
          <h2>How It Works</h2>
          <div className={style.step}>
            <h3>Create an account for free</h3>
            <p>
              BetterBudget is free to use and always will be. You can <Link to={'/register'} className={style['inline-link']}>start your
              budgeting journey</Link> without ever having to take out your wallet.
            </p>
          </div>

          <div className={style.step}>
            <h3>Log in and start budgeting</h3>

            <p>
              Once you've created an account, you can get started on tracking
              expenses in your <Link to={'/dashboard'} className={style['inline-link']}>dashboard</Link>.
            </p>
          </div>
          <div className={style.step}>
            <h3>Profit</h3>
            <p>
              Over time, budgeting will help bolster your savings as well as
              your confidence in your financial future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainDescription;
