"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/data/content";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 glass-nav border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Left Sponsor */}
            <div className="flex items-center w-20 sm:w-28 lg:w-32">
              <a href="https://www.facebook.com/profile.php?id=100010963008639" title="Hokelsoul Spettacoli" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/img/hokelsoul.webp"
                  alt="Hokelsoul Spettacoli"
                  width={120}
                  height={61}
                  className="h-7 sm:h-8 lg:h-10 w-auto object-contain hover:opacity-80 transition-opacity"
                />
              </a>
            </div>

            {/* Center Logo */}
            <div className="flex flex-col items-center">
              <Link
                className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-900 font-serif"
                href="/"
              >
                Ristointour
              </Link>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-orange-600 font-bold">
                Piana del Sele
              </span>
            </div>

            {/* Right */}
            <div className="flex items-center justify-end gap-2 sm:gap-4 lg:gap-6 w-20 sm:w-28 lg:w-32">
              <a href="https://www.radiocitta105.it/" title="Radio Città 105" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/img/radio_105.webp"
                  alt="Radio Città 105"
                  width={60}
                  height={57}
                  className="h-7 sm:h-8 lg:h-10 w-auto object-contain hover:opacity-80 transition-opacity"
                />
              </a>
              <button
                className="lg:hidden p-1.5 sm:p-2 text-emerald-900"
                onClick={() => setMenuOpen(true)}
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex justify-center items-center gap-8 pb-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  className={`text-xs uppercase tracking-widest font-bold hover:text-orange-600 transition-colors border-b-2 ${
                    isActive
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent"
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
