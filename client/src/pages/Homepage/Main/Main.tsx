import style from "./Main.module.css";
import { GiReceiveMoney } from "react-icons/gi";
const Main = () => {
  return (
    <main className={style.main}>
      <div className="container">
        <section className={style["main__main-section"]}>
          <GiReceiveMoney size="80px"></GiReceiveMoney>
          <h2>Money matters, and so do you.</h2>
          <p>
            BetterBudger is a tool to help you get a headstart on your finances
            and build the tomorrow that you want.
          </p>
          <p>
            Rid yourself of the gloomy days worrying about debt and bills so you
            can have a happier, healthier and wealthier life.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Main;
