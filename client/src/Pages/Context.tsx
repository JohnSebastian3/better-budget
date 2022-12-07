import React, { createContext, PropsWithChildren, useEffect } from 'react'

export const myContext = createContext<any>({})
export default function Context(props: PropsWithChildren) {
//   useEffect(() => {

// }, [])
  return (
    <myContext.Provider value={1000}>{props.children}</myContext.Provider>
  )
}
