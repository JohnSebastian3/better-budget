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
            <FaMoneyBillWave
              color="#EFF2F1"
              size="40px"
              className={style["footer__logo-icon"]}
            />
            <span>Better Budget</span>
          </Link>
          <h3 className={style["footer__h3"]}>
            For when you wish you had a better budget.
          </h3>
          <div className={style["footer__links"]}>
            <div className={style["footer__explore-links"]}>
              <h2>Explore</h2>
              <Link to={"/"} className={style["footer__link"]}>
                Home
              </Link>
              <Link to={"/dashboard"} className={style["footer__link"]}>
                Dashboard
              </Link>
            </div>

            <div className={style["footer__auth-links"]}>
              <h2>Get Started</h2>
              <Link to={"/login"} className={style["footer__link"]}>
                Login
              </Link>
              <Link to={"/register"} className={style["footer__link"]}>
                Register
              </Link>
            </div>
          </div>
          <div className={style["footer__copyright"]}>
            <div className={style["footer__socials"]}>
              <a
                href="https://github.com/JohnSebastian3"
                target="_blank"
                rel="noreferrer"
                className={style["footer__link"]}
              >
                <AiFillGithub size={"30px"} />
              </a>
              <a
                href="https://www.linkedin.com/in/johnsguerrero/"
                target="_blank"
                rel="noreferrer"
                className={style["footer__link"]}
              >
                <AiFillLinkedin size={"30px"} />
              </a>
              <a
                href="https://twitter.com/SebaCodes"
                target="_blank"
                rel="noreferrer"
                className={style["footer__link"]}
              >
                <AiOutlineTwitter size={"30px"} />
              </a>
            </div>
            <small>Developed by John Guerrero &copy; 2023</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
