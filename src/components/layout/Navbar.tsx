"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import CommandPalette from "@/components/ui/CommandPalette";

export default function Navbar() {
  const [drawer, setDrawer] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navLinks = ["templates", "pricing", "faqs", "contact"];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="
          fixed top-0 left-0 w-full z-[100]
          px-8 py-4 flex items-center justify-between
          bg-sky-950/90 backdrop-blur-xl
          border-b border-sky-800
          shadow-[0_4px_20px_rgba(0,0,0,0.25)]
        "
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-1 select-none">
          <span className="text-4xl font-extrabold text-cyan-300 drop-shadow-lg">
            W
          </span>
          <span className="text-xl font-semibold tracking-tight text-slate-200">
            ebcodo
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className="
                text-slate-300 hover:text-white
                transition-colors text-sm font-medium capitalize
              "
            >
              {item}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* COMMAND BUTTON */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="
              hidden md:flex items-center gap-2
              px-3 py-1.5 rounded-lg
              bg-sky-900 border border-sky-800
              text-xs text-slate-200
              hover:bg-sky-800 transition
            "
          >
            <span>Command</span>
            <span
              className="
                text-[10px] px-1.5 py-0.5 rounded
                border border-sky-700 text-slate-300
              "
            >
              ⌘K
            </span>
          </button>

          {/* SIGN IN */}
          <Link
            href="/signin"
            className="
              px-4 py-2 rounded-lg
              bg-sky-900 text-slate-200
              border border-sky-800 hover:bg-sky-800
              transition text-sm font-medium
            "
          >
            Sign In
          </Link>

          {/* SIGN UP */}
          <Link
            href="/signup"
            className="
              px-4 py-2 rounded-lg
              bg-white text-black
              hover:bg-gray-200
              transition font-semibold text-sm
            "
          >
            Sign Up
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-slate-200 text-3xl"
            onClick={() => setDrawer(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {drawer && (
        <div
          className="
            fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]
            flex justify-end animate-fadeIn
          "
          onClick={() => setDrawer(false)}
        >
          <div
            className="
              w-72 h-full bg-sky-950 backdrop-blur-xl
              border-l border-sky-800 shadow-xl p-6
              flex flex-col gap-6 animate-slideIn
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Logo */}
            <div className="flex items-center gap-1 select-none mb-4">
              <span className="text-4xl font-extrabold text-cyan-300 drop-shadow-lg">
                W
              </span>
              <span className="text-xl font-semibold tracking-tight text-slate-200">
                ebcodo
              </span>
            </div>

            {/* Drawer Links ONLY */}
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className="text-slate-200 text-lg capitalize"
                onClick={() => setDrawer(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* COMMAND PALETTE */}
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  );
}

