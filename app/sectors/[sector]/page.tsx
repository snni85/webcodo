"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";
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
};

export default function SectorPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector: sectorId } = use(params); // ⭐ FIX: unwrap params
  const searchParams = useSearchParams();
  const context = searchParams.get("context") || "default";

  const sector = sectors.find((s) => s.id === sectorId);

  if (!sector) {
    return (
      <div className="p-6 text-red-400">
        Invalid sector: {sectorId}
      </div>
    );
  }

  const Icon = sector.icon;
  const sectorPrompts = prompts[sector.id] ?? [
    "Generate insights for this sector.",
    "Explain key challenges in this industry.",
    "Write a summary of current trends.",
    "Create a business idea for this sector.",
    "List growth opportunities.",
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon size={32} className="text-cyan-300" />
        <h1 className="text-3xl font-bold text-cyan-300">
          {sector.name}
          {context === "build-website" && " — Website Tools"}
          {context === "design-mobile-app" && " — Mobile App Tools"}
        </h1>
      </div>

      <ul className="space-y-3">
        {sectorPrompts.map((p, i) => (
          <li
            key={i}
            className="p-3 bg-slate-900 border border-slate-700 rounded-md text-slate-200"
          >
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
