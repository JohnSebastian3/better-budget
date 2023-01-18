import axios from 'axios'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { UserInterface } from '../Interfaces/UserInterface'

export const userContext = createContext<Partial<UserInterface>>({})
export default function UserContext(props: PropsWithChildren) {
  const [user, setUser] = useState<UserInterface>()
  useEffect(() => {
    axios.get('https://betterbudget.up.railway.app/user', {withCredentials: true}).then(res => {
      setUser(res.data);
    })
}, [])
  return (
    <userContext.Provider value={user!}>{props.children}</userContext.Provider>
  )
}
