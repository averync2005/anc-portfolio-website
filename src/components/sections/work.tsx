"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import work, { WorkItem, WorkMedia } from "@/data/work";
import { useAssetFolder } from "@/hooks/use-asset-folder";
import type { AssetFile } from "@/app/api/assets/route";

// ─── Section ─────────────────────────────────────────────────────────────────

const WorkSection = () => {
  return (
    <SectionWrapper
      id="work"
      className="max-w-4xl mx-auto px-4 md:px-8 py-20 min-h-screen flex flex-col justify-center"
    >
      <SectionHeader id="work" title="Work" className="mb-12" />
      <div className="flex flex-col gap-4">
        {work.map((item, index) => (
          <WorkCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────

const WorkCard = ({ item, index }: { item: WorkItem; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Fetch assets from folder only when card is first opened
  const folder = item.assetsFolder ?? `assets/work/${item.id}`;
  const discoveredFiles = useAssetFolder(folder, isOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
    >
      <Card
        className={cn(
          "border-border bg-card transition-colors duration-200",
          isOpen
            ? "border-primary/20 shadow-md"
            : "hover:border-primary/10 hover:shadow-sm"
        )}
      >
        {/* ── Header (always visible, clickable) ── */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="w-full text-left focus:outline-none"
          aria-expanded={isOpen}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="text-xs font-normal tracking-wide"
                  >
                    {item.category}
                  </Badge>
                </div>
                <div className="text-lg font-semibold tracking-tight leading-snug">
                  {item.title}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {item.subtitle}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 shrink-0">
                <Badge
                  variant="outline"
                  className="font-mono text-xs font-normal whitespace-nowrap"
                >
                  {item.date}
                </Badge>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </div>
            </div>

            {/* One-liner */}
            <p className="text-sm font-medium text-foreground/80 italic leading-relaxed mt-1">
              &ldquo;{item.oneliner}&rdquo;
            </p>
          </CardHeader>
        </button>

        {/* ── Expanded content ── */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <CardContent className="pt-0">
                <div className="border-t border-border pt-5 space-y-6">
                  {/* Story */}
                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    {item.story.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Explicit media (links, embeds, etc.) */}
                  {item.media.length > 0 && (
                    <div className="space-y-4 pt-2">
                      {item.media.map((m, i) => (
                        <MediaItem key={i} media={m} />
                      ))}
                    </div>
                  )}

                  {/* Auto-discovered assets from folder */}
                  {discoveredFiles.length > 0 && (
                    <DiscoveredAssets files={discoveredFiles} />
                  )}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

// ─── Auto-discovered assets ───────────────────────────────────────────────────

const DiscoveredAssets = ({ files }: { files: AssetFile[] }) => {
  const images = files.filter((f) => f.kind === "image");
  const videos = files.filter((f) => f.kind === "video");

  return (
    <div className="space-y-3 pt-2">
      {images.length === 1 && (
        <div className="w-full rounded-xl overflow-hidden border border-border">
          <img src={images[0].src} alt="" className="w-full object-cover" />
        </div>
      )}
      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-2">
          {images.map((f) => (
            <div key={f.src} className="rounded-xl overflow-hidden border border-border">
              <img src={f.src} alt="" className="w-full h-auto" />
            </div>
          ))}
        </div>
      )}
      {videos.map((f) => (
        <div key={f.src} className="w-full rounded-xl overflow-hidden border border-border">
          <video src={f.src} controls className="w-full" style={{ maxHeight: "24rem" }} />
        </div>
      ))}
    </div>
  );
};

// ─── Explicit media renderer ──────────────────────────────────────────────────

const MediaItem = ({ media }: { media: WorkMedia }) => {
  switch (media.type) {
    case "youtube":
      return (
        <div className="space-y-2">
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-border">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${media.videoId}${
                media.timestamp ? `?start=${media.timestamp}` : ""
              }`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          {media.caption && (
            <p className="text-xs text-muted-foreground/70 italic">{media.caption}</p>
          )}
        </div>
      );

    case "google-slides": {
      const slideIframe = (
        <div className="w-full aspect-video rounded-xl overflow-hidden border border-border">
          <iframe
            src={`https://docs.google.com/presentation/d/${media.slideId}/embed?start=false&loop=false`}
            title="Google Slides presentation"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      );
      return (
        <div className="space-y-2">
          {media.sidePhoto ? (
            <div className="grid grid-cols-2 gap-3">
              {slideIframe}
              <div className="rounded-xl overflow-hidden border border-border">
                <img src={media.sidePhoto} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          ) : (
            slideIframe
          )}
          {media.caption && (
            <p className="text-xs text-muted-foreground/70 italic">{media.caption}</p>
          )}
        </div>
      );
    }

    case "link":
      return (
        <Link href={media.url} target="_blank" rel="noopener noreferrer">
          <Badge
            variant="outline"
            className="gap-1.5 text-xs font-normal cursor-pointer hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-200 py-1.5 px-3"
          >
            <ExternalLink className="w-3 h-3 shrink-0" />
            {media.label}
          </Badge>
        </Link>
      );

    case "photo":
      return (
        <div className="space-y-1.5">
          <div className="w-full rounded-xl overflow-hidden border border-border">
            <img src={media.src} alt={media.alt ?? ""} className="w-full object-cover" />
          </div>
          {media.caption && (
            <p className="text-xs text-muted-foreground/70 italic">{media.caption}</p>
          )}
        </div>
      );

    case "photo-grid":
      return (
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${media.columns}, 1fr)` }}
        >
          {media.srcs.map((src, i) => (
            <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-border">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      );

    case "photo-placeholder":
      return (
        <div className="w-full rounded-xl border border-dashed border-border bg-secondary/10 py-8 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-xs text-muted-foreground/50">{media.label ?? "Photo"}</p>
          <p className="text-xs text-muted-foreground/30 font-mono">
            public/assets/work/{media.folder}/
          </p>
        </div>
      );

    default:
      return null;
  }
};

export default WorkSection;
