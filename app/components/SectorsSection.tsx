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
  Scale,
  Users,
  Truck,
  Boxes,
  Utensils,
  Shield,
  Palette,
  Smartphone,
  HeartPulse,
  Megaphone,
} from "lucide-react";

const industries = [
  // Row 1
  { name: "Finance", icon: Landmark },
  { name: "Trading", icon: Landmark },
  { name: "Healthcare", icon: Stethoscope },
  { name: "Education", icon: GraduationCap },
  { name: "Technology", icon: Cpu },
  { name: "Real Estate", icon: Building2 },
  { name: "E‑Commerce", icon: ShoppingCart },
  { name: "Business", icon: Briefcase },
  { name: "Marketing", icon: Megaphone },

  // Row 2
  { name: "Travel", icon: Plane },
  { name: "Manufacturing", icon: Factory },
  { name: "Automotive", icon: Car },
  { name: "Entertainment", icon: Film },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Energy", icon: Waves },
  { name: "Research", icon: Microscope },
  { name: "Legal", icon: Scale },
  { name: "HR", icon: Users },

  // Row 3
  { name: "Logistics", icon: Truck },
  { name: "Supply Chain", icon: Boxes },
  { name: "Food & Hospitality", icon: Utensils },
  { name: "Security", icon: Shield },
  { name: "Government", icon: Landmark },
  { name: "Non‑Profit", icon: HeartPulse },
  { name: "Creative", icon: Palette },
  { name: "Consulting", icon: Briefcase },
  { name: "Telecom", icon: Smartphone },
];

const prompts: Record<string, string[]> = {
  Finance: [
    "Analyze this financial dataset and extract key insights.",
    "Summarize market trends for the last 24 hours.",
    "Generate a risk assessment for this investment.",
    "Explain this financial concept in simple terms.",
    "Create a quarterly financial forecast."
  ],

  Trading: [
    "Analyze this trading chart and identify key patterns and signals.",
    "Summarize today's market sentiment across major asset classes.",
    "Generate a risk‑managed trading plan based on this strategy.",
    "Explain this trading indicator in simple terms.",
    "Compare two assets and recommend a position with reasoning."
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

  Technology: [
    "Explain this technical concept simply.",
    "Generate documentation for this code snippet.",
    "Identify bugs or inefficiencies in this code.",
    "Create a system architecture summary.",
    "Convert this idea into a technical spec."
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

  Business: [
    "Turn this idea into a business plan outline.",
    "Generate a SWOT analysis for this company.",
    "Summarize this meeting into action items.",
    "Create a pitch deck outline.",
    "Write a professional email based on this context."
  ],

  Marketing: [
    "Generate 5 high‑converting marketing angles for this product.",
    "Rewrite this copy to be more persuasive and engaging.",
    "Analyze this campaign and summarize what worked and what didn’t.",
    "Create a complete marketing funnel for this offer.",
    "Turn this idea into a social media content calendar."
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

  Legal: [
    "Summarize this legal document into clear language.",
    "Identify risks or red flags in this contract.",
    "Rewrite this clause to be more enforceable.",
    "Generate a compliance checklist.",
    "Explain this legal concept simply."
  ],

  HR: [
    "Rewrite this job description to be more clear and attractive.",
    "Summarize this resume into strengths and concerns.",
    "Generate interview questions for this role.",
    "Create a performance review summary.",
    "Draft a professional HR email for this situation."
  ],

  Logistics: [
    "Analyze this logistics workflow and identify bottlenecks.",
    "Summarize shipping delays and propose solutions.",
    "Generate a warehouse optimization plan.",
    "Explain this supply chain issue simply.",
    "Create a logistics KPI report."
  ],

  "Supply Chain": [
    "Summarize this supply chain report into key insights.",
    "Identify risks or vulnerabilities in this supply chain.",
    "Generate a demand forecast based on this dataset.",
    "Explain this supply chain model simply.",
    "Propose improvements to reduce cost and increase efficiency."
  ],

  "Food & Hospitality": [
    "Write a compelling menu description for this dish.",
    "Summarize customer feedback and extract insights.",
    "Generate a hospitality training checklist.",
    "Create a marketing idea for this restaurant or hotel.",
    "Rewrite this review response professionally."
  ],

  Security: [
    "Analyze this security incident and summarize root causes.",
    "Generate a cybersecurity checklist for this system.",
    "Explain this vulnerability in simple terms.",
    "Create a risk assessment for this environment.",
    "Propose mitigation steps for this threat."
  ],

  Government: [
    "Summarize this policy document into key points.",
    "Explain this regulation in simple language.",
    "Generate a public‑facing announcement based on this info.",
    "Identify risks or gaps in this government plan.",
    "Rewrite this text for a general audience."
  ],

  "Non‑Profit": [
    "Write a compelling mission statement based on this idea.",
    "Summarize this impact report into key achievements.",
    "Generate fundraising messaging for this cause.",
    "Create a volunteer onboarding guide.",
    "Rewrite this story to be more emotionally engaging."
  ],

  Creative: [
    "Generate 5 creative concepts based on this idea.",
    "Rewrite this text in a more artistic tone.",
    "Create a moodboard description for this theme.",
    "Summarize this creative brief into key requirements.",
    "Turn this idea into a visual concept description."
  ],

  Consulting: [
    "Turn this problem into a structured consulting analysis.",
    "Generate a SWOT analysis for this business.",
    "Summarize this meeting into clear action items.",
    "Create a strategic roadmap for this project.",
    "Rewrite this recommendation more professionally."
  ],

  Telecom: [
    "Summarize this telecom report into key insights.",
    "Explain this network issue in simple terms.",
    "Generate a troubleshooting checklist.",
    "Compare two telecom solutions and recommend one.",
    "Create a customer‑friendly explanation of this service."
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
