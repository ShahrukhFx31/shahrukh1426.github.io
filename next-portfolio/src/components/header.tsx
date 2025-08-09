import Link from "next/link";

export function Header() {
  return (
    <header className="w-full border-b bg-white">
      <nav className="container mx-auto max-w-5xl px-4 h-14 flex items-center gap-6">
        <Link href="/" className="font-semibold">Portfolio</Link>
        <ul className="flex items-center gap-4 text-sm text-gray-600">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/resume">Resume</Link></li>
          <li><Link href="/portfolio">Portfolio</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}


