"use client";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto mt-32 p-8">
      <h1 className="text-4xl font-bold text-cyan-300 mb-6">Contact Us</h1>

      <p className="text-slate-400 mb-8">
        Have questions, feedback, or partnership ideas? We’d love to hear from you.
      </p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-md text-slate-200"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-md text-slate-200"
        />

        <textarea
          placeholder="Your Message"
          className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-md text-slate-200 h-40"
        />

        <button
          type="submit"
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-md text-white"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
