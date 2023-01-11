import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./NavLinks.module.css";
import { motion } from "framer-motion";
import { userContext } from "../../../context/UserContext";
import axios from "axios";
const NavLinks: React.FC<{
  isMobile: boolean;
  closeMobileMenu: () => void;
}> = (props) => {
  const ctx = useContext(userContext);
  const animateFrom = { opacity: 0, y: -10 };
  const animateTo = { opacity: 1, y: 0 };

  const logout = () => {
    axios
      .get("https://better-budget-production.up.railway.app/logout", { withCredentials: true })
      .then((res) => {
        if (res.data === "OK") {
          document.body.style.overflow = "visible";
          window.location.href = "/";
        }
      });
  };

  const resetHomeOverflow = () => {
    document.body.style.overflow = "visible";
  };
  return (
    <>
      {props.isMobile ? (
        <>
          <motion.ul
            initial={animateFrom}
            animate={animateTo}
            exit={{opacity: 0}}
            transition={{ delay: 0.1 }}
            className={style["nav-links"]}
          >
            <motion.li
              initial={animateFrom}
              animate={animateTo}
              transition={{ delay: 0.2 }}
              onClick={() => props.isMobile && props.closeMobileMenu()}
            >
              <Link
                to={"/"}
                onClick={resetHomeOverflow}
                className={style["nav-links__item"]}
              >
                Home
              </Link>
            </motion.li>
            {ctx ? (
              <>
                <motion.li
                  initial={animateFrom}
                  animate={animateTo}
                  transition={{ delay: 0.3 }}
                  onClick={() => props.isMobile && props.closeMobileMenu()}
                >
                  <Link
                    to={"/dashboard"}
                    onClick={resetHomeOverflow}
                    className={style["nav-links__item"]}
                  >
                    Dashboard
                  </Link>
                </motion.li>
                <motion.li
                  initial={animateFrom}
                  animate={animateTo}
                  transition={{ delay: 0.4 }}
                  onClick={() => props.isMobile && props.closeMobileMenu()}
                >
                  <Link
                    onClick={logout}
                    to={"/login"}
                    className={style["nav-links__item"]}
                  >
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
                  <Link
                    to={"/login"}
                    onClick={resetHomeOverflow}
                    className={style["nav-links__item"]}
                  >
                    Login
                  </Link>
                </motion.li>
                <motion.li
                  initial={animateFrom}
                  animate={animateTo}
                  transition={{ delay: 0.4 }}
                  onClick={() => props.isMobile && props.closeMobileMenu()}
                >
                  <Link
                    to={"/register"}
                    onClick={resetHomeOverflow}
                    className={style["nav-links__item"]}
                  >
                    Register
                  </Link>
                </motion.li>
              </>
            )}
          </motion.ul>
        </>
      ) : (
        <ul className={style["nav-links"]}>
          <Link
            to={"/"}
            onClick={resetHomeOverflow}
            className={style["nav-links__item"]}
          >
            Home
          </Link>
          {ctx ? (
            <>
              <Link
                to={"/dashboard"}
                onClick={resetHomeOverflow}
                className={style["nav-links__item"]}
              >
                Dashboard
              </Link>
              <Link
                onClick={logout}
                to={"/login"}
                className={style["nav-links__item"]}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                onClick={resetHomeOverflow}
                className={style["nav-links__item"]}
              >
                Login
              </Link>
              <Link
                to={"/register"}
                onClick={resetHomeOverflow}
                className={style["nav-links__item"]}
              >
                Register
              </Link>
            </>
          )}
        </ul>
      )}
    </>
  );
};

export default NavLinks;
