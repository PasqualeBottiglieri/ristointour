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

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) return { title: "Artista non trovato | Ristointour" };

  return {
    title: `${artist.name} - ${parseGenres(artist.genre).join(", ")} | Ristointour`,
    description: artist.shortDescription,
  };
}

export default async function ArtistPage({ params }: PageProps) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) notFound();

  return (
    <>
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
