import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex bg-slate-950 text-slate-200">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
