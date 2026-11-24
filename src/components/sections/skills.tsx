"use client";

/**
 * Skills section
 * - Skill chips grouped into rows (most to least confident within each row)
 * - Hover (desktop) or tap (mobile) shows where each skill was used
 */




// ---------------------------------
// Imports
// ---------------------------------

// React and animation
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Content
import { SKILLS, Skill, SkillNames } from "@/data/constants";
import { useMediaQuery } from "@/hooks/use-media-query";

// Components
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";




// ---------------------------------
// Constants
// ---------------------------------

const CATEGORIES: { label: string; ids: SkillNames[] }[] = [
  {
    label: "Languages",
    ids: [SkillNames.JS, SkillNames.PYTHON, SkillNames.C, SkillNames.CPP, SkillNames.JAVA, SkillNames.VERILOG]
  },
  {
    label: "Backend & AI",
    ids: [
      SkillNames.NODEJS,
      SkillNames.EXPRESS,
      SkillNames.FASTAPI,
      SkillNames.LLM,
      SkillNames.POSTGRES,
      SkillNames.MONGODB,
      SkillNames.SUPABASE,
      SkillNames.FIRESTORE
    ]
  },
  {
    label: "Embedded & Hardware",
    ids: [
      SkillNames.SOLIDWORKS,
      SkillNames.RASPBERRYPI,
      SkillNames.ARDUINO,
      SkillNames.TIVAC,
      SkillNames.FUSION360,
      SkillNames.FPGA,
      SkillNames.OSCILLOSCOPE,
      SkillNames.SOLDERING,
      SkillNames.PRINTING3D
    ]
  },
  {
    label: "Infrastructure",
    ids: [
      SkillNames.GIT,
      SkillNames.GITHUB,
      SkillNames.GITLAB,
      SkillNames.LINUX,
      SkillNames.BASH,
      SkillNames.AWS,
      SkillNames.BITBUCKET
    ]
  },
  {
    label: "Testing & Tools",
    ids: [SkillNames.CYPRESS, SkillNames.POSTMAN, SkillNames.JIRA, SkillNames.CONFLUENCE]
  }
];

const INVERT_IN_DARK = new Set(["github", "express"]);  // Black icons that disappear on a dark background




// ---------------------------------
// Color helpers
// ---------------------------------

/**
 * Perceived brightness of a hex color (0 to 255, standard relative-luminance weights)
 */
const luminance = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return (0.299 * r + 0.587 * g + 0.114 * b);
};


/**
 * Brand color for highlighted text, or undefined (default text color) when it's too dark to read
 */
const readableColor = (hex: string) => ((luminance(hex) >= 60) ? hex : undefined);




// ---------------------------------
// SkillIcon
// ---------------------------------

/**
 * Devicon logo, or a lettered square when there's no icon or it fails to load
 */
const SkillIcon = ({ skill }: { skill: Skill }) => {
  const [failed, setFailed] = useState(false);

  const iconBg = ((luminance(skill.color) < 40) || (skill.color === "#fff")) ? "#555" : skill.color;

  if (!skill.icon || failed) {
    return (
      <span
        className="w-4 h-4 rounded-sm text-[9px] font-bold flex items-center justify-center text-white shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        {skill.label[0]}
      </span>
    );
  }

  return (
    <span className="w-4 h-4 shrink-0 flex items-center justify-center rounded-sm overflow-hidden bg-black/5 dark:bg-white/10">
      <img
        src={skill.icon}
        alt=""
        width={14}
        height={14}
        className={["object-contain", INVERT_IN_DARK.has(skill.name) ? "dark:invert dark:brightness-150" : ""].join(" ")}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </span>
  );
};




// ---------------------------------
// SkillsSection
// ---------------------------------

/**
 * Category rows of skill chips, with the active skill's description underneath
 */
export default function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <SectionWrapper
      id="skills"
      className="max-w-5xl mx-auto px-4 md:px-8 py-24 min-h-screen flex flex-col justify-center"
    >
      <SectionHeader id="skills" title="Skills" className="mb-14" />

      <div className="space-y-7 font-sans" onMouseLeave={() => !isMobile && setActiveSkill(null)}>
        {CATEGORIES.map((category, categoryIndex) => (
          <motion.div
            key={category.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: categoryIndex * 0.07 }}
            className="grid grid-cols-[110px_1fr] md:grid-cols-[160px_1fr] gap-4 items-start"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-slate-600 dark:text-slate-300 pt-2.5">
              {category.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {category.ids.map((id) => {
                const skill = SKILLS[id];
                const isActive = (activeSkill?.name === skill.name);

                return (
                  <div
                    key={id}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onClick={() => setActiveSkill(isActive ? null : skill)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/20 hover:bg-secondary/40 transition-all duration-200 cursor-default"
                    style={{
                      borderColor: isActive ? `${skill.color}70` : undefined,
                      boxShadow: isActive ? `0 0 14px ${skill.color}18` : undefined,
                      background: isActive ? `${skill.color}0d` : undefined
                    }}
                  >
                    <SkillIcon skill={skill} />
                    <span
                      className="text-sm transition-colors duration-200 text-slate-600 dark:text-slate-300"
                      style={{ color: isActive ? readableColor(skill.color) : undefined }}
                    >
                      {skill.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active skill description (placeholder hint when nothing is selected) */}
      <div className="mt-10 pt-5 border-t border-border/50 min-h-[2.5rem] font-sans">
        <AnimatePresence mode="wait">
          {activeSkill ? (
            <motion.p
              key={activeSkill.name}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.14 }}
              className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
            >
              <span className="font-medium" style={{ color: readableColor(activeSkill.color) }}>
                {activeSkill.label}
              </span>
              {": "}
              {activeSkill.shortDescription}
            </motion.p>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-muted-foreground/30"
            >
              {isMobile ? "Tap a skill to learn more" : "Hover a skill to learn more"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}