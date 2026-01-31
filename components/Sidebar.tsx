"use client";

import Link from "next/link";
import { Home, Book, Grid } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `flex items-center gap-3 px-5 py-3 rounded-lg text-lg transition ${
      pathname === path
        ? "bg-sky-700 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-6">WebCodo</h1>

      <Link href="/" className={linkClass("/")}>
        <Home size={20} /> Workspace
      </Link>

      <Link href="/prompt-library" className={linkClass("/prompt-library")}>
        <Book size={20} /> Prompt Library
      </Link>

      <Link href="/sectors" className={linkClass("/sectors")}>
        <Grid size={20} /> Sectors
      </Link>
    </aside>
  );
}
