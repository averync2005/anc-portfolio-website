/**
 * Generated share-preview image (LinkedIn, Slack, iMessage link cards)
 * - Rendered at build time, so no image file is needed in public/
 * - Delete this file once a real 1200x630 photo is added as app/opengraph-image.jpg
 */




// ---------------------------------
// Imports
// ---------------------------------

import { ImageResponse } from "next/og";
import { config } from "@/data/config";




// ---------------------------------
// Image settings
// ---------------------------------

export const alt = `${config.author}, Computer Engineer`;
export const size = { width: 1200, height: 630 };  // Standard Open Graph size
export const contentType = "image/png";




// ---------------------------------
// OpenGraphImage
// ---------------------------------

/**
 * Dark card with name, tagline, and focus areas (matches the site's default dark theme)
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ fontSize: 34, color: "#a3a3a3", marginBottom: 12 }}>Hi, I am</div>
        <div style={{ fontSize: 104, fontWeight: 800, lineHeight: 1 }}>{config.author}</div>
        <div style={{ fontSize: 40, color: "#d4d4d4", marginTop: 28 }}>{config.tagline}</div>
        <div style={{ fontSize: 30, color: "#a3a3a3", marginTop: 40 }}>
          Embodied AI · Robotics · IoT · Computer Engineering @ Lehigh
        </div>
      </div>
    ),
    { ...size }
  );
}