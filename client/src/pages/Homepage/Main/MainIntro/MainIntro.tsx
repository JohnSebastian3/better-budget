import { GiReceiveMoney } from "react-icons/gi";
import style from "./MainIntro.module.css";
const MainIntro = () => {
  return (
    <section className={style["main__intro"]}>
      <div className="container">
        <div className={style["main__intro-content"]}>
          <GiReceiveMoney
            size="80px"
            style={{ marginBottom: "20px" }}
          ></GiReceiveMoney>
          <h2>Money matters, and so do you.</h2>
          <p className={style["main__intro-p"]}>
            BetterBudget is a tool to help you get a headstart on your finances
            and build the tomorrow that you want.
          </p>
          <p className={style["main__intro-p"]}>
            Rid yourself of the gloomy days worrying about debt and bills so you
            can have a happier, healthier and wealthier life.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainIntro;
