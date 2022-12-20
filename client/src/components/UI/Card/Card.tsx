import React, { PropsWithChildren, ReactNode } from 'react'
import style from './Card.module.css';
const Card = (props: {children: ReactNode}) => {
  return (
    <div className={style.card}>{props.children}</div>
  )
}

export default Card