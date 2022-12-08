import React from "react";
import { Link } from "react-router-dom";
import MobileNav from "../MobileNav/MobileNav";
import Nav from "../Nav/Nav";
import classes from "./NavBar.module.css";
export default function NavBar() {
  return (
    <div className={classes['nav-container']}>
      <Link to={'/'} className={classes['nav-container__logo']}><span >Better Budget</span></Link>
      <MobileNav />
      <Nav />
    </div>
  );
}
