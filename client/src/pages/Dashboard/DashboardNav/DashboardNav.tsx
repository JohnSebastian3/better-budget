import style from "./DashboardNav.module.css";
import { FaMoneyBillWave } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";

const DashboardNav = () => {
  const logout = () => {
    axios.get("/logout", { withCredentials: true }).then((res) => {
      if (res.data === "OK") {
        document.body.style.overflow = "visible";
        window.location.href = "/";
      }
    });
  };

  return (
    <nav className={style["dashboard__nav"]}>
      <Link to={"/"} className={style["logo"]}>
        <FaMoneyBillWave color="#3D9970" size="45px" />
      </Link>
      <div className={style["dashboard__nav__links"]}>
        <Link to={"/"} className={style["dashboard__nav__item"]}>
          <div className={style["dashboard__nav__link"]}>
            <AiFillHome color="#3D9970" size="20px" />
            <span className={style["nav-span"]}>Home</span>
          </div>
        </Link>
        <Link
          onClick={logout}
          to={"/login"}
          className={style["dashboard__nav__item"]}
        >
          <div className={style["dashboard__nav__link"]}>
            <RiLogoutBoxFill color="#3D9970" size="20px" />
            <span className={style["nav-span"]}>Logout</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default DashboardNav;
