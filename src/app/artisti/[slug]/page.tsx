import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtistBySlug } from "@/lib/queries";
import { parseGenres } from "@/lib/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtistHero from "@/components/ArtistHero";
import ArtistBio from "@/components/ArtistBio";
import ArtistGalleryCarousel from "@/components/ArtistGalleryCarousel";
import ArtistVideoCarousel from "@/components/ArtistVideoCarousel";
import ArtistSocials from "@/components/ArtistSocials";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) return { title: "Artista non trovato" };

  return {
    title: `${artist.name} - ${parseGenres(artist.genre).join(", ")}`,
    description: artist.shortDescription,
  };
}

export default async function ArtistPage({ params }: PageProps) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Artisti", href: "/artisti" },
          { name: artist.name, href: `/artisti/${artist.slug}` },
        ]}
      />
      <Header />
      <ArtistHero artist={artist} />
      <ArtistBio artist={artist} />
      <ArtistGalleryCarousel artist={artist} />
      <ArtistVideoCarousel artist={artist} />
      <ArtistSocials artist={artist} />
      <Footer />
    </>
  );
}
