import { useState, useRef, useEffect, FormEvent } from "react";
import style from "./LoginForm.module.css";
import axios from "axios";
import Button from "../../../components/UI/Button/Button";

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const login = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "/login",
        {
          email: email.toLowerCase(),
          password,
        },
        {
          withCredentials: true,
        }
      );

      setSuccess(true);
      setEmail("");
      setPassword("");

      window.location.href = "/dashboard";
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Incorrect Email or Password");
      } else {
        setErrMsg("Log In Failed");
      }
    }
  };

  return (
    <form onSubmit={(e) => login(e)}>
      <div className={style["login-header"]}>
        <h1>Log In</h1>
        <p
          ref={errRef}
          className={errMsg ? style["errmsg"] : style["offscreen"]}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </div>
      <div className={style["login-inputs"]}>
        <div className={style["email-wrapper"]}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            ref={emailRef}
            autoComplete="off"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={style["password-wrapper"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      </div>
      <div className={style["form-button"]}>
        <Button
          type="submit"
          kind="btn--primary--green"
          modifier="btn--small"
          value="Log In"
          disabled={false}
        />
      </div>
    </form>
  );
};

export default LoginForm;
