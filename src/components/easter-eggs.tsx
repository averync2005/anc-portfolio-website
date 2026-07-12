"use client";
import { useDevToolsOpen } from "@/hooks/use-devtools-open";
import React, { useEffect, useState } from "react";
import NyanCat from "./nyan-cat";
import { AnimatePresence } from "framer-motion";

const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();
  useEffect(() => {
    if (!isDevToolsOpen) return;
    if (typeof console !== "undefined") {
      console.clear();
      console.log(
        "%cWhoa, look at you! 🕵️‍♂️\n" +
          "You found the secret console. Impressive.\n" +
          "Want to see something cool? ✨\n" +
          "Type %cAvery%c and hit enter 🎩",
        "color: #FFD700; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:20px",
        "color: #00FF00; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:20px",
        "color: #FFD700; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;"
      );

      ["avery", "Avery", "AVERY"].forEach((name) => {
        // @ts-ignore
        if (Object.hasOwn(window, name)) return;
        Object.defineProperty(window, name, {
          get() {
            console.log(
              "%c✨ There we go! ✨\n\n" +
                "You found me. Builder. Engineer. Rock climber.\n" +
                "Not impressed yet? I also make robots. 🤖🛸",
              "color: #FF4500; font-size: 18px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:10px"
            );

            (window as any).__nyanUnlocked = true;

            const timer = setTimeout(() => {
              console.log(
                "%cOne more secret 🤫\n\n" +
                  "Close devtools, go back to the page, and press %cn%c. You're welcome. 🌈🐱",
                "color: #FF69B4; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;",
                "color: #00FF00; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;",
                "color: #FF69B4; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;"
              );
              clearTimeout(timer);
            }, 5000);
            return "";
          },
        });
      });
    }
  }, [isDevToolsOpen]);

  return (
    <>
      <NyanCat />
    </>
  );
};

export default EasterEggs;
