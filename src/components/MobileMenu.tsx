"use client";

import Link from "next/link";
import { navLinks } from "@/data/content";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <span className="text-xl font-black font-serif text-emerald-900">
            Ristointour
          </span>
          <button
            className="p-2 text-emerald-900 hover:text-orange-600 transition-colors"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.label}
                className={`py-3 px-4 text-sm uppercase tracking-widest font-bold rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-emerald-900 hover:bg-stone-100"
                }`}
                href={link.href}
                onClick={onClose}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
