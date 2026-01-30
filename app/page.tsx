"use client";

import WorkspaceSection from "./components/WorkspaceSection";
import PromptLibrarySection from "./components/PromptLibrarySection";
import SectorsSection from "./components/SectorsSection";

export default function Page() {
  return (
    <main className="pt-40 px-6 text-slate-200">
      <h1 className="text-5xl font-bold text-center mb-20">
        WebCodo Dashboard
      </h1>

      {/* Workspace */}
      <WorkspaceSection />

      {/* Prompt Library */}
      <PromptLibrarySection />

      {/* Sectors */}
      <SectorsSection />
    </main>
  );
}
