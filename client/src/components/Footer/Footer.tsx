import React from "react";
import { Link } from "react-router-dom";
import style from "./Footer.module.css";
import { FaMoneyBillWave } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style["foter__content"]}>
          <Link to={"/"} className={style["footer__logo"]}>
            <FaMoneyBillWave color="#EFF2F1" size="40px" />
            <span>Better Budget</span>
          </Link>
          <h3>For when you wish you had a better budget.</h3>
          <div className={style["footer__links"]}>
            <div className={style["footer__links__explore"]}>
              <h3>Explore</h3>
              <Link to={"/"}>Home</Link>
              <Link to={"/dashboard"}>Dashboard</Link>
            </div>

            <div className={style["footer__links__get-started"]}>
              <h3>Get Started</h3>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
