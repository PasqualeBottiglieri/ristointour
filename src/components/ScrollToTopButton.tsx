"use client";

import { useState, useEffect, useCallback } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Torna su"
      className={`
        fixed bottom-6 right-6 z-40
        size-12 rounded-full
        bg-emerald-900/90 backdrop-blur-md
        border border-white/10
        text-white
        shadow-lg shadow-emerald-950/25
        flex items-center justify-center
        transition-all duration-500 ease-out
        hover:bg-emerald-950 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-950/30
        active:scale-95
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
        sm:bottom-8 sm:right-8
        ${visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
        }
      `}
    >
      <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:-translate-y-0.5">
        keyboard_arrow_up
      </span>
    </button>
  );
}
