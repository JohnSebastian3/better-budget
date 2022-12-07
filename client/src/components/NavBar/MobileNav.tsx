import React, { useState } from "react";
import NavLinks from "./NavLinks";
import classes from "./MobileNav.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { SlClose } from "react-icons/sl";
const MobileNav: React.FC = props => {
  const [open, setOpen] = useState<boolean>(false);
  const hamburgerIcon = (
    <AiOutlineMenu
      className={classes.hamburger}
      size="25px"
      color="#8FCB9B"
      onClick={() => setOpen(!open)}
    />
  );
  const closeHamburgerIcon = (
    <SlClose
      className={classes.hamburger}
      size="25px"
      color="#8FCB9B"
      onClick={() => setOpen(!open)}
    />
  );
  const closeMobileMenu = () => {
    setOpen(false);
  }
  return (
    <nav className={classes["mobile-navigation"]}>
      {open ? closeHamburgerIcon : hamburgerIcon}
      {open && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu}/>}
    </nav>
  );
}

export default MobileNav;
