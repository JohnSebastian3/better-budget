import Footer from "../../components/Footer/Footer";
import Card from "../../components/UI/Card/Card";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";

const Login = () => {
  return (
    <>
      <section className={style["login"]}>
        <Card>
          <div className={style["login__container"]}>
            <LoginForm />
          </div>
        </Card>
        <span className={style["register-link"]}>
          Don't have an account?
          <Link to={"/register"} className={style["link"]}>
            Create an account!
          </Link>
        </span>
      </section>
      <Footer></Footer>
    </>
  );
};

export default Login;
