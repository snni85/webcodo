"use client";

import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState("english");

  const executeAI = () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult("");

    // Trigger your AI agent system with selected language
    window.dispatchEvent(
      new CustomEvent("webcodo-agent", {
        detail: { action: "prompt", payload: input, language },
      })
    );

    // Temporary UI delay (remove when backend connected)
    setTimeout(() => {
      setLoading(false);
      setResult(`AI executed in ${language} language.`);
    }, 800);
  };

  return (
    <main className="pt-40 px-6 flex flex-col items-center text-slate-200">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6 text-center">
        WebCodo AI Workspace
      </h1>

      {/* Wide Prompt Box */}
      <div
        className="
          w-full max-w-4xl bg-slate-900 border border-sky-800
          rounded-2xl shadow-xl p-6
        "
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask WebCodo AI anything…"
          className="
            w-full h-40 bg-slate-800 text-slate-200
            border border-sky-700 rounded-xl p-4
            outline-none resize-none
            focus:ring-2 focus:ring-sky-500
          "
        />

        {/* Buttons Row */}
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
            w-full max-w-4xl mt-8 bg-slate-900 border border-sky-800
            rounded-2xl shadow-xl p-6 text-slate-300
          "
        >
          {result}
        </div>
      )}
    </main>
  );
}
