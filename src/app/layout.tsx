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
  title: "Ristointour | Eccellenze Gastronomiche della Piana del Sele",
  description:
    "Esplora i migliori ristoranti, agriturismi ed esperienze gastronomiche autentiche in Campania.",
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
