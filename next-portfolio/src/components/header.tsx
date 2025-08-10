"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { db, storage } from "@/lib/firebase-client";
import { getDownloadURL, ref } from "firebase/storage";
import type { Profile } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, Phone, Calendar, MapPin, Github, Linkedin, Twitter, 
  ChevronDown, Menu, X, Home, User, FileText, Briefcase, MessageSquare
} from "lucide-react";
import Image from "next/image";

type NavItem = { 
  href: string; 
  label: string; 
  icon?: React.ComponentType<{ size?: number }>;
};

type NavVariant = 'bottom' | 'sidebar' | 'top';

interface NavbarProps {
  variant?: NavVariant;
  showProfile?: boolean;
}

export function Header({ variant = 'top', showProfile = false }: NavbarProps) {
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const items: NavItem[] = [
    { href: "/about", label: "About", icon: User },
    { href: "/resume", label: "Resume", icon: FileText },
    { href: "/portfolio", label: "Portfolio", icon: Briefcase },
    { href: "/contact", label: "Contact", icon: MessageSquare },
  ];

  const isActive = (href: string) => {
    if (pathname === "/" && href === "/about") return true;
    return pathname?.startsWith(href);
  };

  useEffect(() => {
    if (showProfile) {
      const q = query(collection(db, "profiles"), limit(1));
      const unsub = onSnapshot(q, async (snap) => {
        const doc = snap.docs[0];
        if (!doc) {
          setProfile(null);
          return;
        }
        const data = doc.data() as Profile;
        setProfile(data);
        if (data.avatar) {
          const url = await getDownloadURL(ref(storage, data.avatar));
          setAvatarUrl(url);
        } else {
          setAvatarUrl(undefined);
        }
      });
      return () => unsub();
    }
  }, [showProfile]);

  // Bottom Navigation Variant
  if (variant === 'bottom') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center space-x-8">
            {items.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "text-yellow-500 bg-gray-800"
                      : "text-gray-400 hover:text-yellow-500 hover:bg-gray-800"
                  }`}
                >
                  {IconComponent && <IconComponent size={20} />}
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }

  // Sidebar Navigation Variant
  if (variant === 'sidebar') {
    return (
      <>
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed top-0 left-0 h-full w-80 bg-gray-900 border-r border-gray-800 z-50
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full p-6">
            {/* Profile Section */}
            {showProfile && profile && (
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  {avatarUrl && (
                    <Image 
                      src={avatarUrl} 
                      alt={profile.name} 
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full border-2 border-yellow-500" 
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300 border-gray-600 text-sm">
                      {profile.title || "Technical Lead (Full Stack Development)"}
                    </Badge>
                  </div>
                </div>

                {/* Contact Information */}
                {profile.contacts && (
                  <div className="space-y-3 mb-6">
                    {profile.contacts.map((contact, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-300 text-sm">
                        {contact.icon === 'mail' && <Mail size={16} />}
                        {contact.icon === 'phone' && <Phone size={16} />}
                        {contact.icon === 'calendar' && <Calendar size={16} />}
                        {contact.icon === 'map-pin' && <MapPin size={16} />}
                        <span>{contact.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Social Links */}
                {profile.socials && (
                  <div className="flex gap-3 mb-6">
                    {profile.socials.map((social, index) => (
                      <Link
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-yellow-500 hover:bg-gray-700 transition-colors"
                      >
                        {social.icon === 'github' && <Github size={20} />}
                        {social.icon === 'linkedin' && <Linkedin size={20} />}
                        {social.icon === 'twitter' && <Twitter size={20} />}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1">
              <ul className="space-y-2">
                {items.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                          ${isActive(item.href)
                            ? "text-yellow-500 bg-gray-800 border-l-4 border-yellow-500"
                            : "text-gray-300 hover:text-yellow-500 hover:bg-gray-800"
                          }
                        `}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        {IconComponent && <IconComponent size={20} />}
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-sm text-center">
                © 2024 Shahrukh Mansuri
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Wrapper for Sidebar */}
        <div className={`
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'lg:ml-80' : 'lg:ml-80'}
        `}>
          {/* This will be handled by the layout */}
        </div>
      </>
    );
  }

  // Top Navigation Variant (Default)
  return (
    <header className="w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-gray-900/70">
      <nav className="mx-auto w-full px-4 sm:px-6 md:px-8 max-w-7xl h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl text-white">
          Portfolio
        </Link>
        
        <ul className="flex items-center gap-1 rounded-2xl border border-gray-700 bg-gray-800/70 px-2 py-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-colors rounded-lg
                  ${isActive(item.href)
                    ? "text-yellow-500 bg-gray-700"
                    : "text-gray-300 hover:text-yellow-500 hover:bg-gray-700"
                  }
                `}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

// Bottom Navigation Component (for use in specific pages)
export function BottomNavigation() {
  return <Header variant="bottom" />;
}

// Sidebar Navigation Component (for use in specific pages)
export function SidebarNavigation() {
  return <Header variant="sidebar" showProfile={true} />;
}


