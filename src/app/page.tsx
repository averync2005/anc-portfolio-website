"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import SkillsSection from "@/components/sections/skills";
import WorkSection from "@/components/sections/work";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";

function MainPage() {
  return (
    <SmoothScroll>
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <WorkSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
