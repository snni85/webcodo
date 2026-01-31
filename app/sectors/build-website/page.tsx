import SectorsGrid from "../SectorsGrid";

export default function BuildWebsitePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-cyan-300 mb-6">
        Build a Website
      </h1>

      <p className="text-slate-400 mb-6">
        Choose an industry to generate website‑specific prompts and tools.
      </p>

      <SectorsGrid context="build-website" />
    </div>
  );
}
