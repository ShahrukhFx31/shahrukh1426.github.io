import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { ResponsiveContainer } from "@/components/layout/responsive-container";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black antialiased">
        <Header />
        <ResponsiveContainer>
          {children}
        </ResponsiveContainer>
      </body>
    </html>
  );
}
