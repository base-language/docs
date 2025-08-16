// @/components/header.tsx
import React from "react";
import Link from "next/link";
import VersionSelector from "@/components/versionSelector";

export default function Header() {
  return (
    <header className="grid grid-cols-2 select-none z-[99999] sticky top-0 shadow-sm left-0 right-0 h-[62px] border-b border-neutral-300/80 dark:border-neutral-800/80 bg-white/20 dark:bg-neutral-900/20 backdrop-blur-lg items-center justify-between px-6 py-3">
      <div className="flex flex-row items-center justify-center w-fit gap-3">
        <Link
          draggable="false"
          href="/"
          className="text-xl select-none font-[550] active:scale-[0.98] hover:cursor-pointer text-neutral-900 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-neutral-50 transition-[color,scale] ease-in-out duration-200"
        >
          Base Language
        </Link>
        <VersionSelector />
      </div>
      <nav className="flex flex-row items-center justify-end space-x-4">
        &nbsp;
      </nav>
    </header>
  );
}
