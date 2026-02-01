"use client";

import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto mt-32 px-6">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-cyan-300 mb-4">
          Pricing
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Choose the plan that fits your workflow. WebCodo gives you powerful AI tools,
          intelligent agents, and a premium developer workspace.
        </p>
      </div>

      {/* EARLY ACCESS BANNER */}
      <div className="mb-16 p-6 bg-slate-900 border border-slate-800 rounded-xl text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          🎉 Early Access Offer — First 10 Users
        </h2>
        <p className="text-slate-300">
          The first <span className="text-cyan-400 font-semibold">10 users</span> get
          <span className="text-white font-semibold"> full Workspace access</span> to build
          a complete website for **free**.
        </p>
        <p className="text-slate-400 mt-2">
          Ask‑Anything mode is free forever for everyone.
        </p>
      </div>

      {/* PRICING GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* USER PLAN */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-xl">
          <h3 className="text-3xl font-bold text-white mb-4">User</h3>
          <p className="text-slate-400 mb-6">
            Perfect for individuals who want AI help, ask questions, and explore ideas.
          </p>

          <div className="text-5xl font-extrabold text-cyan-300 mb-6">
            $9<span className="text-xl text-slate-400">/month</span>
          </div>

          <ul className="space-y-3 text-slate-300 mb-8">
            <li>✔ Ask‑Anything mode (free forever)</li>
            <li>✔ AI explanations & debugging help</li>
            <li>✔ Access to Prompt Library</li>
            <li>✔ Access to Sectors Intelligence</li>
            <li>✖ Website Builder</li>
            <li>✖ Mobile App Builder</li>
          </ul>

          <Link
            href="/auth/signup"
            className="block text-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-semibold"
          >
            Get Started
          </Link>
        </div>

        {/* DEVELOPER PLAN */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-xl">
          <h3 className="text-3xl font-bold text-white mb-4">Developer</h3>
          <p className="text-slate-400 mb-6">
            For builders who want to create full websites, apps, and advanced workflows.
          </p>

          <div className="text-5xl font-extrabold text-cyan-300 mb-6">
            $29<span className="text-xl text-slate-400">/month</span>
          </div>

          <ul className="space-y-3 text-slate-300 mb-8">
            <li>✔ Ask‑Anything mode (free forever)</li>
            <li>✔ Full Workspace access</li>
            <li>✔ Website Builder</li>
            <li>✔ Mobile App Builder</li>
            <li>✔ Multi‑agent workflows</li>
            <li>✔ AI streaming & patch system</li>
            <li>✔ Priority support</li>
          </ul>

          <Link
            href="/auth/signup"
            className="block text-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-semibold"
          >
            Start Building
          </Link>
        </div>

      </div>

      {/* FOOTNOTE */}
      <p className="text-center text-slate-500 mt-16">
        Ask‑Anything mode remains free forever. Website & app building require a Developer plan,
        except for the first 10 early users.
      </p>
    </div>
  );
}
