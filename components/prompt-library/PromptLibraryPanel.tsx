"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, Search } from "lucide-react";

const categories = [
  { id: "general", name: "General" },
  { id: "coding", name: "Coding" },
  { id: "writing", name: "Writing" },
  { id: "seo", name: "SEO" },
  { id: "marketing", name: "Marketing" },
];

const prompts = {
  general: [
    {
      title: "Summarize Text",
      prompt: "Summarize the following text into key bullet points:",
    },
    {
      title: "Explain Like I'm 5",
      prompt: "Explain this concept in simple ELI5 language:",
    },
  ],
  coding: [
    {
      title: "Fix Code",
      prompt: "Fix the following code and explain the changes:",
    },
    {
      title: "Generate Component",
      prompt: "Create a clean, reusable React component for:",
    },
  ],
  writing: [
    {
      title: "Rewrite Professionally",
      prompt: "Rewrite this text in a professional tone:",
    },
    {
      title: "Expand Text",
      prompt: "Expand this text with more detail and clarity:",
    },
  ],
  seo: [
    {
      title: "SEO Keywords",
      prompt: "Generate SEO‑optimized keywords for:",
    },
    {
      title: "Meta Description",
      prompt: "Write a high‑CTR meta description for:",
    },
  ],
  marketing: [
    {
      title: "Ad Copy",
      prompt: "Write a high‑converting ad copy for:",
    },
    {
      title: "Audience Persona",
      prompt: "Create a detailed audience persona for:",
    },
  ],
};

export default function PromptLibraryPanel() {
  const [active, setActive] = useState("general");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState("");

  const filtered = prompts[active].filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 1200);
  };

  return (
    <div className="p-6 bg-slate-900 border border-sky-800 rounded-xl shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-cyan-300" size={22} />
        <h2 className="text-2xl font-bold text-cyan-300">Prompt Library</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium border transition
              ${
                active === cat.id
                  ? "bg-sky-700 border-sky-500 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
              }
            `}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search prompts…"
          className="
            w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 text-slate-200
            border border-sky-700 outline-none
            focus:ring-2 focus:ring-sky-500
          "
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.title}
            className="
              group p-5 rounded-xl border border-sky-800 bg-slate-800
              hover:bg-slate-700 transition shadow-lg relative
            "
          >
            <h3 className="text-lg font-semibold text-cyan-300 mb-2">
              {item.title}
            </h3>

            <p className="text-slate-300 text-sm mb-10">
              {item.prompt}
            </p>

            {/* Copy Button */}
            <button
              onClick={() => copyPrompt(item.prompt)}
              className="
                absolute bottom-4 right-4 flex items-center gap-2
                px-3 py-1.5 rounded-md text-sm
                bg-sky-700 border border-sky-500 text-white
                hover:bg-sky-600 transition
              "
            >
              {copied === item.prompt ? (
                <>
                  <Check size={16} /> Copied
                </>
              ) : (
                <>
                  <Copy size={16} /> Copy
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-slate-400 text-center mt-6">No prompts found.</p>
      )}
    </div>
  );
}
