import React from "react";
import NavLinks from "./NavLinks";
import classes from './Nav.module.css';
export default function Nav() {
  return (
    <nav className={classes.navigation}>
      <NavLinks isMobile={false} closeMobileMenu={function (): void {
        throw new Error("Function not implemented.");
      } } />
    </nav>
  );
}
