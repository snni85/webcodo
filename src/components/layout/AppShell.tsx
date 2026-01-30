import Navbar from "./Navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
