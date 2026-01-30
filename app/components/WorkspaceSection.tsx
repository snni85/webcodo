"use client";

import { useState } from "react";

export default function WorkspaceSection() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("english");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const executeAI = () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult("");

    window.dispatchEvent(
      new CustomEvent("webcodo-agent", {
        detail: { action: "prompt", payload: input, language },
      })
    );

    setTimeout(() => {
      setLoading(false);
      setResult(`AI executed in ${language} language.`);
    }, 800);
  };

  return (
    <section className="py-20 flex flex-col items-center w-full">
      {/* Header */}
      <div className="w-full max-w-5xl mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-left">
          Prompt Workspace
        </h2>
      </div>

      {/* Workspace Container */}
      <div
        className="
          w-full max-w-5xl bg-slate-900 border border-sky-800
          rounded-2xl shadow-xl p-6
        "
      >
        {/* Prompt Input */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your prompt here…"
          className="
            w-full h-48 bg-slate-800 text-slate-200
            border border-sky-700 rounded-xl p-4
            outline-none resize-none text-lg
            focus:ring-2 focus:ring-sky-500
          "
        />

        {/* Controls */}
        <div className="flex justify-end items-center gap-3 mt-4">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="
              bg-slate-800 text-slate-200 border border-sky-700
              px-3 py-2 rounded-lg text-sm outline-none
              hover:bg-slate-700 transition
            "
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="french">French</option>
          </select>

          {/* Execute Button */}
          <button
            onClick={executeAI}
            className="
              px-6 py-2 rounded-lg bg-sky-900 border border-sky-700
              text-slate-200 hover:bg-sky-800 transition
            "
          >
            {loading ? "Executing…" : "Execute"}
          </button>
        </div>
      </div>

      {/* Result Box */}
      {result && (
        <div
          className="
            w-full max-w-5xl mt-8 bg-slate-900 border border-sky-800
            rounded-2xl shadow-xl p-6 text-slate-300
          "
        >
          {result}
        </div>
      )}
    </section>
  );
}
