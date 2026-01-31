"use client";

import { useState } from "react";
import {
  Briefcase,
  Building2,
  Cpu,
  ShoppingCart,
  HeartPulse,
  GraduationCap,
  Plane,
  Factory,
  LineChart,
  Shield,
  Globe,
  BookOpen,
  FlaskConical,
  Coins,
  Truck,
  Smartphone,
  Film,
  Music,
  Palette,
  Dumbbell,
  Leaf,
  Hammer,
  Wrench,
  Sparkles,
} from "lucide-react";

const sectors = [
  { id: "business", name: "Business", icon: Briefcase },
  { id: "realestate", name: "Real Estate", icon: Building2 },
  { id: "technology", name: "Technology", icon: Cpu },
  { id: "ecommerce", name: "E‑Commerce", icon: ShoppingCart },
  { id: "healthcare", name: "Healthcare", icon: HeartPulse },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "travel", name: "Travel", icon: Plane },
  { id: "manufacturing", name: "Manufacturing", icon: Factory },
  { id: "trading", name: "Trading", icon: LineChart },
  { id: "security", name: "Security", icon: Shield },
  { id: "global", name: "Global Affairs", icon: Globe },
  { id: "writing", name: "Writing", icon: BookOpen },
  { id: "science", name: "Science", icon: FlaskConical },
  { id: "finance", name: "Finance", icon: Coins },
  { id: "logistics", name: "Logistics", icon: Truck },
  { id: "mobile", name: "Mobile Apps", icon: Smartphone },
  { id: "media", name: "Media", icon: Film },
  { id: "music", name: "Music", icon: Music },
  { id: "design", name: "Design", icon: Palette },
  { id: "fitness", name: "Fitness", icon: Dumbbell },
  { id: "environment", name: "Environment", icon: Leaf },
  { id: "construction", name: "Construction", icon: Hammer },
  { id: "engineering", name: "Engineering", icon: Wrench },
  { id: "ai", name: "AI & ML", icon: Sparkles },
];

const prompts: Record<string, string[]> = {
  business: [
    "Generate a business strategy for a startup in this sector.",
    "Create a SWOT analysis for a company in this industry.",
    "Write a pitch deck outline for a new product.",
    "Explain the biggest challenges in this sector.",
    "Generate 5 growth opportunities for a business here.",
  ],
  realestate: [
    "Write a property listing description for a luxury home.",
    "Generate a real estate investment analysis.",
    "Explain market trends for this region.",
    "Create a buyer persona for this property type.",
    "Write a persuasive ad for a rental property.",
  ],
  technology: [
    "Explain this technology in simple terms.",
    "Generate a system architecture for this idea.",
    "Write documentation for this feature.",
    "Suggest improvements to this tech product.",
    "Create a roadmap for a SaaS platform.",
  ],
  ecommerce: [
    "Write a high‑converting product description.",
    "Generate SEO keywords for an online store.",
    "Create a customer persona for this niche.",
    "Write an abandoned cart email.",
    "Suggest ways to increase store conversions.",
  ],
  healthcare: [
    "Explain this medical concept simply.",
    "Generate a patient‑friendly summary.",
    "Write a healthcare marketing message.",
    "List risks and benefits of this treatment.",
    "Create a wellness program outline.",
  ],
  education: [
    "Create a lesson plan for this topic.",
    "Explain this concept for beginners.",
    "Generate quiz questions for students.",
    "Write a course outline.",
    "Summarize this topic for revision.",
  ],
  travel: [
    "Create a travel itinerary for this destination.",
    "Write a hotel description.",
    "Suggest activities for travelers.",
    "Explain cultural tips for this region.",
    "Write a travel blog intro.",
  ],
  manufacturing: [
    "Explain this manufacturing process.",
    "Suggest efficiency improvements.",
    "Write a safety guideline summary.",
    "Generate a workflow diagram description.",
    "List common industry challenges.",
  ],
  trading: [
    "Explain this trading strategy.",
    "Summarize market trends.",
    "Generate a risk analysis.",
    "Write a trader’s checklist.",
    "Explain this chart pattern.",
  ],
  // All other sectors fallback
};

export default function SectorsPanel() {
  const [active, setActive] = useState<string | null>(null);

  const activePrompts = prompts[active ?? ""] ?? [
    "Generate insights for this sector.",
    "Explain key challenges in this industry.",
    "Write a summary of current trends.",
    "Create a business idea for this sector.",
    "List growth opportunities.",
  ];

  return (
    <div className="p-6 bg-slate-900 border border-sky-800 rounded-xl shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-cyan-300" size={22} />
        <h2 className="text-2xl font-bold text-cyan-300">Sectors</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {sectors.map((sector) => {
          const Icon = sector.icon;
          const isActive = active === sector.id;

          return (
            <div
              key={sector.id}
              onClick={() => setActive(sector.id)}
              className={`
                p-4 rounded-xl border cursor-pointer transition
                flex flex-col items-center gap-3 text-center
                ${
                  isActive
                    ? "bg-sky-700 border-sky-500 text-white"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                }
              `}
            >
              <Icon size={26} className="text-cyan-300" />
              <span className="text-sm font-medium">{sector.name}</span>
            </div>
          );
        })}
      </div>

      {/* Prompt Panel */}
      {active && (
        <div className="mt-6 p-5 rounded-xl bg-slate-800 border border-sky-700">
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">
            Prompts for {sectors.find((s) => s.id === active)?.name}
          </h3>

          <ul className="space-y-3">
            {activePrompts.map((p, i) => (
              <li
                key={i}
                className="p-3 bg-slate-900 border border-slate-700 rounded-md text-slate-200"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
