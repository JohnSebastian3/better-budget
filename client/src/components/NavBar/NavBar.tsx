import React from "react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import classes from "./NavBar.module.css";
export default function NavBar() {
  return (
    <div className={classes['nav-container']}>
      <h1 className={classes['nav-container__main-heading']}>Better Budget</h1>
      <MobileNav />
      <Nav />
    </div>
  );
}
