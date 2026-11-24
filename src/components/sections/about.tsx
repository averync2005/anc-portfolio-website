"use client";

/**
 * About section
 * - Bio paragraphs on the left
 * - Portrait plus an endless scrolling photo rail on the right (photos auto-discovered from public/assets/about)
 */




// ---------------------------------
// Imports
// ---------------------------------

// React and animation
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Assets
import type { AssetFile } from "@/app/api/assets/route";

// Components
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";




// ---------------------------------
// Constants
// ---------------------------------

// Files
const ABOUT_FOLDER = "assets/about";
const PORTRAIT_FILENAME = "Portrait.jpg";

// Bio (one string per paragraph, the contact link is added after the last one)
const PARAGRAPHS = [
  "I grew up in Morningside Heights in Manhattan. Through high school I did youth advocacy work at CCC, helped run events, and did Model UN. It taught me how to hold my own in a room and how to lead a conversation. I liked that work, but I kept coming back to the same conclusion: for the problems I care about, building something is more effective than debating it.",
  "At Lehigh I study Computer Engineering alongside IDEAS, an interdisciplinary honors program. I've had two internships doing software work, first at a car-leasing startup and then on DNV's MLOps team. I'm also President of LUSI, our campus engineering, space, and robotics club, and I founded Lehigh's BridgeUSA chapter. Along the way I coauthored a paper published at IEEE GHTC 2024.",
  "I love being in the middle of a hard problem with a good group of people. That part hasn't changed since CCC.",
  "I'm driven by the belief that engineering and entrepreneurship are two of the key tools capable of addressing today's global problems. The work I want to do sits in embodied AI, deployment and automation engineering, and IoT, and I'm most drawn to it when it's pointed at problems that matter. Think sensor networks that help farms use less water, or robots that inspect aging bridges and water pipes.",
  "Outside of engineering I've been rock climbing since I was 13, competed for a while, and still climb every week. I also lift, read a lot (online serials and paperbacks), always have music on, and usually have a random personal project going. And I love spending time outside with friends."
];

// Photo filename -> alt text (photos without an entry fall back to a generic description)
const PHOTO_ALTS: Record<string, string> = {
  "Portrait.jpg": "Avery Nudell-Cook holding an umbrella on a city street",
  "2.jpg": "Avery and friends around a laptop in a campus lounge",
  "2a.JPEG": "Selfie in suits at NHSMUN 2024, where Avery was an Assistant Director",
  "about me 2.jpg": "Selfie with friends at a group dinner",
  "about me.jpg": "Avery and friends on a beach at sunset",
  "z3.jpg": "Group of friends standing behind a ping-pong table"
};

const FALLBACK_ALT = "Photo of Avery Nudell-Cook";




// ---------------------------------
// fadeUp
// ---------------------------------

/**
 * Framer Motion props for a fade-and-rise entrance, played once when scrolled into view
 */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay },
  viewport: { once: true, margin: "-60px" }
});




// ---------------------------------
// PhotoRail
// ---------------------------------

/**
 * Vertical photo strip that scrolls with wheel or touch input and wraps around seamlessly
 * - Renders the list twice and shifts by one copy's height to fake an infinite loop
 * - Eases toward the target offset every animation frame
 */
