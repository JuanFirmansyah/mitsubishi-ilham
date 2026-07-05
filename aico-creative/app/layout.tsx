// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Cursor from "@/components/ui/Cursor";
import Social from "@/components/ui/Social";
import Aside from "@/components/ui/Aside";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://aicocreative.com"),
  title: {
    default: "AICO Creative",
    template: "%s | AICO Creative",
  },
  description: "Creative portfolio showcasing innovative projects and design work",
  authors: [{ name: "AICO Creative" }],
  keywords: ["portfolio", "creative", "design", "projects", "AICO"],
  openGraph: {
    title: "AICO Creative",
    description: "Creative portfolio showcasing innovative projects",
    url: "https://aicocreative.com",
    siteName: "AICO Creative",
    images: [
      {
        url: "/logo-aico.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AICO Creative",
    description: "Creative portfolio showcasing innovative projects",
    images: ["/logo-aico.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white"> {/* ← KEMBALIKAN INI */}
        <Cursor />
        <Navbar />
        <div className="flex min-h-screen">
          <Aside />
          <main className="flex-1 md:ml-72">
            {children}
          </main>
        </div>
        <Social />
      </body>
    </html>
  );
}