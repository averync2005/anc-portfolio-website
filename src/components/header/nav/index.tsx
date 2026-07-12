"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { height } from "../anim";
import Body from "./body/body";
import { links } from "@/components/header/config";
import { cn } from "@/lib/utils";

interface NavProps {
  setIsActive: (isActive: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ setIsActive }) => {
  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.nav}
    >
      <div className={cn(styles.wrapper, "flex justify-end sm:justify-start")}>
        <div className={styles.container}>
          <Body links={links} setIsActive={setIsActive} />
        </div>
      </div>
    </motion.div>
  );
};

export default Nav;
