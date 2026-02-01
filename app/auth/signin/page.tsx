"use client";

import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto mt-32 p-8 bg-slate-900 border border-slate-800 rounded-xl">
      <h1 className="text-3xl font-bold text-cyan-300 mb-6 text-center">
        Sign In
      </h1>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-slate-200"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-slate-200"
        />

        <button
          type="submit"
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-md text-white font-semibold"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-slate-400 mt-4">
        Don’t have an account?{" "}
        <Link href="/auth/signup" className="text-cyan-400 hover:text-cyan-300">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
