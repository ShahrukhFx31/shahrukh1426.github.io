import type { Metadata } from "next";
import "./globals.css";
import { ResponsiveContainer } from "@/components/layout/responsive-container";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-screen antialiased`}> 
        {children}
      </body>
    </html>
  );
}
