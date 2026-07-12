"use client";
import { useEffect, useRef, useState } from "react";
import type { AssetFile } from "@/app/api/assets/route";

export function useAssetFolder(folder: string, enabled = true) {
  const [files, setFiles] = useState<AssetFile[]>([]);
  const fetched = useRef(false);

  useEffect(() => {
    if (!enabled || fetched.current) return;
    fetched.current = true;
    fetch(`/api/assets?folder=${encodeURIComponent(folder)}`)
      .then((r) => r.json())
      .then((d) => setFiles(d.files ?? []))
      .catch(() => {});
  }, [folder, enabled]);

  return files;
}
