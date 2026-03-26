"use client";

import Link from "next/link";

const quickLinks = [
  { icon: "home", label: "Homepage", href: "/" },
  { icon: "restaurant", label: "Ristoranti", href: "/ristoranti" },
  { icon: "agriculture", label: "Agriturismi", href: "/agriturismi" },
  { icon: "flatware", label: "Caseifici", href: "/caseifici" },
  { icon: "explore", label: "Esperienze", href: "/esperienze" },
  { icon: "map", label: "Territori", href: "/territori" },
];

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-stone-50 flex flex-col" role="alert">
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-black tracking-tight text-emerald-900 font-serif inline-block mb-12"
          >
            Ristointour
          </Link>

          {/* Icon */}
          <div className="mb-8">
            <span className="material-symbols-outlined text-[120px] text-primary opacity-80">
              error_outline
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-emerald-900 font-serif mb-4">
            Qualcosa non ha funzionato
          </h1>
          <p className="text-stone-500 font-display mb-12 max-w-md mx-auto leading-relaxed">
            Si è verificato un errore imprevisto. Riprova o torna alla homepage
            per continuare a esplorare le eccellenze del territorio.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold font-display hover:bg-orange-600 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">refresh</span>
              Riprova
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-emerald-900 text-white px-8 py-3 rounded-full font-bold font-display hover:bg-emerald-800 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">home</span>
              Torna alla Homepage
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-orange-600 font-display mb-6">
              Oppure esplora
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all"
                >
                  <span className="material-symbols-outlined text-2xl text-emerald-900 group-hover:text-primary transition-colors">
                    {link.icon}
                  </span>
                  <span className="text-xs font-bold text-stone-500 group-hover:text-emerald-900 font-display transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
