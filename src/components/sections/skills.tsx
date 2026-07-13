"use client";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { SKILLS, Skill, SkillNames } from "@/data/constants";
import { useMediaQuery } from "@/hooks/use-media-query";

import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const CATEGORIES: { label: string; ids: SkillNames[] }[] = [
  {
    label: "Languages",
    ids: [SkillNames.PYTHON, SkillNames.JS, SkillNames.JAVA, SkillNames.C, SkillNames.CPP, SkillNames.VERILOG],
  },
  {
    label: "Backend & Data",
    ids: [SkillNames.NODEJS, SkillNames.EXPRESS, SkillNames.POSTGRES, SkillNames.SUPABASE, SkillNames.FIREBASE],
  },
  {
    label: "Web & UI",
    ids: [SkillNames.HTML, SkillNames.CSS],
  },
  {
    label: "Infrastructure",
    ids: [SkillNames.AWS, SkillNames.LINUX, SkillNames.GIT, SkillNames.GITHUB, SkillNames.BITBUCKET],
  },
  {
    label: "Hardware",
    ids: [SkillNames.ARDUINO, SkillNames.RASPBERRYPI, SkillNames.ROS, SkillNames.SOLIDWORKS, SkillNames.FUSION360, SkillNames.FPGA, SkillNames.VIRTUALBOX],
  },
  {
    label: "Testing & Tools",
    ids: [SkillNames.CYPRESS, SkillNames.POSTMAN, SkillNames.JIRA, SkillNames.CONFLUENCE, SkillNames.OSCILLOSCOPE],
  },
];

const INVERT_IN_DARK = new Set(["github", "express", "ros"]);

// Standard relative-luminance weighting, used to pick a readable icon/text color per skill's brand hex
const luminance = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b;
};

const SkillIcon = ({ skill }: { skill: Skill }) => {
  const [failed, setFailed] = useState(false);

  const raw = skill.color;
  const iconBg = luminance(raw) < 40 || raw === "#fff" ? "#555" : raw;

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
        className={[
          "object-contain",
          INVERT_IN_DARK.has(skill.name) ? "dark:invert dark:brightness-150" : "",
        ].join(" ")}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </span>
  );
};

const readableColor = (hex: string) =>
  luminance(hex) >= 60 ? hex : undefined;

/** "Skills" section: categorized skill chips with a hover/tap-to-reveal description. */
export default function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <SectionWrapper
      id="skills"
      className="max-w-5xl mx-auto px-4 md:px-8 py-24 min-h-screen flex flex-col justify-center"
    >
      <SectionHeader id="skills" title="Skills" className="mb-14" />

      <div className="space-y-7" onMouseLeave={() => !isMobile && setActiveSkill(null)}>
        {CATEGORIES.map((cat, catIdx) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: catIdx * 0.07 }}
            className="grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] gap-4 items-start"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-slate-600 dark:text-slate-300 pt-2.5">
              {cat.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {cat.ids.map((id) => {
                const skill = SKILLS[id];
                if (!skill) return null;
                const isActive = activeSkill?.name === skill.name;
                return (
                  <div
                    key={id}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onClick={() => setActiveSkill(activeSkill?.name === skill.name ? null : skill)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/20 hover:bg-secondary/40 transition-all duration-200 cursor-default"
                    style={{
                      borderColor: isActive ? `${skill.color}70` : undefined,
                      boxShadow: isActive ? `0 0 14px ${skill.color}18` : undefined,
                      background: isActive ? `${skill.color}0d` : undefined,
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

      <div className="mt-10 pt-5 border-t border-border/50 min-h-[2.5rem]">
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
