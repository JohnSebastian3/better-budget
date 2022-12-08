import React from "react";

type ButtonProps = {
  type: 'submit' | 'reset' | 'button';
  value: string;
  classes: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button type={props.type} className={props.classes}>{props.value}</button>
  )
}

export default Button;