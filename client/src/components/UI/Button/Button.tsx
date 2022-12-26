import React from "react";
import style from "./Button.module.css";

type ButtonProps = {
  type: "submit" | "reset" | "button";
  value: string;
  kind: string;
  disabled: boolean;
  onClick?: () => void;
};

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      className={`${style.btn} ${style[props.kind]}`}
      disabled={props.disabled}
      onClick={props.onClick ? props.onClick : () => {}}
    >
      {props.value}
    </button>
  );
};

export default Button;
