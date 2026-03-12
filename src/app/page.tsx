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

export const dynamic = "force-dynamic";

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
