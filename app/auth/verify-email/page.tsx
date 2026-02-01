"use client";

import { useState } from "react";

export default function VerifyEmailPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    setLoading(true);

    const res = await fetch("/api/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ code }),
    });

    const result = await res.json();

    if (result.success) {
      window.location.href = "/auth/verify-phone";
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-32 p-8 bg-slate-900 border border-slate-800 rounded-xl text-center">
      <h1 className="text-3xl font-bold text-cyan-300 mb-6">Verify Email</h1>

      <p className="text-slate-400 mb-4">
        Enter the 6‑digit code sent to your email.
      </p>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        maxLength={6}
        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-center text-xl tracking-widest text-slate-200"
      />

      <button
        onClick={verify}
        className="mt-6 w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-md text-white font-semibold"
      >
        {loading ? "Verifying..." : "Verify Email"}
      </button>
    </div>
  );
}
