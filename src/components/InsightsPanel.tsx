"use client";

import { useEffect, useState } from "react";

export default function InsightsPanel({ sector }: { sector: string }) {
  const [insights, setInsights] = useState<any>(null);

  // Simulated AI generation (replace with your agent later)
  useEffect(() => {
    const generated = {
      government: {
        trends: [
          "Increased automation in public service workflows",
          "Demand for transparent policy summaries",
          "AI‑powered compliance monitoring",
        ],
        risks: [
          "Data privacy concerns",
          "Regulatory constraints",
          "Bias in decision‑making models",
        ],
        opportunities: [
          "Faster citizen support",
          "Automated policy drafting",
          "Predictive analytics for public safety",
        ],
      },

      ecommerce: {
        trends: [
          "AI‑generated product listings dominating SEO",
          "Personalized shopping experiences",
          "Automated customer support",
        ],
        risks: [
          "SEO volatility",
          "High return rates",
          "Customer sentiment swings",
        ],
        opportunities: [
          "AI‑optimized product pages",
          "Automated review analysis",
          "Dynamic pricing intelligence",
        ],
      },

      healthcare: {
        trends: [
          "AI‑assisted clinical documentation",
          "Predictive diagnostics",
          "Patient‑friendly summaries",
        ],
        risks: [
          "Medical accuracy concerns",
          "Regulatory compliance",
          "Data sensitivity",
        ],
        opportunities: [
          "Faster clinical note generation",
          "AI‑powered triage",
          "Insurance form automation",
        ],
      },
    };

    setInsights(generated[sector]);
  }, [sector]);

  if (!insights) return null;

  const sendToWorkspace = (text: string) => {
    window.dispatchEvent(
      new CustomEvent("webcodo-insight", {
        detail: { sector, text },
      })
    );
  };

  return (
    <div
      className="
        w-full max-w-5xl bg-slate-900 border border-sky-800
        rounded-2xl p-6 shadow-xl mt-16
      "
    >
      <h2 className="text-2xl font-semibold mb-6">AI‑Generated Insights</h2>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Trends */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-sky-400">Trends</h3>
          <ul className="text-slate-300 text-sm space-y-2">
            {insights.trends.map((t: string, i: number) => (
              <li key={i} className="flex justify-between">
                {t}
                <button
                  onClick={() => sendToWorkspace(t)}
                  className="text-sky-500 text-xs hover:text-sky-300"
                >
                  Send
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-red-400">Risks</h3>
          <ul className="text-slate-300 text-sm space-y-2">
            {insights.risks.map((r: string, i: number) => (
              <li key={i} className="flex justify-between">
                {r}
                <button
                  onClick={() => sendToWorkspace(r)}
                  className="text-sky-500 text-xs hover:text-sky-300"
                >
                  Send
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-400">
            Opportunities
          </h3>
          <ul className="text-slate-300 text-sm space-y-2">
            {insights.opportunities.map((o: string, i: number) => (
              <li key={i} className="flex justify-between">
                {o}
                <button
                  onClick={() => sendToWorkspace(o)}
                  className="text-sky-500 text-xs hover:text-sky-300"
                >
                  Send
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
