"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="font-semibold text-lg">
          WebCodo
        </Link>

        <button className="p-2 rounded-md hover:bg-gray-100">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
