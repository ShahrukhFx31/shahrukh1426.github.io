"use client";
import { useState } from "react";
import { SidebarNavigation } from "@/components/header";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      <SidebarNavigation />
      <main className={`
        transition-all duration-300 ease-in-out
        lg:ml-80
      `}>
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
