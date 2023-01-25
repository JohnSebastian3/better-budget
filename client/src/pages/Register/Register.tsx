import React, { useState, useEffect, useRef, FormEvent } from "react";
import axios from "axios";
import style from "./Register.module.css";
import Card from "../../components/UI/Card/Card";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Footer from "../../components/Footer/Footer";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { AiFillInfoCircle } from "react-icons/ai";
import { E } from "chart.js/dist/chunks/helpers.core";

const Register = () => {
  // Username must start with letter be followed by 3-23 characters that can be letters, digits, hyphens, or underscores
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

  // Password must have at least one lower case letter, one uppercase letter, one digit, one special char and be between 8-24 characters
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const userRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState<string>("");
  const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const result = usernameRegex.test(username);
    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = passwordRegex.test(password);
    setValidPwd(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, username, password, matchPwd]);

  const register = async (e: FormEvent) => {
    e.preventDefault();

    //Prevent enabled button with JS hack
    const v1 = usernameRegex.test(username);
    const v2 = passwordRegex.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const res = await axios.post(
        "https://better-budget-production.up.railway.app/register",
        {
          email: email.toLowerCase(),
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Repsonse");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken");
      } else if (err.response?.status === 402) {
        setErrMsg("Email already in use");
      } else {
        setErrMsg("Registration failed");
      }
    }
  };

  return (
    <>
      {success ? (
        <div className={style["register"]}>
          <Card>
            <div className={style["register-container"]}>
              <h1>Success!</h1>
              <p>
                <Link to={"/login"}>Log In</Link>
              </p>
            </div>
          </Card>
        </div>
      ) : (
        <>
          <div className={style["register"]}>
            <Card>
              <div className={style["register-container"]}>
                <form onSubmit={(e) => register(e)}>
                  <div className={style["register-header"]}>
                    <h1>Sign Up</h1>
                  </div>
                  <p
                    ref={errRef}
                    className={errMsg ? style['errmsg'] : style['offscreen']}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <div className={style["register-inputs"]}>
                    <div className={style["email-wrapper"]}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        id="email"
                        autoComplete="off"
                        ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                      />
                    </div>
                    <div className={style["username-wrapper"]}>
                      <label htmlFor="username">
                        Username{" "}
                        <span
                          className={validName ? style["valid"] : style["hide"]}
                        >
                          <AiOutlineCheck />
                        </span>
                        <span
                          className={
                            validName || !username
                              ? style["hide"]
                              : style["invalid"]
                          }
                        >
                          {" "}
                          <RxCross2 />
                        </span>
                      </label>
                      <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        ref={userRef}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                      ></input>
                      <p
                        id="uidnote"
                        className={
                          userFocus && username && !validName
                            ? style["instructions"]
                            : style["offscreen"]
                        }
                      >
                        <AiFillInfoCircle size={"15px"} />
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                      </p>
                    </div>
                    <div className={style["password-wrapper"]}>
                      <label htmlFor="password">
                        Password
                        <span
                          className={validPwd ? style["valid"] : style["hide"]}
                        >
                          <AiOutlineCheck />
                        </span>
                        <span
                          className={
                            validPwd || !password
                              ? style["hide"]
                              : style["invalid"]
                          }
                        >
                          <RxCross2 />
                        </span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                      />
                      <p
                        id="pwdnote"
                        className={
                          pwdFocus && !validPwd
                            ? style["instructions"]
                            : style["offscreen"]
                        }
                      >
                        <AiFillInfoCircle size={"15px"} />
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number,
                        and a special character.
                        <br />
                        Allowed special characters:{" "}
                        <span aria-label="exclamation mark">!</span>{" "}
                        <span aria-label="at symbol">@</span>{" "}
                        <span aria-label="hashtag">#</span>{" "}
                        <span aria-label="dollar sign">$</span>{" "}
                        <span aria-label="percent">%</span>
                      </p>
                    </div>
                    <div className={style["pwd-match-wrapper"]}>
                      <label htmlFor="confirm-pwd">
                        Confirm Password
                        <span
                          className={
                            validMatch && matchPwd
                              ? style["valid"]
                              : style["hide"]
                          }
                        >
                          <AiOutlineCheck />
                        </span>
                        <span
                          className={
                            validMatch || !matchPwd
                              ? style["hide"]
                              : style["invalid"]
                          }
                        >
                          <RxCross2 />
                        </span>
                      </label>
                      <input
                        type="password"
                        id="confirm-pwd"
                        required
                        onChange={(e) => setMatchPwd(e.target.value)}
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                      />
                      <p
                        id="confirmnote"
                        className={
                          matchFocus && !validMatch
                            ? style["instructions"]
                            : style["offscreen"]
                        }
                      >
                        <AiFillInfoCircle size={"15px"} />
                        Passwords must match.
                      </p>
                    </div>
                  </div>
                  <div className={style["form-button"]}>
                    <Button
                      type="submit"
                      kind="btn--primary--green"
                      modifier="btn--small"
                      value="Sign Up"
                      disabled={
                        !validName || !validPwd || !validMatch ? true : false
                      }
                    />
                  </div>
                </form>
              </div>
            </Card>
            <span className={style["register-link"]}>
              Already have an account?
              <Link to={"/login"} className={style["link"]}>
                Log in!
              </Link>
            </span>
          </div>
        </>
      )}
      <Footer></Footer>
    </>
  );
};

export default Register;
