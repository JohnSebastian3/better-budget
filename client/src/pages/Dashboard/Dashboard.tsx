import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export default function Dashboard() {
  const ctx = useContext(UserContext);
  return (
    <div>
      <h1>Currently Logged in user: {ctx.username}</h1>  
    </div>
  )
}
