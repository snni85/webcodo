"use client";

import { useState } from "react";

export default function PromptLibrarySection() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("ai");

  const categories = [
    { id: "ai", label: "AI General" },
    { id: "code", label: "Code" },
    { id: "debug", label: "Debugging" },
    { id: "writing", label: "Writing" },
    { id: "seo", label: "SEO" },
    { id: "translate", label: "Translation" },
  ];

  const prompts = {
    ai: [
      { title: "Explain a concept", prompt: "Explain this concept in simple terms:" },
      { title: "Summarize text", prompt: "Summarize the following text clearly:" },
      { title: "Generate ideas", prompt: "Give me creative ideas for:" },
    ],
    code: [
      { title: "Write code", prompt: "Write clean, optimized code for:" },
      { title: "Refactor code", prompt: "Refactor this code to improve readability:" },
      { title: "Add comments", prompt: "Add clear comments to this code:" },
    ],
    debug: [
      { title: "Find bugs", prompt: "Find bugs in this code and explain the fixes:" },
      { title: "Optimize performance", prompt: "Optimize this code for performance:" },
      { title: "Explain error", prompt: "Explain this error message and how to fix it:" },
    ],
    writing: [
      { title: "Rewrite professionally", prompt: "Rewrite this text in a professional tone:" },
      { title: "Shorten text", prompt: "Shorten this text while keeping meaning:" },
      { title: "Expand text", prompt: "Expand this text with more detail:" },
    ],
    seo: [
      { title: "SEO keywords", prompt: "Generate SEO keywords for:" },
      { title: "Meta description", prompt: "Write an SEO‑optimized meta description for:" },
      { title: "Blog outline", prompt: "Create an SEO‑friendly blog outline about:" },
    ],
    translate: [
      { title: "Translate text", prompt: "Translate this text to English:" },
      { title: "Improve translation", prompt: "Improve this translation for clarity:" },
      { title: "Localize content", prompt: "Localize this content for:" },
    ],
  };

  const filteredPrompts = prompts[activeTab].filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const insertPrompt = (text: string) => {
    window.dispatchEvent(
      new CustomEvent("webcodo-insert-prompt", {
        detail: { prompt: text },
      })
    );
  };

  return (
    <section className="py-20 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-10 text-center">Prompt Library</h2>

      {/* Search Bar */}
      <div className="w-full max-w-4xl mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search prompts…"
          className="
            w-full bg-slate-900 border border-sky-800
            rounded-xl p-4 text-slate-200 outline-none
            focus:ring-2 focus:ring-sky-500
          "
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`
              px-4 py-2 rounded-lg text-sm border
              ${
                activeTab === cat.id
                  ? "bg-sky-900 border-sky-700"
                  : "bg-slate-900 border-slate-700 hover:bg-slate-800"
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Prompt Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((item, i) => (
          <div
            key={i}
            className="
              bg-slate-900 border border-sky-800 rounded-xl
              p-5 shadow-lg hover:shadow-sky-800/20 transition
            "
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{item.prompt}</p>

            <button
              onClick={() => insertPrompt(item.prompt)}
              className="
                w-full px-4 py-2 rounded-lg bg-sky-900 border border-sky-700
                text-slate-200 hover:bg-sky-800 transition text-sm
              "
            >
              Insert into Workspace
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