const PhotoRail = ({ photos }: { photos: AssetFile[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const touchStartYRef = useRef(0);

  const looped = useMemo(() => [...photos, ...photos], [photos]);  // Two copies for the seamless wrap

  // Resetting scroll position whenever the photo set changes
  useEffect(() => {
    currentRef.current = 0;
    targetRef.current = 0;
  }, [photos]);

  useEffect(() => {
    const container = containerRef.current;
    const list = listRef.current;
    if (!container || !list) {
      return;
    }

    const getSetHeight = () => (list.scrollHeight / 2);

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      targetRef.current += event.deltaY;
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const deltaY = touchStartYRef.current - event.touches[0].clientY;
      targetRef.current += deltaY;
      touchStartYRef.current = event.touches[0].clientY;
    };

    const tick = () => {
      currentRef.current += (targetRef.current - currentRef.current) * 0.1;  // Easing 10% of the remaining distance per frame

      const setHeight = getSetHeight();
      if (setHeight > 0) {
        let display = currentRef.current % setHeight;
        if (display < 0) {
          display += setHeight;
        }
        list.style.transform = `translateY(-${display}px)`;

        // Rebasing both offsets after many loops (prevents float drift in long sessions)
        if (Math.abs(currentRef.current) > (setHeight * 100)) {
          const shift = Math.floor(currentRef.current / setHeight) * setHeight;
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
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  if (photos.length === 0) {
    return null;
  }

  return (
    <div ref={containerRef} className="overflow-hidden max-h-[25rem] rounded-b-xl" style={{ touchAction: "none" }} data-lenis-prevent>
      {/* pb-3 matches gap-3 so scrollHeight / 2 is exactly one copy's height */}
      <div ref={listRef} className="flex flex-col gap-3 pb-3 will-change-transform">
        {looped.map((photo, photoIndex) => (
          <div
            key={photoIndex}
            className="w-full aspect-[4/3] shrink-0 rounded-xl overflow-hidden border border-border bg-secondary/20"
          >
            <img
              src={photo.src}
              alt={(photoIndex < photos.length) ? (PHOTO_ALTS[photo.name] ?? FALLBACK_ALT) : ""}  // Second copy is decorative (screen readers skip it)
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};




// ---------------------------------
// PortraitSlot
// ---------------------------------

/**
 * Portrait photo, or a dashed placeholder telling where to add it if the file is missing
 */
const PortraitSlot = ({ src }: { src: string }) => {
  const [failed, setFailed] = useState(false);

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
        alt={PHOTO_ALTS[PORTRAIT_FILENAME]}
        className="w-full h-full object-cover"
        style={{ aspectRatio: "4/5", maxHeight: "18rem" }}
        onError={() => setFailed(true)}
      />
    </div>
  );
};




// ---------------------------------
// AboutSection
// ---------------------------------

/**
 * Bio copy next to the portrait and photo rail
 */
const AboutSection = () => {
  const [railPhotos, setRailPhotos] = useState<AssetFile[]>([]);

  // Loading every photo in the about folder except the portrait (API returns them sorted)
  useEffect(() => {
    fetch(`/api/assets?folder=${encodeURIComponent(ABOUT_FOLDER)}`)
      .then((response) => response.json())
      .then((data) => {
        const files: AssetFile[] = data.files ?? [];
        setRailPhotos(files.filter((file) => (file.name.toLowerCase() !== PORTRAIT_FILENAME.toLowerCase())));
      })
      .catch(() => {});  // Rail just stays hidden if the folder can't be read
  }, []);

  const portraitSrc = `/${ABOUT_FOLDER}/${PORTRAIT_FILENAME}`;

  return (
    <SectionWrapper id="about" className="max-w-5xl mx-auto px-4 md:px-8 py-20 min-h-screen flex flex-col justify-center">
      <SectionHeader id="about" title="About" className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 md:items-start">
        {/* Bio */}
        <div className="md:col-span-3 space-y-5 font-sans text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {PARAGRAPHS.map((text, paragraphIndex) => (
            <motion.p key={paragraphIndex} {...fadeUp(paragraphIndex * 0.08)}>
              {text}
            </motion.p>
          ))}

          <motion.p {...fadeUp(PARAGRAPHS.length * 0.08)}>
            <Link
              href="#contact"
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-primary transition-colors duration-200"
            >
              If any of that overlaps with what you&apos;re building, I&apos;d love to talk.
            </Link>
          </motion.p>
        </div>

        {/* Portrait and photo rail */}
        <motion.div className="md:col-span-2 flex flex-col gap-3" {...fadeUp(0.15)}>
          <PortraitSlot src={portraitSrc} />

          {(railPhotos.length > 0) && (
            <div className="rounded-xl border border-border overflow-hidden bg-secondary/10">
              <div className="flex items-center gap-3 px-3 py-2 border-b border-border">
                <span className="font-sans text-xs text-muted-foreground/50 tracking-widest uppercase">Photos</span>
                <div className="h-px flex-1 bg-border" />
                <span className="font-sans text-xs text-muted-foreground/30">scroll</span>
              </div>
              <PhotoRail photos={railPhotos} />
            </div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};




// ---------------------------------
// Export
// ---------------------------------

export default AboutSection;