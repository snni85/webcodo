"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CommandPalette from "@/app/components/CommandPalette"; // ✅ CORRECT PATH

export default function Navbar() {
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState(false);

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* Command Palette */}
      <CommandPalette open={open} setOpen={setOpen} />

      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900 border-b border-sky-800 px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-white">
          WebCodo
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-slate-200">
          <Link href="/templates" className="hover:text-white transition">
            Templates
          </Link>
          <Link href="/pricing" className="hover:text-white transition">
            Pricing
          </Link>
          <Link href="/faqs" className="hover:text-white transition">
            FAQs
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link>

          {/* Command Palette Button */}
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white transition"
          >
            Command Palette
          </button>
        </div>

        {/* Sign In / Sign Up */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/signin" className="text-slate-200 hover:text-white">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-200"
          onClick={() => setDrawer(true)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Drawer */}
      {drawer && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setDrawer(false)}
        >
          <div
            className="absolute top-0 right-0 w-64 h-full bg-slate-900 border-l border-sky-800 p-6 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Link href="/templates" className="text-slate-200 hover:text-white">
              Templates
            </Link>
            <Link href="/pricing" className="text-slate-200 hover:text-white">
              Pricing
            </Link>
            <Link href="/faqs" className="text-slate-200 hover:text-white">
              FAQs
            </Link>
            <Link href="/contact" className="text-slate-200 hover:text-white">
              Contact
            </Link>

            <button
              onClick={() => {
                setOpen(true);
                setDrawer(false);
              }}
              className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white transition"
            >
              Command Palette
            </button>

            <Link href="/signin" className="text-slate-200 hover:text-white">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
