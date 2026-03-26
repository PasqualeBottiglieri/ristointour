import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
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
  metadataBase: new URL("https://www.ristointour.it"),
  title: {
    default: "Ristointour | Eccellenze Gastronomiche della Piana del Sele",
    template: "%s | Ristointour",
  },
  description:
    "Esplora i migliori ristoranti, agriturismi ed esperienze gastronomiche autentiche in Campania.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "ristointour.it",
    title: "ristointour.it — Scopri le eccellenze della Piana del Sele",
    description:
      "Il portale dedicato alla scoperta di ristoranti, agriturismi, caseifici ed esperienze enogastronomiche nella Piana del Sele e nel territorio salernitano.",
    url: "https://www.ristointour.it",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ristointour.it — Ristoranti, Agriturismi, Caseifici ed Esperienze nella Piana del Sele",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ristointour.it — Scopri le eccellenze della Piana del Sele",
    description:
      "Il portale dedicato alla scoperta di ristoranti, agriturismi, caseifici ed esperienze enogastronomiche nella Piana del Sele e nel territorio salernitano.",
    images: [
      {
        url: "/images/og-image.jpg",
        alt: "ristointour.it — Ristoranti, Agriturismi, Caseifici ed Esperienze nella Piana del Sele",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: {
    google: "aQWcgswcyegjvIJ7ligfh76Lf_ZaqAjjfcPFGxegZRk",
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
        <link rel="manifest" href="/site.webmanifest" />
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
              url: "https://www.ristointour.it",
              logo: "https://www.ristointour.it/android-chrome-512x512.png",
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
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}
