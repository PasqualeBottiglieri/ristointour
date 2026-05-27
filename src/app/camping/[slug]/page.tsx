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
  let camping = await getListingBySlug(slug);
  if (!camping && isPreview) {
    const session = await getSession();
    if (session) camping = await getListingBySlugPreview(slug);
  }
  if (!camping) return { title: "Camping non trovato" };

  const title = camping.cuisine
    ? `${camping.name} - ${camping.cuisine}`
    : camping.name;
  const description = camping.philosophy?.slice(0, 160) ?? camping.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/camping/${camping.slug}`,
    },
    openGraph: {
      type: "website",
      url: `${BASE_URL}/camping/${camping.slug}`,
      title: `${camping.name} — ristointour.it`,
      description,
      images: camping.image
        ? [{ url: camping.image, width: 1200, height: 630, alt: camping.name, type: camping.image.endsWith(".png") ? "image/png" : "image/jpeg" }]
        : [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "ristointour.it", type: "image/jpeg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${camping.name} — ristointour.it`,
      description,
      images: camping.image
        ? [{ url: camping.image, alt: camping.name }]
        : [{ url: "/images/og-image.jpg", alt: "ristointour.it" }],
    },
  };
}

function buildCampingJsonLd(camping: {
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
}) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: camping.name,
    description: camping.description,
    image: camping.image,
    url: `https://www.ristointour.it/camping/${camping.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: camping.address ?? "",
      addressLocality: camping.location,
      addressRegion: "Campania",
      addressCountry: "IT",
    },
  };

  if (camping.phone) {
    jsonLd.telephone = camping.phone;
  }
  if (camping.website) {
    jsonLd.sameAs = [camping.website];
  }
  if (camping.priceRange) {
    jsonLd.priceRange = camping.priceRange;
  }
  if (camping.latitude && camping.longitude) {
    jsonLd.geo = {
      "@type": "GeoCoordinates",
      latitude: camping.latitude,
      longitude: camping.longitude,
    };
  }
  if (camping.rating && camping.reviewCount) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: camping.rating,
      bestRating: 5,
      reviewCount: camping.reviewCount,
    };
  }

  return jsonLd;
}

export default async function CampingDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "true";
  let camping = await getListingBySlug(slug);
  if (!camping && isPreview) {
    const session = await getSession();
    if (session) camping = await getListingBySlugPreview(slug);
  }

  if (!camping) notFound();

  const jsonLd = buildCampingJsonLd(camping);

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
          { name: "Camping e Villaggi", href: "/camping" },
          { name: camping.name, href: `/camping/${camping.slug}` },
        ]}
      />
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <RestaurantHero restaurant={camping} />
        <RestaurantInfoBar restaurant={camping} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-12">
            <RestaurantDescription restaurant={camping} />
            <RestaurantGallery restaurant={camping} />
            <RestaurantServices restaurant={camping} />
            <RestaurantReviews restaurant={camping} />
          </div>
          <aside className="lg:col-span-4 space-y-6">
            <RestaurantBooking restaurant={camping} />
          </aside>
        </div>

        <RestaurantSimilar currentSlug={camping.slug} category={camping.category} />
      </main>
      <Footer />
      <MobileBookingButton restaurant={camping} />
    </>
  );
}
