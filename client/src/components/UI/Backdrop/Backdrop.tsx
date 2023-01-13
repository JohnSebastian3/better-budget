import React, { ReactEventHandler } from "react";
import { ReactNode } from "react";
import style from "./Backdrop.module.css";
import {motion} from "framer-motion";

const Backdrop = (props: { children: ReactNode; onClick: ReactEventHandler }) => {
  return (
    <motion.div className={style["backdrop"]} onClick={props.onClick} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      {props.children}
    </motion.div>
  );
};

export default Backdrop;
