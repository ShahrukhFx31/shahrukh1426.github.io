"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";

interface UnifiedLayoutProps {
  children: React.ReactNode;
  showProfile?: boolean;
}

export function UnifiedLayout({ children, showProfile = false }: UnifiedLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header variant="responsive" showProfile={showProfile} />
      
      <main className={`
        transition-all duration-300 ease-in-out
        ${isMobile ? 'pb-20' : 'lg:ml-80'}
      `}>
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
