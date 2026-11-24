"use client";

/**
 * Full-page overlays layered on every page (background particles, hidden easter eggs, custom cursor)
 */




// ---------------------------------
// Imports
// ---------------------------------

import Particles from "@/components/particles";
import EasterEggs from "@/components/easter-eggs";
import ElasticCursor from "@/components/ui/elastic-cursor";




// ---------------------------------
// AppOverlays
// ---------------------------------

/**
 * Renders the overlays once, outside the page content
 */
export default function AppOverlays() {
  return (
    <>
      <Particles className="fixed inset-0 -z-10 animate-fade-in" quantity={100} />
      <EasterEggs />
      <ElasticCursor />
    </>
  );
}