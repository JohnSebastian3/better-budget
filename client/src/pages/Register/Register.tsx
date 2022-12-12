import React, { useState } from "react";
import axios from "axios";

export default function Register() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const register = () => {
    axios.post('http://localhost:4000/register', {
      email,
      password
    }, {
      withCredentials: true
    }).then(res => {
      if(res.data === 'OK') {
        window.location.href = '/login';
      }
    })
  }

  return( <div>
    <h1>Register</h1>
    <input type="text" placeholder="Email" onChange={handleEmailChange}/>
    <input type="password" placeholder="Password" onChange={handlePasswordChange}/>
    <button onClick={register}>Register</button>
  </div>
  );
}
