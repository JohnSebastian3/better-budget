import { Link } from "react-router-dom";
import MobileNav from "../MobileNav/MobileNav";
import Nav from "../Nav/Nav";
import style from "./NavBar.module.css";
import { FaMoneyBillWave } from "react-icons/fa";
const NavBar = () => {
  return (
    <nav className={style["nav"]}>
      <div className={style["nav__content"]}>
        <div className={style["nav__logo-container"]}>
          <Link to={"/"} className={style["logo-link"]}>
            <FaMoneyBillWave
              color="#3D9970"
              size="40px"
              className={style["logo"]}
            />
            <span>Better Budget</span>
          </Link>
        </div>
        <MobileNav />
        <Nav />
      </div>
    </nav>
  );
};

export default NavBar;
