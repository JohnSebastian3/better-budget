import axios from "axios";
import {
  useState,
  useRef,
  useEffect,
  FormEvent,
  SetStateAction,
  Dispatch,
} from "react";
import { AiOutlineCheck, AiFillInfoCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Button from "../../../components/UI/Button/Button";
import style from "./FormRegister.module.css";

const FormRegister = (props: {
  setSuccess: Dispatch<SetStateAction<boolean>>;
}) => {
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

  // Set focus on mount
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  // Determine whether entered username is valid
  useEffect(() => {
    const result = usernameRegex.test(username);
    setValidName(result);
  }, [username]);

  // Determine whether entered password is valid
  useEffect(() => {
    const result = passwordRegex.test(password);
    setValidPwd(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  // If any input changes, remove error message
  useEffect(() => {
    setErrMsg("");
  }, [email, username, password, matchPwd]);

  // register user
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
      await axios.post(
        "/register",
        {
          email: email.toLowerCase(),
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      props.setSuccess(true);
    } catch (err: any) {
      // Determine proper error message to display based on error code received from server
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
    <form onSubmit={(e) => register(e)} className={style["register__form"]}>
      <div className={style["register__header"]}>
        <h1 className={style["register__h1"]}>Sign Up</h1>
      </div>
      <p
        ref={errRef}
        className={
          errMsg ? style["register__errmsg"] : style["regsiter__offscreen"]
        }
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className={style["register__inputs"]}>
        <div className={style["register__email"]}>
          <label htmlFor="email" className={style["register__label"]}>
            Email
          </label>
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
            className={style["register__input"]}
          />
        </div>
        <div className={style["register__username"]}>
          <label htmlFor="username" className={style["register__label"]}>
            Username{" "}
            <span
              className={
                validName ? style["register__valid"] : style["register__hide"]
              }
            >
              <AiOutlineCheck />
            </span>
            <span
              className={
                validName || !username
                  ? style["register__hide"]
                  : style["register__invalid"]
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
            className={style["register__input"]}
          ></input>
          <p
            id="uidnote"
            className={
              userFocus && username && !validName
                ? style["register__instructions"]
                : style["register__offscreen"]
            }
          >
            <AiFillInfoCircle
              size={"15px"}
              className={style["register__info-icon"]}
            />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </div>
        <div className={style["register__password"]}>
          <label htmlFor="password" className={style["register__label"]}>
            Password
            <span
              className={
                validPwd ? style["register__valid"] : style["register__hide"]
              }
            >
              <AiOutlineCheck />
            </span>
            <span
              className={
                validPwd || !password
                  ? style["register__hide"]
                  : style["register__invalid"]
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
            className={style["register__input"]}
          />
          <p
            id="pwdnote"
            className={
              pwdFocus && !validPwd
                ? style["register__instructions"]
                : style["register__offscreen"]
            }
          >
            <AiFillInfoCircle
              size={"15px"}
              className={style["register__info-icon"]}
            />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number, and a
            special character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
        </div>
        <div className={style["register__pwd-match"]}>
          <label htmlFor="confirm-pwd" className={style["register__label"]}>
            Confirm Password
            <span
              className={
                validMatch && matchPwd
                  ? style["register__valid"]
                  : style["register__hide"]
              }
            >
              <AiOutlineCheck />
            </span>
            <span
              className={
                validMatch || !matchPwd
                  ? style["register__hide"]
                  : style["register__invalid"]
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
            className={style["register__input"]}
          />
          <p
            id="confirmnote"
            className={
              matchFocus && !validMatch
                ? style["register__instructions"]
                : style["register__offscreen"]
            }
          >
            <AiFillInfoCircle
              size={"15px"}
              className={style["register__info-icon"]}
            />
            Passwords must match.
          </p>
        </div>
      </div>
      <div className={style["register__submit"]}>
        <Button
          type="submit"
          kind="btn--primary--green"
          modifier="btn--small"
          value="Sign Up"
          disabled={!validName || !validPwd || !validMatch ? true : false}
        />
      </div>
    </form>
  );
};

export default FormRegister;
