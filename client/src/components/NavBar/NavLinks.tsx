import React from "react";
import { Link } from "react-router-dom";
import classes from "./NavLinks.module.css";
import { motion } from "framer-motion";
const NavLinks: React.FC<{ isMobile: boolean; closeMobileMenu: () => void }> = (
  props
) => {
  const animateFrom = { opacity: 0, y: -40 };
  const animateTo = { opacity: 1, y: 0 };
  return (
    <motion.ul
      initial={animateFrom}
      animate={animateTo}
      transition={{ delay: 0.1 }}
      className={classes["nav-links"]}
    >
      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.1 }}
        onClick={() => props.isMobile && props.closeMobileMenu()}
      >
        <Link to={"/login"}>Login</Link>
      </motion.li>
      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.2 }}
        onClick={() => props.isMobile && props.closeMobileMenu()}
      >
        <Link to={"/"}>Home</Link>
      </motion.li>
      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.3 }}
        onClick={() => props.isMobile && props.closeMobileMenu()}
      >
        <Link to={"/register"}>Register</Link>
      </motion.li>
    </motion.ul>
  );
};

export default NavLinks;
