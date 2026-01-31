"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// FIXED: Correct path after Option A
import CommandPalette from "@/components/CommandPalette";

export default function Navbar() {
  const [drawer, setDrawer] = useState(false);
  const [openPalette, setOpenPalette] = useState(false);

  // Toggle Command Palette with CMD+K or CTRL+K
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenPalette((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Command Palette */}
      <CommandPalette open={openPalette} setOpen={setOpenPalette} />

      <nav className="w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md fixed top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-cyan-300">
            WebCodo
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/workspace" className="text-slate-300 hover:text-white">
              Workspace
            </Link>
            <Link href="/ai" className="text-slate-300 hover:text-white">
              AI Tools
            </Link>
            <Link href="/sectors" className="text-slate-300 hover:text-white">
              Sectors
            </Link>

            {/* Command Palette Button */}
            <button
              onClick={() => setOpenPalette(true)}
              className="px-3 py-1.5 rounded-md bg-sky-800 text-white border border-sky-600 hover:bg-sky-700"
            >
              Command ⌘K
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300"
            onClick={() => setDrawer(true)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Drawer */}
        {drawer && (
          <div
            className="fixed inset-0 bg-black/50 z-[150]"
            onClick={() => setDrawer(false)}
          >
            <div
              className="absolute right-0 top-0 w-64 h-full bg-slate-900 border-l border-slate-800 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="text-slate-400 mb-6"
                onClick={() => setDrawer(false)}
              >
                ✕
              </button>

              <div className="flex flex-col gap-4">
                <Link href="/workspace" className="text-slate-300 hover:text-white">
                  Workspace
                </Link>
                <Link href="/ai" className="text-slate-300 hover:text-white">
                  AI Tools
                </Link>
                <Link href="/sectors" className="text-slate-300 hover:text-white">
                  Sectors
                </Link>

                <button
                  onClick={() => {
                    setDrawer(false);
                    setOpenPalette(true);
                  }}
                  className="px-3 py-2 rounded-md bg-sky-800 text-white border border-sky-600 hover:bg-sky-700"
                >
                  Command ⌘K
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
