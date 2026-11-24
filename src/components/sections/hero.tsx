"use client";

/**
 * Landing hero (name, tagline, resume and contact buttons, social links)
 */




// ---------------------------------
// Imports
// ---------------------------------

// React and icons
import React from "react";
import Link from "next/link";
import { File } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";

// Content
import { config } from "@/data/config";
import { cn } from "@/lib/utils";

// Components
import { Button } from "../ui/button";
import SectionWrapper from "../ui/section-wrapper";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";




// ---------------------------------
// HeroSection
// ---------------------------------

/**
 * Full-height landing block, revealed after the preloader finishes
 */
const HeroSection = () => {
  const { isLoading } = usePreloader();
  const [firstName, lastName] = config.author.split(" ");

  return (
    <SectionWrapper id="hero" className={cn("relative w-full h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pb-16 md:p-20 md:pt-28 lg:p-24 xl:p-28"
          )}
        >
          {!isLoading && (
            <div className="flex flex-col">
              <div>
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "md:self-start mt-4 font-thin text-md text-slate-600 dark:text-slate-300",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text"
                    )}
                  >
                    Hi, I am
                    <br className="md:hidden" />
                  </p>
                </BlurIn>

                <BlurIn delay={1}>
                  <h1
                    className={cn(
                      "-ml-[6px] leading-none font-thin text-slate-900 dark:text-white text-left",
                      "font-thin text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl",
                      "cursor-default font-display"
                    )}
                  >
                    {firstName}
                    <br className="md:block hidden" />
                    {lastName}
                  </h1>
                </BlurIn>

                <BlurIn delay={1.2}>
                  <p
                    className={cn(
                      "md:self-start md:mt-4 font-thin text-md text-slate-600 dark:text-slate-300",
                      "cursor-default font-display sm:text-xl md:text-xl bg-clip-text"
                    )}
                  >
                    {config.tagline}
                  </p>
                </BlurIn>

                <BlurIn delay={1.4}>
                  <p className="md:self-start mt-3 max-w-lg font-sans text-sm text-slate-500 dark:text-slate-400 cursor-default">
                    {config.focus}
                  </p>
                </BlurIn>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 w-fit">
                <Link href={process.env.NEXT_PUBLIC_RESUME_URL ?? "#"} target="_blank" className="flex-1">
                  <BoxReveal delay={2} width="100%">
                    <Button className="flex items-center gap-2 w-full">
                      <File size={24} />
                      <p>Resume</p>
                    </Button>
                  </BoxReveal>
                </Link>
                <div className="md:self-start flex gap-3">
                  <Link href={"#contact"}>
                    <Button variant={"outline"} className="block w-full overflow-hidden">
                      Get In Touch
                    </Button>
                  </Link>
                  <div className="flex items-center h-full gap-2">
                    <Link href={config.social.github} target="_blank" className="cursor-can-hover" aria-label="GitHub">
                      <Button variant={"outline"}>
                        <SiGithub size={24} />
                      </Button>
                    </Link>
                    <Link href={config.social.linkedin} target="_blank" className="cursor-can-hover" aria-label="LinkedIn">
                      <Button variant={"outline"}>
                        <SiLinkedin size={24} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid col-span-1"></div>
      </div>

      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};




// ---------------------------------
// Export
// ---------------------------------

export default HeroSection;