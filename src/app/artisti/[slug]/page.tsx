import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { artists } from "@/data/artists";
import { detailPageEntries } from "@/data/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtistHero from "@/components/ArtistHero";
import ArtistBio from "@/components/ArtistBio";
import ArtistGallery from "@/components/ArtistGallery";
import ArtistVideos from "@/components/ArtistVideos";
import ArtistSocials from "@/components/ArtistSocials";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return detailPageEntries(artists).map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug && a.hasDetailPage);
  if (!artist) return { title: "Artista non trovato | Ristointour" };

  return {
    title: `${artist.name} - ${artist.genre} | Ristointour`,
    description: artist.shortDescription,
  };
}

export default async function ArtistPage({ params }: PageProps) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug && a.hasDetailPage);

  if (!artist) notFound();

  return (
    <>
      <Header />
      <ArtistHero artist={artist} />
      <ArtistBio artist={artist} />
      <ArtistGallery artist={artist} />
      <ArtistVideos artist={artist} />
      <ArtistSocials artist={artist} />
      <Footer />
    </>
  );
}
