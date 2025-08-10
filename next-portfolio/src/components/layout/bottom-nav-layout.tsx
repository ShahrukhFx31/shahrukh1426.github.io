"use client";
import { BottomNavigation } from "@/components/header";

interface BottomNavLayoutProps {
  children: React.ReactNode;
}

export function BottomNavLayout({ children }: BottomNavLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      <main className="p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}
