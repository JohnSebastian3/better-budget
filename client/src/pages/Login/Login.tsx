import React, { useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = () => {
    axios
      .post(
        "https://better-budget-production.up.railway.app/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data === "OK") {
          window.location.href = "/dashboard";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="email"
          onChange={handleEmailChange}
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          onChange={handlePasswordChange}
          value={password}
        />
        <button onClick={login}>Login</button>
      </div>
      <Footer></Footer>
    </>
  );
}
