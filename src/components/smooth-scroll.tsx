"use client";

import React from "react";
import { ReactLenis } from "@/lib/lenis";

interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}

function SmoothScroll({ children, isInsideModal = false }: LenisProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 2,
        prevent: (node) => {
          if (isInsideModal) return true;
          return node.classList.contains("modall");
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
