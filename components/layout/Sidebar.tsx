"use client";

import Link from "next/link";
import { LayoutDashboard, BookOpen, Grid3X3 } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const items = [
    { name: "Workspace", href: "/workspace", icon: LayoutDashboard },
    { name: "Library", href: "/prompt-library", icon: BookOpen },
    { name: "Sectors", href: "/sectors", icon: Grid3X3 },
  ];

  return (
    <div className="h-screen w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 gap-6">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname.startsWith(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex flex-col items-center gap-1 p-3 rounded-lg transition
              ${active ? "bg-sky-800 text-white" : "text-slate-400 hover:bg-slate-800"}
            `}
          >
            <Icon size={22} className="text-cyan-300" />
            <span className="text-[10px]">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

