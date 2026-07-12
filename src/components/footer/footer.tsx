import React from "react";
import SocialMediaButtons from "../social/social-media-icons";
import { config } from "@/data/config";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex w-full shrink-0 items-center justify-between border-t border-border px-4 py-6 md:px-6">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {year} {config.author}. All rights reserved.
      </p>
      <SocialMediaButtons />
    </footer>
  );
}

export default Footer;
