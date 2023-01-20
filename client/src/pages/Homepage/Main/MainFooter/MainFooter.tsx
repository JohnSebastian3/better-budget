import React from "react";
import style from "./MainFooter.module.css";
import { AiOutlineDashboard } from "react-icons/ai";
import Button from "../../../../components/UI/Button/Button";
import { Link } from "react-router-dom";
const MainFooter = () => {
  return (
    <section className={style["main__footer"]}>
      <div className="container">
        <div className={style["main__footer-content"]}>
          <AiOutlineDashboard
            size="80px"
            style={{ marginBottom: "20px" }}
          ></AiOutlineDashboard>
          <h2>Stop feeling guilty when you spend.</h2>
          <p>Start spending with confidence and without guilt.</p>
          <Link to={"/register"}>
            <Button
              type={"button"}
              value={"Create Your Budget"}
              kind={"btn--primary--green"}
              disabled={false}
            ></Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainFooter;
