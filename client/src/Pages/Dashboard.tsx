import React, { useContext } from 'react'
import { userContext } from './Context'

export default function Dashboard() {
  const ctx = useContext(userContext);
  return (
    <div>
      <h1>Currently Logged in user: {ctx.username}</h1>  
    </div>
  )
}
