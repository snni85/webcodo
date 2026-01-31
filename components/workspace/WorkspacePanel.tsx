"use client";

import { useState, useEffect } from "react";
import {
  X,
  Plus,
  Wand2,
  Wrench,
  FileCode,
  Sparkles,
  Mic,
  MicOff,
  Play,
} from "lucide-react";

interface FileTab {
  id: string;
  name: string;
  content: string;
}

export default function WorkspacePanel() {
  const [tabs, setTabs] = useState<FileTab[]>([
    { id: "1", name: "file1.txt", content: "" },
  ]);

  const [activeTab, setActiveTab] = useState("1");
  const [aiOutput, setAiOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🌍 Language selection
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  // 🎤 Voice recognition
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const currentTab = tabs.find((t) => t.id === activeTab);

  const updateTabContent = (value: string) => {
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTab ? { ...t, content: value } : t
      )
    );
  };

  // 🎤 Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.interimResults = true;
        recog.lang = selectedLanguage;
        setRecognition(recog);
      }
    }
  }, [selectedLanguage]);

  // 🎤 Toggle listening
  const toggleListening = () => {
    if (!recognition) return;

    if (!listening) {
      setListening(true);
      recognition.start();
    } else {
      setListening(false);
      recognition.stop();
    }
  };

  // 🎤 Capture speech → insert into editor
  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      updateTabContent(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }, [recognition]);

  // 🔥 FILE‑AWARE AI STREAMING ENGINE
  const runAI = async (mode: string) => {
    if (!currentTab?.content.trim()) return;

    setLoading(true);
    setAiOutput("");

    try {
      const res = await fetch("/api/ai/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          file: {
            name: currentTab.name,
            content: currentTab.content,
          },
        }),
      });

      if (!res.body) {
        setAiOutput("No response body.");
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value);
          setAiOutput((prev) => prev + chunk);
        }
      }
    } catch (err) {
      setAiOutput("Error while streaming response.");
    } finally {
      setLoading(false);
    }
  };

  // ⚡ Execute button
  const executeAI = () => runAI("Execute");

  // ➕ Add new tab
  const addTab = () => {
    const id = Date.now().toString();
    setTabs((prev) => [
      ...prev,
      { id, name: `file${prev.length + 1}.txt`, content: "" },
    ]);
    setActiveTab(id);
  };

  // ❌ Close tab
  const closeTab = (id: string) => {
    setTabs((prev) => prev.filter((t) => t.id !== id));

    if (activeTab === id && tabs.length > 1) {
      const next = tabs.find((t) => t.id !== id);
      if (next) setActiveTab(next.id);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">

      {/* FILE TABS */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 rounded-md cursor-pointer flex items-center gap-2
              ${
                activeTab === tab.id
                  ? "bg-slate-800 text-white"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800"
              }
            `}
          >
            {tab.name}
            <X
              size={14}
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className="hover:text-red-400"
            />
          </div>
        ))}

        {/* ADD TAB */}
        <button
          onClick={addTab}
          className="p-2 rounded-md bg-slate-800 hover:bg-slate-700"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-2 gap-6 flex-1">

        {/* LEFT: EDITOR */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">Editor</h2>

            {/* 🌍 Language + 🎤 Voice + ⚡ Execute */}
            <div className="flex items-center gap-3">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 rounded-md"
              >
                <option value="en-US">English</option>
                <option value="hi-IN">Hindi</option>
                <option value="fr-FR">French</option>
              </select>

              {/* 🎤 Voice Button */}
              <button
                onClick={toggleListening}
                className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                {listening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              {/* ⚡ Execute Button */}
              <button
                onClick={executeAI}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-sky-900 hover:bg-sky-800 rounded-md text-slate-200"
              >
                <Play size={18} /> Execute
              </button>
            </div>
          </div>

          <textarea
            value={currentTab?.content || ""}
            onChange={(e) => updateTabContent(e.target.value)}
            placeholder="Write or speak your instructions…"
            className="
              flex-1 w-full p-4 rounded-lg bg-slate-900 border border-slate-800
              text-slate-200 resize-none focus:ring-2 focus:ring-sky-600 outline-none
            "
          />

          {/* ACTION BAR */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => runAI("Generate")}
              className="flex items-center gap-2 px-4 py-2 bg-sky-700 hover:bg-sky-600 rounded-md"
              disabled={loading}
            >
              <Sparkles size={18} /> Generate
            </button>

            <button
              onClick={() => runAI("Fix")}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-md"
              disabled={loading}
            >
              <Wrench size={18} /> Fix Code
            </button>

            <button
              onClick={() => runAI("Explain")}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-md"
              disabled={loading}
            >
              <FileCode size={18} /> Explain
            </button>

            <button
              onClick={() => runAI("Refactor")}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-md"
              disabled={loading}
            >
              <Wand2 size={18} /> Refactor
            </button>
          </div>
        </div>

        {/* RIGHT: AI OUTPUT */}
        <div className="flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-3">AI Output</h2>

          {/* APPLY FIX BUTTON */}
          {aiOutput && !loading && (
            <button
              onClick={() => updateTabContent(aiOutput)}
              className="mb-3 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md transition"
            >
              Apply Fix to File
            </button>
          )}

          <div
            className="
              flex-1 w-full p-4 rounded-lg bg-slate-900 border border-slate-800
              text-slate-200 whitespace-pre-wrap overflow-auto
            "
          >
            {loading && !aiOutput && (
              <p className="text-slate-400 animate-pulse">Thinking…</p>
            )}
            {aiOutput ||
              (!loading && (
                <p className="text-slate-500">AI output will appear here.</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
