"use client";

/**
 * Fixed top bar (theme toggle + menu button that opens the full-screen nav)
 */




// ---------------------------------
// Imports
// ---------------------------------

// React and animation
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Styles and animation variants
import styles from "./style.module.scss";
import { opacity, background } from "./anim";

// Components
import Nav from "./nav";
import FunnyThemeToggle from "../theme/funny-theme-toggle";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";




// ---------------------------------
// Header
// ---------------------------------

/**
 * Slides in from the top once the page loads
 * - `loader` delays the entrance until the preloader finishes (3.5 s)
 */
const Header = ({ loader }: { loader?: boolean }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <motion.header
      className={cn(styles.header, "transition-colors delay-100 duration-500 ease-in z-[1000]")}
      style={{ background: isActive ? "hsl(var(--background) / .8)" : "transparent" }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: loader ? 3.5 : 0, duration: 0.8 }}
    >
      <div className={cn(styles.bar, "flex items-center justify-between")}>
        <FunnyThemeToggle className="w-6 h-6 mr-4 hidden md:flex" />
        <Button
          variant={"ghost"}
          onClick={() => setIsActive(!isActive)}
          className={cn(styles.el, "m-0 p-0 h-6 bg-transparent flex items-center justify-center")}
        >
          <div className="relative hidden md:flex items-center">
            <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>
              Menu
            </motion.p>
            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>
              Close
            </motion.p>
          </div>
          <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
        </Button>
      </div>

      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className={styles.background}
      ></motion.div>

      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} />}
      </AnimatePresence>
    </motion.header>
  );
};




// ---------------------------------
// Export
// ---------------------------------

export default Header;