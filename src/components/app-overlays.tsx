"use client";

import Particles from "@/components/particles";
import RemoteCursors from "@/components/realtime/remote-cursors";
import EasterEggs from "@/components/easter-eggs";
import ElasticCursor from "@/components/ui/elastic-cursor";
import RadialMenu from "@/components/radial-menu/index";

export default function AppOverlays() {
  return (
    <>
      <Particles
        className="fixed inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <RemoteCursors />
      <EasterEggs />
      <ElasticCursor />
      <RadialMenu />
    </>
  );
}
