import SectorsGrid from "../SectorsGrid";

export default function DesignMobileAppPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-cyan-300 mb-6">
        Design a Mobile App
      </h1>

      <p className="text-slate-400 mb-6">
        Choose an industry to generate mobile‑app‑specific prompts and tools.
      </p>

      <SectorsGrid context="design-mobile-app" />
    </div>
  );
}
