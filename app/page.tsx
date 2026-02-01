"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAnything = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/ai/ask-anything", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer || "No response.");
    } catch (err) {
      setAnswer("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 text-center relative">

      {/* ⭐ CHAT BUTTON (TOP RIGHT) */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="
          fixed top-28 right-10 z-50
          bg-cyan-600 hover:bg-cyan-500 text-white
          px-4 py-2 rounded-full flex items-center gap-2 shadow-lg
        "
      >
        <MessageCircle size={20} />
        Chat
      </button>

      {/* BRAND */}
      <h1 className="text-6xl font-extrabold text-cyan-300 mb-6">
        WebCodo
      </h1>

      {/* SUBTITLE */}
      <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
        Your AI‑native developer workspace — intelligent, fast, and built for creators.
      </p>

      {/* CTA BUTTONS */}
      <div className="flex justify-center gap-6 mb-20">
        <Link
          href="/auth/signup"
          className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-lg transition"
        >
          Get Started
        </Link>

        <Link
          href="/workspace"
          className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-lg transition"
        >
          Open Workspace
        </Link>
      </div>

      {/* ⭐ CHAT POP‑UP WINDOW */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-50">

          <div
            className="
              w-[95%] max-w-7xl
              h-[90vh]
              bg-slate-900 border border-slate-800 rounded-t-2xl
              p-6 shadow-xl flex flex-col
            "
          >

            {/* CLOSE BUTTON */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Chat with WebCodo</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* ⭐ OUTPUT WINDOW — TOP, VERY TALL */}
            <div
              className="
                flex-1 w-full p-4 rounded-lg bg-slate-950 border border-slate-800
                text-slate-300 whitespace-pre-wrap overflow-y-auto
                min-h-[400px]
                mb-4
              "
            >
              {loading && !answer && (
                <p className="text-slate-500 animate-pulse">Thinking…</p>
              )}

              {answer || (
                <p className="text-slate-600">Your answer will appear here.</p>
              )}
            </div>

            {/* INPUT */}
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything…"
              className="
                w-full h-32 p-4 rounded-lg bg-slate-950 border border-slate-800
                text-slate-200 resize-none focus:ring-2 focus:ring-cyan-600 outline-none
              "
            />

            <button
              onClick={askAnything}
              disabled={loading}
              className="mt-4 w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-semibold"
            >
              {loading ? "Thinking…" : "Ask"}
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
