import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg"]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov"]);
const ALL_EXTS = new Set([...IMAGE_EXTS, ...VIDEO_EXTS]);

export type AssetFile = {
  src: string;
  name: string;
  kind: "image" | "video";
};

export async function GET(request: NextRequest) {
  const folder = request.nextUrl.searchParams.get("folder");
  if (!folder) return NextResponse.json({ files: [] });

  // Prevent path traversal — keep reads inside public/
  const safe = path.normalize(folder).replace(/^(\.\.[\\/])+/, "");
  const abs = path.join(process.cwd(), "public", safe);

  try {
    if (!fs.existsSync(abs) || !fs.statSync(abs).isDirectory()) {
      return NextResponse.json({ files: [] });
    }

    const files: AssetFile[] = fs
      .readdirSync(abs)
      .filter((f) => ALL_EXTS.has(path.extname(f).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
      .map((f) => ({
        src: `/${safe.replace(/\\/g, "/")}/${f}`,
        name: f,
        kind: IMAGE_EXTS.has(path.extname(f).toLowerCase()) ? "image" : "video",
      }));

    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ files: [] });
  }
}
