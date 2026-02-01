"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      window.location.href = "/auth/verify-email";
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-32 p-8 bg-slate-900 border border-slate-800 rounded-xl">
      <h1 className="text-3xl font-bold text-cyan-300 mb-6 text-center">
        Create Account
      </h1>

      <form className="space-y-4" onSubmit={handleSignup}>

        {/* FULL NAME */}
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-slate-200"
        />

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-slate-200"
        />

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-slate-200"
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-md text-white font-semibold"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-slate-400 mt-4">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-cyan-400 hover:text-cyan-300">
          Sign In
        </Link>
      </p>
    </div>
  );
}
