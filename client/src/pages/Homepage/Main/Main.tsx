import MainDescription from "./MainDescription/MainDescription";
import MainIntro from "./MainIntro/MainIntro";
import style from "./Main.module.css";
import MainFooter from "./MainFooter/MainFooter";
const Main = () => {
  return (
    <main id="main" className={style.main}>
      <MainIntro />
      <MainDescription />
      <MainFooter />
    </main>
  );
};

export default Main;
