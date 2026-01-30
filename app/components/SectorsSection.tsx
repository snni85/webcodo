"use client";

import { useState } from "react";
import {
  Landmark,
  Stethoscope,
  GraduationCap,
  Building2,
  ShoppingCart,
  Cpu,
  Briefcase,
  Plane,
  Factory,
  Car,
  Film,
  Gamepad2,
  Waves,
  Microscope,
} from "lucide-react";

const industries = [
  { name: "Finance", icon: Landmark },
  { name: "Healthcare", icon: Stethoscope },
  { name: "Education", icon: GraduationCap },
  { name: "Real Estate", icon: Building2 },
  { name: "E‑Commerce", icon: ShoppingCart },
  { name: "Technology", icon: Cpu },
  { name: "Business", icon: Briefcase },
  { name: "Travel", icon: Plane },
  { name: "Manufacturing", icon: Factory },

  { name: "Automotive", icon: Car },
  { name: "Entertainment", icon: Film },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Energy", icon: Waves },
  { name: "Research", icon: Microscope },
];

const prompts: Record<string, string[]> = {
  Finance: [
    "Analyze this financial dataset and extract key insights.",
    "Summarize market trends for the last 24 hours.",
    "Generate a risk assessment for this investment.",
    "Explain this financial concept in simple terms.",
    "Create a quarterly financial forecast."
  ],
  Healthcare: [
    "Summarize this medical report in simple language.",
    "Generate a patient‑friendly explanation of this diagnosis.",
    "Identify risks or red flags in this clinical data.",
    "Create a structured care plan from these symptoms.",
    "Compare two treatments and list pros/cons."
  ],
  Education: [
    "Turn this topic into a simple lesson plan.",
    "Generate 5 quiz questions based on this content.",
    "Explain this concept using a real‑world analogy.",
    "Create a study guide summarizing key points.",
    "Rewrite this text for a 10‑year‑old student."
  ],
  "Real Estate": [
    "Summarize this property listing professionally.",
    "Generate a market comparison for similar homes.",
    "Write a persuasive property description.",
    "Analyze this neighborhood and highlight benefits.",
    "Estimate rental yield based on this data."
  ],
  "E‑Commerce": [
    "Write a high‑converting product description.",
    "Analyze customer reviews and extract insights.",
    "Generate 5 marketing angles for this product.",
    "Create an SEO‑optimized title and bullets.",
    "Summarize sales performance and suggest improvements."
  ],
  Technology: [
    "Explain this technical concept simply.",
    "Generate documentation for this code snippet.",
    "Identify bugs or inefficiencies in this code.",
    "Create a system architecture summary.",
    "Convert this idea into a technical spec."
  ],
  Business: [
    "Turn this idea into a business plan outline.",
    "Generate a SWOT analysis for this company.",
    "Summarize this meeting into action items.",
    "Create a pitch deck outline.",
    "Write a professional email based on this context."
  ],
  Travel: [
    "Create a 3‑day travel itinerary.",
    "Summarize key attractions for this destination.",
    "Generate a packing list based on weather.",
    "Write a friendly travel guide.",
    "Compare two destinations and recommend one."
  ],
  Manufacturing: [
    "Summarize this production report.",
    "Identify bottlenecks in this workflow.",
    "Generate a quality‑control checklist.",
    "Explain this process simply.",
    "Suggest efficiency improvements."
  ],
  Automotive: [
    "Summarize key features of this vehicle.",
    "Compare two car models and recommend one.",
    "Explain this mechanical issue simply.",
    "Generate a maintenance checklist.",
    "Write a dealership‑style description."
  ],
  Entertainment: [
    "Write a short script based on this idea.",
    "Summarize this movie plot.",
    "Generate character descriptions.",
    "Create 5 creative content ideas.",
    "Rewrite this scene dramatically."
  ],
  Gaming: [
    "Design a game mechanic based on this idea.",
    "Summarize this game lore.",
    "Generate 5 quest ideas.",
    "Create a character backstory.",
    "Explain this strategy simply."
  ],
  Energy: [
    "Summarize this energy report.",
    "Explain this renewable energy concept.",
    "Compare two energy sources.",
    "Generate a sustainability plan.",
    "Analyze efficiency trends."
  ],
  Research: [
    "Summarize this research paper.",
    "Explain the methodology simply.",
    "Generate hypotheses from this data.",
    "Rewrite this abstract for general readers.",
    "Identify limitations in this study."
  ],
};

export default function SectorsSection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="py-20 flex flex-col items-center w-full">

      {/* 9 icons per row, 3 rows */}
      <div className="grid grid-cols-9 gap-6">
        {industries.map((industry) => {
          const Icon = industry.icon;
          return (
            <button
              key={industry.name}
              onClick={() => setActive(industry.name)}
              className="
                flex flex-col items-center gap-2
                bg-slate-900 border border-sky-800
                p-4 rounded-xl hover:bg-slate-800 transition
                w-20 h-20 justify-center
              "
            >
              <Icon className="w-6 h-6 text-sky-400" />
              <span className="text-xs text-slate-300 text-center">
                {industry.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Prompt Panel */}
      {active && (
        <div className="w-full max-w-4xl mt-10 bg-slate-900 border border-sky-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 text-sky-300">
            {active} Prompts
          </h3>

          <ul className="space-y-3 text-slate-300">
            {prompts[active]?.map((prompt, index) => (
              <li
                key={index}
                className="bg-slate-800 p-3 rounded-lg border border-sky-700"
              >
                {prompt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
