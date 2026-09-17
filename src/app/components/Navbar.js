"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Layanan", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Proses", href: "/#process" },
  { label: "Stack", href: "/#stack" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#social" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur border-b border-[#2a2a2a]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Navigasi utama"
        className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-6 md:px-12 py-4"
      >
        <Link href="/" className="font-bold text-[#f5f5f5] tracking-tight shrink-0">
          naufal<span className="text-[#4a9eff]">.</span>
        </Link>
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto text-sm">
          {links.map((link) =>
            link.label === "Resume" ? (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] text-[#f5f5f5] hover:border-[#4a9eff]/60 hover:bg-[#242424] transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 rounded-lg text-[#a0a0a0] hover:text-[#f5f5f5] hover:bg-[#1a1a1a] transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
}
