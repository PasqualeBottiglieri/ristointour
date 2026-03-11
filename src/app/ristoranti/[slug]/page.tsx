import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getListingBySlug } from "@/lib/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RestaurantHero from "@/components/RestaurantHero";
import RestaurantInfoBar from "@/components/RestaurantInfoBar";
import RestaurantDescription from "@/components/RestaurantDescription";
import RestaurantGallery from "@/components/RestaurantGallery";
import RestaurantDishes from "@/components/RestaurantDishes";
import RestaurantServices from "@/components/RestaurantServices";
import RestaurantReviews from "@/components/RestaurantReviews";
import RestaurantBooking from "@/components/RestaurantBooking";
import RestaurantSimilar from "@/components/RestaurantSimilar";
import MobileBookingButton from "@/components/MobileBookingButton";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = await getListingBySlug(slug);
  if (!restaurant) return { title: "Ristorante non trovato | Ristointour" };

  return {
    title: `${restaurant.name} - ${restaurant.cuisine} | Ristointour`,
    description: restaurant.philosophy?.slice(0, 160) ?? restaurant.description,
  };
}

export default async function RestaurantPage({ params }: PageProps) {
  const { slug } = await params;
  const restaurant = await getListingBySlug(slug);

  if (!restaurant) notFound();

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <RestaurantHero restaurant={restaurant} />
        <RestaurantInfoBar restaurant={restaurant} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-12">
            <RestaurantDescription restaurant={restaurant} />
            <RestaurantGallery restaurant={restaurant} />
            <RestaurantDishes restaurant={restaurant} />
            <RestaurantServices restaurant={restaurant} />
            <RestaurantReviews restaurant={restaurant} />
          </div>
          <aside className="lg:col-span-4 space-y-6">
            <RestaurantBooking restaurant={restaurant} />
          </aside>
        </div>

        <RestaurantSimilar currentSlug={restaurant.slug} category={restaurant.category} />
      </main>
      <Footer />
      <MobileBookingButton restaurant={restaurant} />
    </>
  );
}
