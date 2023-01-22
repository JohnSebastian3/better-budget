import React from "react";
import { Link } from "react-router-dom";
import style from "./Footer.module.css";
import { FaMoneyBillWave } from "react-icons/fa";
import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter } from "react-icons/ai";
const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style["footer__content"]}>
          <Link to={"/"} className={style["footer__logo"]}>
            <FaMoneyBillWave color="#EFF2F1" size="40px" />
            <span>Better Budget</span>
          </Link>
          <h3 style={{textAlign: 'center'}}>For when you wish you had a better budget.</h3>
          <div className={style["footer__links"]}>
            <div className={style["footer__links__explore"]}>
              <h2>Explore</h2>
              <Link to={"/"}>Home</Link>
              <Link to={"/dashboard"}>Dashboard</Link>
            </div>

            <div className={style["footer__links__get-started"]}>
              <h2>Get Started</h2>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
            </div>
          </div>
          <div className={style['footer__copyright']}>
            <div className={style['footer-icons']}>
              <a href="https://github.com/JohnSebastian3" target="_blank"><AiFillGithub size={'30px'}/></a>
              <a href="https://www.linkedin.com/in/johnsguerrero/" target="_blank"><AiFillLinkedin size={'30px'}/></a>
              <a href="https://twitter.com/SebaCodes" target="_blank"><AiOutlineTwitter size={'30px'}/></a>
            </div>
            <small>Developed by John Guerrero &copy; 2023</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
