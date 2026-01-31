"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

// ICONS
import {
  Code2,
  Wrench,
  FileCode,
  FilePlus,
  Search,
  History,
  Settings,
  RefreshCw,
  SunMoon,
  Cpu,
  LayoutDashboard,
  Cog,
} from "lucide-react";

export default function CommandPalette({ open, setOpen }: any) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("AI");

  const tabs = [
    { name: "AI", icon: Cpu },
    { name: "Workspace", icon: LayoutDashboard },
    { name: "System", icon: Cog },
  ];

  const allCommands = {
    AI: [
      { name: "Generate Component", href: "/ai/generate-component", icon: Code2, shortcut: "G" },
      { name: "Fix Code", href: "/ai/fix-code", icon: Wrench, shortcut: "F" },
      { name: "Explain Code", href: "/ai/explain", icon: FileCode, shortcut: "E" },
      { name: "Refactor File", href: "/ai/refactor", icon: FileCode, shortcut: "R" },
    ],
    Workspace: [
      { name: "New File", href: "/workspace/new-file", icon: FilePlus, shortcut: "N" },
      { name: "Search Files", href: "/workspace/search", icon: Search, shortcut: "S" },
      { name: "Recent Files", href: "/workspace/recent", icon: History, shortcut: "H" },
      { name: "Settings", href: "/settings", icon: Settings, shortcut: "⌘," },
    ],
    System: [
      { name: "Toggle Theme", href: "/system/theme", icon: SunMoon, shortcut: "T" },
      { name: "Reload App", href: "/system/reload", icon: RefreshCw, shortcut: "⌘R" },
    ],
  };

  const commands = allCommands[activeTab];

  const filtered = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeTab]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "Escape") setOpen(false);

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev + 1 < filtered.length ? prev + 1 : 0
        );
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev - 1 >= 0 ? prev - 1 : filtered.length - 1
        );
      }

      if (e.key === "Enter") {
        const cmd = filtered[selectedIndex];
        if (cmd) window.location.href = cmd.href;
      }
    },
    [open, filtered, selectedIndex, setOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]
        flex items-start justify-center pt-32 animate-fadeIn
      "
      onClick={() => setOpen(false)}
    >
      <div
        className="
          w-full max-w-3xl bg-slate-900 border border-sky-800
          rounded-xl shadow-2xl p-5 animate-slideDown
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tabs */}
        <div className="flex gap-3 mb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;

            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                  border transition
                  ${
                    isActive
                      ? "bg-sky-700 border-sky-500 text-white"
                      : "bg-sky-900 border-sky-800 text-slate-300 hover:bg-sky-800"
                  }
                `}
              >
                <Icon
                  size={16}
                  className={`
                    text-cyan-300 transition-transform duration-200
                    ${isActive ? "scale-110 rotate-6" : ""}
                  `}
                />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search commands…"
          className="
            w-full px-4 py-3 rounded-lg bg-slate-800 text-slate-200
            border border-sky-700 outline-none
            focus:ring-2 focus:ring-sky-500
          "
        />

        {/* Commands */}
        <div className="mt-4 flex flex-wrap gap-3 items-center justify-start">
          {filtered.length === 0 && (
            <p className="text-slate-400 text-sm px-2 py-3">No results</p>
          )}

          {filtered.map((cmd, index) => {
            const Icon = cmd.icon;
            const isActive = index === selectedIndex;

            return (
              <Link
                key={cmd.name}
                href={cmd.href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3
                  px-4 py-2 rounded-md text-sm whitespace-nowrap
                  border transition relative
                  ${
                    isActive
                      ? "bg-sky-700 border-sky-500 text-white"
                      : "bg-sky-900 border-sky-800 text-slate-200 hover:bg-sky-800"
                  }
                `}
              >
                <Icon
                  size={18}
                  className={`
                    text-cyan-300 transition-transform duration-200
                    ${isActive ? "scale-110 rotate-6" : ""}
                  `}
                />

                <span>{cmd.name}</span>

                <span
                  className="
                    ml-auto text-xs px-2 py-0.5 rounded
                    bg-slate-800 border border-sky-700 text-slate-300
                  "
                >
                  {cmd.shortcut}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
