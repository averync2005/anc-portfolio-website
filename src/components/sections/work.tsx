"use client";

/**
 * Work section
 * - Experience and Projects groups, each newest first
 * - Expandable cards (one per organization, roles stacked on a timeline)
 * - Photos auto-discovered from each card's asset folder on first open
 */




// ---------------------------------
// Imports
// ---------------------------------

// React and animation
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";

// UI
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

// Content and assets
import work, { WorkGroup, WorkItem, WorkMedia, WorkRole } from "@/data/work";
import { useAssetFolder } from "@/hooks/use-asset-folder";
import type { AssetFile } from "@/app/api/assets/route";




// ---------------------------------
// Constants
// ---------------------------------

const GROUPS: { id: WorkGroup; label: string }[] = [
  { id: "experience", label: "Experience" },
  { id: "project", label: "Projects" }
];




// ---------------------------------
// WorkSection
// ---------------------------------

/**
 * Section wrapper rendering each group label followed by its cards
 */
const WorkSection = () => {
  return (
    <SectionWrapper
      id="work"
      className="max-w-4xl mx-auto px-4 md:px-8 py-20 min-h-screen flex flex-col justify-center"
    >
      <SectionHeader id="work" title="Work" className="mb-12" />

      <div className="flex flex-col gap-12">
        {GROUPS.map((group) => {
          const items = work.filter((item) => (item.group === group.id));

          return (
            <div key={group.id} className="flex flex-col gap-4">
              <GroupLabel label={group.label} />
              {items.map((item, index) => (
                <WorkCard key={item.id} item={item} index={index} />
              ))}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};




// ---------------------------------
// GroupLabel
// ---------------------------------

/**
 * Small uppercase divider above each group (matches the Skills row labels)
 */
const GroupLabel = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="font-sans text-xs font-medium uppercase tracking-widest text-slate-600 dark:text-slate-300">
        {label}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
};




// ---------------------------------
// WorkCard
// ---------------------------------

/**
 * Expandable card for one organization or project
 * - Header always shows every role title and the newest role's one-liner
 * - Asset folder only fetched the first time the card opens
 */
const WorkCard = ({ item, index }: { item: WorkItem; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const folder = item.assetsFolder ?? `assets/work/${item.id}`;
  const discoveredFiles = useAssetFolder(folder, isOpen);

  const hasRoleTitles = item.roles.some((role) => (role.title !== undefined));
  const isMultiRole = (item.roles.length > 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
    >
      <Card
        className={cn(
          "border-border bg-card font-sans transition-colors duration-200",
          isOpen ? "border-primary/20 shadow-md" : "hover:border-primary/10 hover:shadow-sm"
        )}
      >
        {/* Header (always visible, toggles the card) */}
        <button
          onClick={() => setIsOpen((open) => !open)}
          className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
          aria-expanded={isOpen}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs font-normal tracking-wide">
                    {item.category}
                  </Badge>
                </div>
                <div className="font-display text-lg tracking-tight leading-snug">
                  {item.name}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {item.subtitle}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 shrink-0">
                <Badge variant="outline" className="font-mono text-xs font-normal whitespace-nowrap">
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

            {hasRoleTitles && <RoleList roles={item.roles} />}

            <p className="text-sm font-medium text-foreground/80 italic leading-relaxed mt-1">
              &ldquo;{item.roles[0].oneliner}&rdquo;
            </p>
          </CardHeader>
        </button>

        {/* Expanded content */}
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
                  {isMultiRole ? (
                    <div className="space-y-8">
                      {item.roles.map((role, roleIndex) => (
                        <RoleSection key={role.title ?? roleIndex} role={role} showOneliner={roleIndex > 0} />
                      ))}
                    </div>
                  ) : (
                    <RoleBody role={item.roles[0]} />
                  )}

                  {item.media && (item.media.length > 0) && <MediaList media={item.media} />}

                  {(discoveredFiles.length > 0) && (
                    <DiscoveredAssets files={discoveredFiles} alts={item.alts} fallbackAlt={item.name} />
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




// ---------------------------------
// RoleList
// ---------------------------------

/**
 * Compact role titles and dates in the card header (dot timeline when there are several)
 */
const RoleList = ({ roles }: { roles: WorkRole[] }) => {
  const isMultiRole = (roles.length > 1);

  return (
    <ul className="flex flex-col gap-1 mt-1 mb-2">
      {roles.map((role, roleIndex) => (
        <li key={role.title ?? roleIndex} className="flex items-baseline gap-2 text-sm">
          {isMultiRole && (
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full shrink-0 translate-y-[-1px]",
                (roleIndex === 0) ? "bg-primary" : "bg-muted-foreground/40"
              )}
            />
          )}
          <span className="text-foreground/90">{role.title}</span>
          {isMultiRole && (
            <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">{role.date}</span>
          )}
        </li>
      ))}
    </ul>
  );
};




// ---------------------------------
// RoleSection
// ---------------------------------

/**
 * One role inside an expanded multi-role card (timeline line + dot on the left)
 */
const RoleSection = ({ role, showOneliner }: { role: WorkRole; showOneliner: boolean }) => {
  return (
    <div className="relative pl-5 border-l border-border">
      <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary/70 ring-4 ring-card" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
        <h3 className="text-base font-semibold tracking-tight">{role.title}</h3>
        <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">{role.date}</span>
      </div>

      {showOneliner && (
        <p className="text-sm font-medium text-foreground/80 italic leading-relaxed mb-3">
          &ldquo;{role.oneliner}&rdquo;
        </p>
      )}

      <RoleBody role={role} />
    </div>
  );
};




// ---------------------------------
// RoleBody
// ---------------------------------

/**
 * Story paragraphs plus any media tied to this role
 */
const RoleBody = ({ role }: { role: WorkRole }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        {role.story.map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex}>{paragraph}</p>
        ))}
      </div>

      {role.media && (role.media.length > 0) && <MediaList media={role.media} />}
    </div>
  );
};




// ---------------------------------
// MediaList
// ---------------------------------

/**
 * Links grouped on one wrapping row, embeds and photos stacked below them
 */
const MediaList = ({ media }: { media: WorkMedia[] }) => {
  const links = media.filter((entry) => (entry.type === "link"));
  const embeds = media.filter((entry) => (entry.type !== "link"));

  return (
    <div className="space-y-4 pt-2">
      {(links.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {links.map((entry, entryIndex) => (
            <MediaItem key={entryIndex} media={entry} />
          ))}
        </div>
      )}
      {embeds.map((entry, entryIndex) => (
        <MediaItem key={entryIndex} media={entry} />
      ))}
    </div>
  );
};




// ---------------------------------
// DiscoveredAssets
// ---------------------------------

/**
 * Photos and videos found in the card's asset folder
 * - Alt text looked up by filename (falls back to the card name)
 */
const DiscoveredAssets = ({
  files,
  alts,
  fallbackAlt
}: {
  files: AssetFile[];
  alts?: Record<string, string>;
  fallbackAlt: string;
}) => {
  const images = files.filter((file) => (file.kind === "image"));
  const videos = files.filter((file) => (file.kind === "video"));

  const altFor = (file: AssetFile) => alts?.[file.name] ?? `${fallbackAlt} photo`;

  return (
    <div className="space-y-3 pt-2">
      {(images.length === 1) && (
        <div className="w-full rounded-xl overflow-hidden border border-border">
          <img src={images[0].src} alt={altFor(images[0])} className="w-full object-cover" loading="lazy" />
        </div>
      )}
      {(images.length > 1) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {images.map((file) => (
            <div key={file.src} className="rounded-xl overflow-hidden border border-border">
              <img src={file.src} alt={altFor(file)} className="w-full h-auto" loading="lazy" />
            </div>
          ))}
        </div>
      )}
      {videos.map((file) => (
        <div key={file.src} className="w-full rounded-xl overflow-hidden border border-border">
          <video src={file.src} controls className="w-full" style={{ maxHeight: "24rem" }} />
        </div>
      ))}
    </div>
  );
};




// ---------------------------------
// MediaItem
// ---------------------------------

/**
 * One explicit media entry, dispatched on its type (youtube, slides, link, photo, photo grid)
 */
const MediaItem = ({ media }: { media: WorkMedia }) => {
  switch (media.type) {
    case "youtube":
      return (
        <div className="space-y-2">
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-border">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${media.videoId}${media.timestamp ? `?start=${media.timestamp}` : ""}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          {media.caption && <p className="text-xs text-muted-foreground/70 italic">{media.caption}</p>}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {slideIframe}
              <div className="rounded-xl overflow-hidden border border-border">
                <img src={media.sidePhoto} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          ) : (
            slideIframe
          )}
          {media.caption && <p className="text-xs text-muted-foreground/70 italic">{media.caption}</p>}
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
          {media.caption && <p className="text-xs text-muted-foreground/70 italic">{media.caption}</p>}
        </div>
      );

    case "photo-grid": {
      const columnClasses: Record<number, string> = {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-3"
      };
      const colClass = columnClasses[media.columns] ?? "grid-cols-2 sm:grid-cols-4";  // 4+ columns

      return (
        <div className={`grid gap-2 ${colClass}`}>
          {media.srcs.map((src) => (
            <div key={src} className="aspect-[4/3] rounded-xl overflow-hidden border border-border">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      );
    }

    case "photo-placeholder":
      return (
        <div className="w-full rounded-xl border border-dashed border-border bg-secondary/10 py-8 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-xs text-muted-foreground/50">{media.label ?? "Photo"}</p>
          <p className="text-xs text-muted-foreground/30 font-mono">public/assets/work/{media.folder}/</p>
        </div>
      );

    default:
      return null;
  }
};




// ---------------------------------
// Export
// ---------------------------------

export default WorkSection;