import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./NavLinks.module.css";
import { motion } from "framer-motion";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
const NavLinks: React.FC<{ isMobile: boolean; closeMobileMenu: () => void }> = (
  props
) => {
  const ctx = useContext(UserContext);
  const animateFrom = { opacity: 0, y: -40 };
  const animateTo = { opacity: 1, y: 0 };

  const logout = () => {
    axios
      .get("http://localhost:4000/logout", { withCredentials: true })
      .then((res) => {
        if (res.data === "OK") {
          window.location.href = "/";
        }
      });
  };
  return (
    <>
      {props.isMobile ? (
        <>
          <motion.ul
            initial={animateFrom}
            animate={animateTo}
            transition={{ delay: 0.1 }}
            className={classes["nav-links"]}
          >
            <motion.li
              initial={animateFrom}
              animate={animateTo}
              transition={{ delay: 0.2 }}
              onClick={() => props.isMobile && props.closeMobileMenu()}
            >
              <Link to={"/"}>Home</Link>
            </motion.li>
            {ctx ? (
              <>
                <motion.li
                  initial={animateFrom}
                  animate={animateTo}
                  transition={{ delay: 0.3 }}
                  onClick={() => props.isMobile && props.closeMobileMenu()}
                >
                  <Link to={"/dashboard"}>Dashboard</Link>
                </motion.li>
                <motion.li
                  initial={animateFrom}
                  animate={animateTo}
                  transition={{ delay: 0.4 }}
                  onClick={() => props.isMobile && props.closeMobileMenu()}
                >
                  <Link onClick={logout} to={"/login"}>
                    Logout
                  </Link>
                </motion.li>
              </>
            ) : (
              <>
                <motion.li
                  initial={animateFrom}
                  animate={animateTo}
                  transition={{ delay: 0.3 }}
                  onClick={() => props.isMobile && props.closeMobileMenu()}
                >
                  <Link to={"/login"}>Login</Link>
                </motion.li>
                <motion.li
                  initial={animateFrom}
                  animate={animateTo}
                  transition={{ delay: 0.4 }}
                  onClick={() => props.isMobile && props.closeMobileMenu()}
                >
                  <Link to={"/register"}>Register</Link>
                </motion.li>
              </>
            )}
          </motion.ul>
        </>
      ) : (
        <ul className={classes["nav-links"]}>
          <Link to={"/"}>Home</Link>
          {ctx ? (
            <>
              <Link to={"/dashboard"}>Dashboard</Link>
              <Link onClick={logout} to={"/login"}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to={"/register"}>Register</Link>
              <Link to={"/login"}>Login</Link>
            </>
          )}
        </ul>
      )}
    </>
  );
};

export default NavLinks;
