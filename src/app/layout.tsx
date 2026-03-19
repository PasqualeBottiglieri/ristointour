import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ristointour.com"),
  title: {
    default: "Ristointour | Eccellenze Gastronomiche della Piana del Sele",
    template: "%s | Ristointour",
  },
  description:
    "Esplora i migliori ristoranti, agriturismi ed esperienze gastronomiche autentiche in Campania.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Ristointour",
    title: "Ristointour | Eccellenze Gastronomiche della Piana del Sele",
    description:
      "Scopri i migliori ristoranti, agriturismi, caseifici e pizzerie nella Piana del Sele. Guida gastronomica a Battipaglia, Eboli, Paestum e Capaccio.",
    url: "https://www.ristointour.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ristointour | Eccellenze Gastronomiche della Piana del Sele",
    description:
      "Scopri i migliori ristoranti, agriturismi, caseifici e pizzerie nella Piana del Sele.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ristointour",
              url: "https://www.ristointour.com",
              description:
                "Guida ai migliori ristoranti, agriturismi, caseifici ed esperienze gastronomiche nella Piana del Sele, Campania.",
              areaServed: {
                "@type": "Place",
                name: "Piana del Sele, Campania, Italia",
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} bg-stone-50 text-emerald-900 selection:bg-primary/30`}
      >
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
