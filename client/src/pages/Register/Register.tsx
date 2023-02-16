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
            <div className={style["register-container"]}>
              <div className={style["redirect-container"]}>
                <h1>Success!</h1>
                <p>
                  <Link to={"/login"} className={style["redirect-link"]}>
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
              <div className={style["register-container"]}>
                <FormRegister setSuccess={setSuccess} />
              </div>
            </Card>
            <span className={style["register-link"]}>
              Already have an account?
              <Link to={"/login"} className={style["link"]}>
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
