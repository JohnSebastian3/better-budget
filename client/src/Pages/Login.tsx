import React, { useState } from 'react'
import axios from 'axios';
export default function Login() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('')

  const login = () => {
    axios.post("http://localhost:4000/login", {
      email,
      password
    }, {
      withCredentials: true
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getUser = () => {
    axios.get('http://localhost:4000/user', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    }, ).then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder='email' onChange={handleEmailChange} value={email}/>
      <input type="text" placeholder='password' onChange={handlePasswordChange} value={password}/>
    <button onClick={login}>Login</button>
    <button onClick={getUser}>Get User That is Logged In</button>
    </div>
  )
}
