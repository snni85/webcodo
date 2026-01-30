"use client";

import { useState } from "react";

export default function SectorsSection() {
  const [search, setSearch] = useState("");

  const sectors = [
    { id: "technology", label: "Technology" },
    { id: "finance", label: "Finance" },
    { id: "healthcare", label: "Healthcare" },
    { id: "education", label: "Education" },
    { id: "realestate", label: "Real Estate" },
    { id: "marketing", label: "Marketing" },
    { id: "legal", label: "Legal" },
    { id: "retail", label: "Retail" },
    { id: "manufacturing", label: "Manufacturing" },
    { id: "hospitality", label: "Hospitality" },
  ];

  const filtered = sectors.filter((s) =>
    s.label.toLowerCase().includes(search.toLowerCase())
  );

  const openSector = (sectorId: string) => {
    window.dispatchEvent(
      new CustomEvent("webcodo-open-sector", {
        detail: { sector: sectorId },
      })
    );
  };

  return (
    <section className="py-20 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-10 text-center">Sectors</h2>

      {/* Search Bar */}
      <div className="w-full max-w-4xl mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search sectors…"
          className="
            w-full bg-slate-900 border border-sky-800
            rounded-xl p-4 text-slate-200 outline-none
            focus:ring-2 focus:ring-sky-500
          "
        />
      </div>

      {/* Sector Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((sector) => (
          <div
            key={sector.id}
            onClick={() => openSector(sector.id)}
            className="
              bg-slate-900 border border-sky-800 rounded-xl
              p-6 cursor-pointer shadow-lg
              hover:bg-slate-800 hover:shadow-sky-800/20 transition
            "
          >
            <h3 className="text-xl font-semibold mb-2">{sector.label}</h3>
            <p className="text-slate-400 text-sm">
              AI tools and workflows for the {sector.label} industry.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
