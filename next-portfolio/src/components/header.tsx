"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

export function Header() {
  const pathname = usePathname();
  const items: NavItem[] = [
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (pathname === "/" && href === "/about") return true;
    return pathname?.startsWith(href);
  };

  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 overflow-x-hidden">
      <nav className="mx-auto w-full px-4 sm:px-6 md:px-8 max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">Portfolio</Link>
        <ul className="flex items-center gap-2 sm:gap-4 rounded-2xl border bg-secondary/70 px-2 py-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={
                  `relative px-3 py-2 text-sm transition-colors ` +
                  (isActive(item.href)
                    ? "text-primary after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-0.5 after:w-8 after:rounded after:bg-primary"
                    : "text-muted-foreground hover:text-foreground")
                }
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


