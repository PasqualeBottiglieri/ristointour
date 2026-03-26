import type { Metadata } from "next";
import { ogMeta } from "@/lib/metadata";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import Experiences from "@/components/Experiences";
import FeaturedArtists from "@/components/FeaturedArtists";
import BasicBusinessesSection from "@/components/BasicBusinessesSection";
import Territories from "@/components/Territories";
import MapSection from "@/components/MapSection";
import HomepagePartners from "@/components/HomepagePartners";
import Footer from "@/components/Footer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Ristointour | Ristoranti, Agriturismi e Caseifici nella Piana del Sele",
  description:
    "Scopri i migliori ristoranti, agriturismi, caseifici e pizzerie nella Piana del Sele. Guida gastronomica a Battipaglia, Eboli, Paestum e Capaccio.",
  alternates: {
    canonical: "https://www.ristointour.it",
  },
  ...ogMeta("ristointour.it — Scopri le eccellenze della Piana del Sele"),
};

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <CategoryGrid />
      <FeaturedRestaurants />
      <Experiences />
      <FeaturedArtists />
      <BasicBusinessesSection />
      <Territories />
      <MapSection />
      <HomepagePartners />
      <Footer />
    </>
  );
}
