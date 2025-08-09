import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { ResponsiveContainer } from "@/components/layout/responsive-container";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header />
        <ResponsiveContainer>
          {children}
        </ResponsiveContainer>
      </body>
    </html>
  );
}
