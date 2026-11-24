/**
 * Large centered section title that links to its own anchor
 * - Scrolls away with the page (no longer sticky, so it can't sit on top of section content)
 */




// ---------------------------------
// Imports
// ---------------------------------

import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BoxReveal } from "../reveal-animations";




// ---------------------------------
// SectionHeader
// ---------------------------------

/**
 * Title plus an optional short description underneath
 * - `className` sets the spacing below (each section passes its own margin)
 */
export const SectionHeader = ({
  id,
  title,
  desc,
  className
}: {
  id: string;
  title: string | ReactNode;
  desc?: string;
  className?: string;
}) => {
  return (
    <div className={cn("mb-12", className)}>
      <Link href={`#${id}`}>
        <BoxReveal width="100%">
          <h2 className="text-4xl text-center md:text-7xl font-bold text-foreground">
            {title}
          </h2>
        </BoxReveal>
      </Link>
      {desc && (
        <p className="mx-auto line-clamp-4 max-w-3xl font-sans font-normal text-base text-center text-muted-foreground">
          {desc}
        </p>
      )}
    </div>
  );
};