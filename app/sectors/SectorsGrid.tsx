"use client";

import { useRouter } from "next/navigation";
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

// Same sectors list (without Mobile Apps)
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

export default function SectorsGrid({ context }: { context: string }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
      {sectors.map((sector) => {
        const Icon = sector.icon;

        return (
          <div
            key={sector.id}
            onClick={() =>
              router.push(`/sectors/${sector.id}?context=${context}`)
            }
            className="
              p-4 rounded-xl border cursor-pointer transition
              flex flex-col items-center gap-3 text-center
              bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700
            "
          >
            <Icon size={26} className="text-cyan-300" />
            <span className="text-sm font-medium">{sector.name}</span>
          </div>
        );
      })}
    </div>
  );
}
