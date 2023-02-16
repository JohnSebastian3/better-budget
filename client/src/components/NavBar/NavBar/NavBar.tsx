import { Link } from "react-router-dom";
import MobileNav from "../MobileNav/MobileNav";
import Nav from "../Nav/Nav";
import style from "./NavBar.module.css";
import { FaMoneyBillWave } from "react-icons/fa";
const NavBar = () => {
  return (
    <nav className={style["nav-container"]}>
      <div className={style["nav-content"]}>
        <div className={style["nav-container__logo-container"]}>
          <Link to={"/"} className={style["logo"]}>
            <FaMoneyBillWave color="#3D9970" size="40px" />
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
