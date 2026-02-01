"use client";

import { useState } from "react";

export default function VerifyPhonePage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    setLoading(true);

    const res = await fetch("/api/auth/verify-phone", {
      method: "POST",
      body: JSON.stringify({ otp }),
    });

    const result = await res.json();

    if (result.success) {
      window.location.href = "/workspace";
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-32 p-8 bg-slate-900 border border-slate-800 rounded-xl text-center">
      <h1 className="text-3xl font-bold text-cyan-300 mb-6">Verify Phone</h1>

      <p className="text-slate-400 mb-4">
        Enter the OTP sent to your phone.
      </p>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-center text-xl tracking-widest text-slate-200"
      />

      <button
        onClick={verify}
        className="mt-6 w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-md text-white font-semibold"
      >
        {loading ? "Verifying..." : "Verify Phone"}
      </button>
    </div>
  );
}
