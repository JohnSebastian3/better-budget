import axios from 'axios'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { UserInterface } from '../Interfaces/UserInterface'

export const UserContext = createContext<Partial<UserInterface>>({})
export default function Context(props: PropsWithChildren) {
  const [user, setUser] = useState<UserInterface>()
  useEffect(() => {
    axios.get('http://localhost:4000/user', {withCredentials: true}).then(res => {
      setUser(res.data);
    })
}, [])
  return (
    <UserContext.Provider value={user!}>{props.children}</UserContext.Provider>
  )
}
