import React, { useState } from "react";
import NavLinks from "../NavLinks/NavLinks";
import style from "./MobileNav.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { SlClose } from "react-icons/sl";
import { AnimatePresence } from "framer-motion";

const MobileNav: React.FC = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleHamburgerClick = () => {
    if (open) {
      document.body.style.overflow = "visible";
    } else if (!open) {
      document.body.style.overflow = "hidden";
    }

    setOpen(!open);
  };

  const hamburgerIcon = (
    <AiOutlineMenu
      className={style.hamburger}
      size="25px"
      color="#3D9970"
      style={{ cursor: "pointer" }}
      onClick={handleHamburgerClick}
    />
  );
  const closeHamburgerIcon = (
    <SlClose
      className={style.hamburger}
      size="25px"
      color="#3D9970"
      style={{ cursor: "pointer" }}
      onClick={handleHamburgerClick}
    />
  );
  const closeMobileMenu = () => {
    setOpen(false);
  };
  return (
    <div className={style["nav__mobile-nav"]}>
      {open ? closeHamburgerIcon : hamburgerIcon}
      <AnimatePresence>
        {open && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu} />}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
