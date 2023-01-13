import React, { ReactEventHandler, ReactNode } from "react";
import style from "./Modal.module.css";
import { motion } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props: {
  handleClose: ReactEventHandler;
  children: ReactNode;
}) => {
  const dropIn = {
    hidden: {
      y: "-20vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 12,
        sitffness: 100,
      },
    },
    exit: {
      y: "0",
      opacity: 0,
    },
  };

  return (
    <Backdrop onClick={props.handleClose}>
      <motion.div
        onClick={(e) => e?.stopPropagation()}
        className={style["modal"]}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >{props.children}</motion.div>
    </Backdrop>
  );
};

export default Modal;
