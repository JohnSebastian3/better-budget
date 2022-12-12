import React from "react";
import { Link } from "react-router-dom";
import MobileNav from "../MobileNav/MobileNav";
import Nav from "../Nav/Nav";
import style from "./NavBar.module.css";
export default function NavBar() {
  return (
    <div className={style["nav-container"]}>
      <div className={style['nav-container__logo-container']}>
        <Link to={"/"} className={style["logo"]}>
          <span>Better Budget</span>
        </Link>
      </div>
      <MobileNav />
      <Nav />
    </div>
  );
}
