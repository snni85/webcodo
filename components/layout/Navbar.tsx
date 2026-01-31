"use client";

import { useState } from "react";
import Link from "next/link";

// ICONS
import {
  Menu,
  X,
  Grid3X3,
  BookOpen,
  LayoutDashboard,
  Command,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LEFT — LOGO */}
        <Link href="/" className="text-xl font-bold text-cyan-300">
          WebCodo
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">

          {/* SECTORS */}
          <Link
            href="/sectors"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition"
          >
            <Grid3X3 size={18} className="text-cyan-300" />
            Sectors
          </Link>

          {/* LIBRARY */}
          <Link
            href="/prompt-library"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition"
          >
            <BookOpen size={18} className="text-cyan-300" />
            Library
          </Link>

          {/* WORKSPACE */}
          <Link
            href="/workspace"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition"
          >
            <LayoutDashboard size={18} className="text-cyan-300" />
            Workspace
          </Link>

          {/* COMMAND PALETTE */}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-sky-800 hover:bg-sky-700 text-white rounded-md transition"
          >
            <Command size={18} />
            Command
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setOpen(true)}
        >
          <Menu size={26} />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-72 bg-slate-900 border-l border-slate-800 p-6 flex flex-col gap-6">

            {/* CLOSE BUTTON */}
            <button
              className="self-end text-slate-300"
              onClick={() => setOpen(false)}
            >
              <X size={26} />
            </button>

            {/* MOBILE NAV LINKS */}

            {/* SECTORS */}
            <Link
              href="/sectors"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-slate-200 text-lg hover:text-white transition"
            >
              <Grid3X3 size={20} className="text-cyan-300" />
              Sectors
            </Link>

            {/* LIBRARY */}
            <Link
              href="/prompt-library"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-slate-200 text-lg hover:text-white transition"
            >
              <BookOpen size={20} className="text-cyan-300" />
              Library
            </Link>

            {/* WORKSPACE */}
            <Link
              href="/workspace"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-slate-200 text-lg hover:text-white transition"
            >
              <LayoutDashboard size={20} className="text-cyan-300" />
              Workspace
            </Link>

            {/* COMMAND PALETTE */}
            <button
              className="flex items-center gap-3 px-4 py-2 bg-sky-800 hover:bg-sky-700 text-white rounded-md transition"
            >
              <Command size={20} />
              Command
            </button>

            {/* AUTH BUTTONS */}
            <div className="mt-6 flex flex-col gap-3">
              <button className="w-full py-2 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700 transition">
                Sign In
              </button>
              <button className="w-full py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-500 transition">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

