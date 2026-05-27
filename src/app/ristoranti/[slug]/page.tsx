import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getListingBySlug, getListingBySlugPreview } from "@/lib/queries";
import { getSession } from "@/lib/auth";
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
import Breadcrumb from "@/components/Breadcrumb";

const BASE_URL = "https://www.ristointour.it";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "true";
  let restaurant = await getListingBySlug(slug);
  if (!restaurant && isPreview) {
    const session = await getSession();
    if (session) restaurant = await getListingBySlugPreview(slug);
  }
  if (!restaurant) return { title: "Ristorante non trovato" };

  const title = restaurant.cuisine
    ? `${restaurant.name} - ${restaurant.cuisine}`
    : restaurant.name;
  const description = restaurant.philosophy?.slice(0, 160) ?? restaurant.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/ristoranti/${restaurant.slug}`,
    },
    openGraph: {
      type: "website",
      url: `${BASE_URL}/ristoranti/${restaurant.slug}`,
      title: `${restaurant.name} — ristointour.it`,
      description,
      images: restaurant.image
        ? [{ url: restaurant.image, width: 1200, height: 630, alt: restaurant.name, type: restaurant.image.endsWith(".png") ? "image/png" : "image/jpeg" }]
        : [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "ristointour.it", type: "image/jpeg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${restaurant.name} — ristointour.it`,
      description,
      images: restaurant.image
        ? [{ url: restaurant.image, alt: restaurant.name }]
        : [{ url: "/images/og-image.jpg", alt: "ristointour.it" }],
    },
  };
}

function buildRestaurantJsonLd(restaurant: {
  name: string;
  slug: string;
  description: string;
  cuisine: string | null;
  image: string;
  address: string | null;
  location: string;
  phone: string | null;
  website: string | null;
  priceRange: string | null;
  rating: number | null;
  reviewCount: number | null;
  latitude: number | null;
  longitude: number | null;
  hours: unknown;
}) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    description: restaurant.description,
    image: restaurant.image,
    url: `https://www.ristointour.it/ristoranti/${restaurant.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address ?? "",
      addressLocality: restaurant.location,
      addressRegion: "Campania",
      addressCountry: "IT",
    },
  };

  if (restaurant.cuisine) {
    jsonLd.servesCuisine = restaurant.cuisine;
  }
  if (restaurant.phone) {
    jsonLd.telephone = restaurant.phone;
  }
  if (restaurant.website) {
    jsonLd.sameAs = [restaurant.website];
  }
  if (restaurant.priceRange) {
    jsonLd.priceRange = restaurant.priceRange;
  }
  if (restaurant.latitude && restaurant.longitude) {
    jsonLd.geo = {
      "@type": "GeoCoordinates",
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
    };
  }
  if (restaurant.rating && restaurant.reviewCount) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: restaurant.rating,
      bestRating: 5,
      reviewCount: restaurant.reviewCount,
    };
  }

  return jsonLd;
}

export default async function RestaurantPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "true";
  let restaurant = await getListingBySlug(slug);
  if (!restaurant && isPreview) {
    const session = await getSession();
    if (session) restaurant = await getListingBySlugPreview(slug);
  }

  if (!restaurant) notFound();

  const jsonLd = buildRestaurantJsonLd(restaurant);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Ristoranti", href: "/ristoranti" },
          { name: restaurant.name, href: `/ristoranti/${restaurant.slug}` },
        ]}
      />
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
