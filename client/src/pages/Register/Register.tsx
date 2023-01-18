import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const register = () => {
    axios
      .post(
        "https://better-budget-production.up.railway.app/register",
        {
          email,
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data === "OK") {
          window.location.href = "/login";
        }
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Email"
        onChange={handleEmailChange}
        value={email}
      />
      <input
        type="text"
        placeholder="Username"
        onChange={handleUsernameChange}
        value={username}
      ></input>
      <input
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
        value={password}
      />
      <button onClick={register}>Register</button>
    </div>
  );
}
