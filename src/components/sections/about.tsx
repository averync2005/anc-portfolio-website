"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { motion } from "framer-motion";
import Link from "next/link";
import type { AssetFile } from "@/app/api/assets/route";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay },
  viewport: { once: true, margin: "-60px" },
});

const PORTRAIT_FILENAME = "Portrait.jpg";
const ABOUT_FOLDER = "assets/about";

// ─── Photo rail ───────────────────────────────────────────────────────────────

const PhotoRail = ({ photos }: { photos: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const touchStartYRef = useRef(0);

  // Two copies for seamless circular wrap
  const looped = useMemo(() => [...photos, ...photos], [photos]);

  useEffect(() => {
    // Reset scroll position whenever the photo set changes
    currentRef.current = 0;
    targetRef.current = 0;
  }, [photos]);

  useEffect(() => {
    const container = containerRef.current;
    const list = listRef.current;
    if (!container || !list) return;

    const getSetHeight = () => list.scrollHeight / 2;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      targetRef.current += e.deltaY;
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      targetRef.current += deltaY;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const tick = () => {
      currentRef.current += (targetRef.current - currentRef.current) * 0.1;

      const setH = getSetHeight();
      if (setH > 0) {
        let display = currentRef.current % setH;
        if (display < 0) display += setH;
        list.style.transform = `translateY(-${display}px)`;

        // Prevent float drift over long sessions
        if (Math.abs(currentRef.current) > setH * 100) {
          const shift = Math.floor(currentRef.current / setH) * setH;
          currentRef.current -= shift;
          targetRef.current -= shift;
        }
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  if (photos.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="overflow-hidden max-h-[25rem] rounded-b-xl"
      style={{ touchAction: "none" }}
      data-lenis-prevent
    >
      {/* pb-3 matches gap-3 so scrollHeight/2 is exactly one copy's repeat height */}
      <div
        ref={listRef}
        className="flex flex-col gap-3 pb-3 will-change-transform"
      >
        {looped.map((src, i) => (
          <div
            key={i}
            className="w-full aspect-[4/3] shrink-0 rounded-xl overflow-hidden border border-border bg-secondary/20"
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Portrait ────────────────────────────────────────────────────────────────

const PortraitSlot = ({ src }: { src: string }) => {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    return (
      <div className="w-full shrink-0 h-56 rounded-xl border border-dashed border-border bg-secondary/10 flex items-center justify-center text-xs text-muted-foreground/50">
        add Portrait.jpg → public/assets/about/
      </div>
    );
  }

  return (
    <div className="w-full shrink-0 max-h-72 rounded-xl overflow-hidden border border-border bg-secondary/20">
      <img
        src={src}
        alt="Avery Nudell-Cook"
        className="w-full h-full object-cover"
        style={{ aspectRatio: "4/5", maxHeight: "18rem" }}
        onError={() => setFailed(true)}
      />
    </div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

const AboutSection = () => {
  const [railSrcs, setRailSrcs] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/assets?folder=${encodeURIComponent(ABOUT_FOLDER)}`)
      .then((r) => r.json())
      .then((d) => {
        const files: AssetFile[] = d.files ?? [];
        // Everything that isn't the portrait, alphabetical (already sorted by API)
        const rail = files
          .filter((f) => f.name.toLowerCase() !== PORTRAIT_FILENAME.toLowerCase())
          .map((f) => f.src);
        setRailSrcs(rail);
      })
      .catch(() => {});
  }, []);

  const portraitSrc = `/${ABOUT_FOLDER}/${PORTRAIT_FILENAME}`;

  return (
    <SectionWrapper
      id="about"
      className="max-w-5xl mx-auto px-4 md:px-8 py-20 min-h-screen flex flex-col justify-center"
    >
      <SectionHeader id="about" title="About" className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 md:items-start">
        {/* Text */}
        <div className="md:col-span-3 space-y-5 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {[
            `I grew up in Morningside Heights in Manhattan. Through high school I did youth advocacy work at CCC, helped run events, and did Model UN. It taught me how to hold my own in a room and how to lead a conversation. I liked that work, but I kept coming back to the same conclusion: for the problems I care about, building something is more effective than debating it.`,
            `At Lehigh I study Computer Engineering. I've been a team lead in a space robotics club, interned at a software startup, taught lab sections, and published a research paper.`,
            `I love being in the middle of a hard problem with a good group of people. That part hasn't changed since CCC.`,
            `Outside of engineering I've been rock climbing since I was 13, competed for a while, and still climb every week at Lehigh. I read a lot of serialized fiction, listen to music constantly, and love spending time outside with friends.`,
          ].map((text, i) => (
            <motion.p key={i} {...fadeUp(i * 0.08)}>
              {text}
            </motion.p>
          ))}

          <motion.p {...fadeUp(0.32)}>
            I&apos;m most interested right now in robotics, IoT, and AI.{" "}
            <Link
              href="#contact"
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-primary transition-colors duration-200"
            >
              If any of that overlaps with what you&apos;re building, I&apos;d love to talk.
            </Link>
          </motion.p>
        </div>

        {/* Right column: portrait + circular scroll rail */}
        <motion.div
          className="md:col-span-2 flex flex-col gap-3"
          {...fadeUp(0.15)}
        >
          <PortraitSlot src={portraitSrc} />

          {railSrcs.length > 0 && (
            <div className="rounded-xl border border-border overflow-hidden bg-secondary/10">
              <div className="flex items-center gap-3 px-3 py-2 border-b border-border">
                <span className="text-xs text-muted-foreground/50 tracking-widest uppercase">Photos</span>
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground/30">scroll</span>
              </div>
              <PhotoRail photos={railSrcs} />
            </div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
