import { useState } from "react";
import style from "./Register.module.css";
import Card from "../../components/UI/Card/Card";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer/Footer";

import FormRegister from "./FormRegister/FormRegister";

const Register = () => {
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <>
      {/* If register was a success, display special card to direct user to login */}
      {success ? (
        <section className={style["register"]}>
          <Card>
            <div className={style["register__container"]}>
              <div className={style["register__redirect"]}>
                <h1>Success!</h1>
                <p>
                  <Link
                    to={"/login"}
                    className={style["register__redirect-link"]}
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </Card>
        </section>
      ) : (
        <>
          {/* Default register section */}
          <section className={style["register"]}>
            <Card>
              <div className={style["register__container"]}>
                <FormRegister setSuccess={setSuccess} />
              </div>
            </Card>
            <span className={style["register__link-wrapper"]}>
              Already have an account?
              <Link to={"/login"} className={style["register__link"]}>
                Log in!
              </Link>
            </span>
          </section>
        </>
      )}
      <Footer></Footer>
    </>
  );
};

export default Register;
