"use client";

export default function FAQsPage() {
  const faqs = [
    {
      q: "What is WebCodo?",
      a: "WebCodo is an AI‑native developer workspace designed to help you build, debug, design, and ship faster.",
    },
    {
      q: "Is WebCodo free?",
      a: "You can start for free. Premium features will be available soon.",
    },
    {
      q: "Do I need coding experience?",
      a: "No. WebCodo helps beginners and professionals with intelligent tools and guided workflows.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-32 p-8">
      <h1 className="text-4xl font-bold text-cyan-300 mb-8">FAQs</h1>

      <div className="space-y-6">
        {faqs.map((item, i) => (
          <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-2">{item.q}</h3>
            <p className="text-slate-400">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
