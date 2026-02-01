export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} WebCodo. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <a href="/pricing" className="hover:text-slate-300">Pricing</a>
          <a href="/faqs" className="hover:text-slate-300">FAQs</a>
          <a href="/contact" className="hover:text-slate-300">Contact</a>
        </div>
      </div>
    </footer>
  );
}
