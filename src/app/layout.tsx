/**
 * Root layout (page metadata, fonts, global providers and overlays)
 * - Share-preview image comes from app/opengraph-image.tsx (Next picks it up automatically)
 */




// ---------------------------------
// Imports
// ---------------------------------

// Next and fonts
import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";

// Analytics
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Content and components
import { config } from "@/data/config";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AppOverlays from "@/components/app-overlays";
import { Providers } from "@/components/providers";




// ---------------------------------
// Metadata
// ---------------------------------

export const metadata: Metadata = {
  metadataBase: new URL(config.site),  // Resolves the generated preview image to an absolute URL
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    siteName: config.author,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short
  },
  robots: {
    index: true,
    follow: true
  }
};




// ---------------------------------
// Fonts
// ---------------------------------

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display"
});




// ---------------------------------
// RootLayout
// ---------------------------------

/**
 * Shell shared by every page (header, footer, overlays, analytics)
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[inter.variable, archivoBlack.variable, "font-display"].join(" ")} suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <AppOverlays />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}