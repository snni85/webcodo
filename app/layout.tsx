import Sidebar from "@/components/Sidebar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-10 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
