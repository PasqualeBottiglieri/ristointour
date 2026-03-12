import { prisma } from "./prisma";
import type { Listing, Artist, Sponsor } from "@/generated/prisma/client";
import { parseGenres } from "./types";

// ── Listing queries ─────────────────────────────────────────────────

export async function getPublishedListings(
  categories?: string[]
): Promise<Listing[]> {
  return prisma.listing.findMany({
    where: {
      status: "published",
      ...(categories ? { category: { in: categories } } : {}),
    },
    orderBy: { displayPriority: "asc" },
  });
}

export async function getFeaturedListings(): Promise<Listing[]> {
  return prisma.listing.findMany({
    where: {
      status: "published",
      planType: "premium",
      showOnHomepage: true,
    },
    orderBy: { displayPriority: "asc" },
  });
}

export async function getBasicHomepageListings(): Promise<Listing[]> {
  return prisma.listing.findMany({
    where: {
      status: "published",
      planType: "basic",
      showOnHomepage: true,
    },
    orderBy: { displayPriority: "asc" },
  });
}

export async function getListingBySlug(
  slug: string
): Promise<Listing | null> {
  return prisma.listing.findFirst({
    where: { slug, status: "published", hasDetailPage: true },
  });
}

export async function getDetailPageSlugs(): Promise<string[]> {
  const listings = await prisma.listing.findMany({
    where: { status: "published", hasDetailPage: true },
    select: { slug: true },
  });
  return listings.map((l) => l.slug);
}

export async function getSimilarListings(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<Listing[]> {
  return prisma.listing.findMany({
    where: {
      status: "published",
      hasDetailPage: true,
      slug: { not: currentSlug },
      category,
    },
    orderBy: { displayPriority: "asc" },
    take: limit,
  });
}

// ── Artist queries ──────────────────────────────────────────────────

export async function getPublishedArtists(): Promise<Artist[]> {
  return prisma.artist.findMany({
    where: { status: "published" },
    orderBy: { displayPriority: "asc" },
  });
}

export async function getFeaturedArtists(): Promise<Artist[]> {
  return prisma.artist.findMany({
    where: {
      status: "published",
      planType: "premium",
      featured: true,
      showOnHomepage: true,
    },
    orderBy: { displayPriority: "asc" },
    take: 4,
  });
}

export async function getArtistsByLocation(
  location: string,
  limit = 3
): Promise<Artist[]> {
  return prisma.artist.findMany({
    where: {
      status: "published",
      location,
      hasDetailPage: true,
    },
    orderBy: { displayPriority: "asc" },
    take: limit,
  });
}

export async function getBasicHomepageArtists(): Promise<Artist[]> {
  return prisma.artist.findMany({
    where: {
      status: "published",
      planType: "basic",
      showOnHomepage: true,
    },
    orderBy: { displayPriority: "asc" },
  });
}

export async function getArtistBySlug(
  slug: string
): Promise<Artist | null> {
  return prisma.artist.findFirst({
    where: { slug, status: "published", hasDetailPage: true },
  });
}

export async function getArtistDetailSlugs(): Promise<string[]> {
  const artists = await prisma.artist.findMany({
    where: { status: "published", hasDetailPage: true },
    select: { slug: true },
  });
  return artists.map((a) => a.slug);
}

// ── Artist filter options ───────────────────────────────────────────

const DEFAULT_GENRES = [
  "Jazz & Soul",
  "Musica Napoletana",
  "Pop & Rock",
  "DJ Set",
  "Musica Classica",
  "Folk & Tradizionale",
];

const DEFAULT_LOCATIONS = [
  "Paestum",
  "Eboli",
  "Battipaglia",
  "Salerno",
  "Capaccio",
  "Agropoli",
];

const DEFAULT_EVENT_TYPES = [
  "Matrimoni",
  "Cene Private",
  "Feste Aziendali",
  "Aperitivi",
  "Eventi all'Aperto",
  "Sagre & Festival",
];

export interface ArtistFilterOptions {
  genres: string[];
  locations: string[];
  eventTypes: string[];
}

/** Extract unique genres/locations/eventTypes, merged with defaults */
export function extractArtistFilterOptions(
  artists: Pick<Artist, "genre" | "location" | "eventTypes">[]
): ArtistFilterOptions {
  const genres = new Set<string>(DEFAULT_GENRES);
  const locations = new Set<string>(DEFAULT_LOCATIONS);
  const eventTypes = new Set<string>(DEFAULT_EVENT_TYPES);

  for (const a of artists) {
    for (const g of parseGenres(a.genre)) genres.add(g);
    if (a.location) locations.add(a.location);
    if (Array.isArray(a.eventTypes)) {
      for (const et of a.eventTypes as string[]) {
        eventTypes.add(et);
      }
    }
  }

  return {
    genres: [...genres].sort(),
    locations: [...locations].sort(),
    eventTypes: [...eventTypes].sort(),
  };
}

/** Distinct filter options from ALL artists (for admin suggestions) */
export async function getAllArtistFilterOptions(): Promise<ArtistFilterOptions> {
  const artists = await prisma.artist.findMany({
    select: { genre: true, location: true, eventTypes: true },
  });
  return extractArtistFilterOptions(artists);
}

// ── Admin queries ───────────────────────────────────────────────────

export async function getAllListings(): Promise<Listing[]> {
  return prisma.listing.findMany({
    orderBy: [{ status: "asc" }, { displayPriority: "asc" }],
  });
}

export async function getListingById(id: string): Promise<Listing | null> {
  return prisma.listing.findUnique({ where: { id } });
}

export async function getAllArtists(): Promise<Artist[]> {
  return prisma.artist.findMany({
    orderBy: [{ status: "asc" }, { displayPriority: "asc" }],
  });
}

export async function getArtistById(id: string): Promise<Artist | null> {
  return prisma.artist.findUnique({ where: { id } });
}

// ── Sponsor queries ─────────────────────────────────────────────────

export async function getPublishedSponsors(): Promise<Sponsor[]> {
  return prisma.sponsor.findMany({
    where: { status: "published" },
    orderBy: { displayPriority: "asc" },
  });
}

export async function getFeaturedSponsors(): Promise<Sponsor[]> {
  return prisma.sponsor.findMany({
    where: { status: "published", featured: true },
    orderBy: { displayPriority: "asc" },
  });
}

export async function getHomepageSponsors(): Promise<Sponsor[]> {
  return prisma.sponsor.findMany({
    where: { status: "published", showOnHomepage: true },
    orderBy: { displayPriority: "asc" },
  });
}

export async function getSponsorBySlug(slug: string): Promise<Sponsor | null> {
  return prisma.sponsor.findFirst({
    where: { slug, status: "published", hasDetailPage: true },
  });
}

export async function getSponsorDetailSlugs(): Promise<string[]> {
  const sponsors = await prisma.sponsor.findMany({
    where: { status: "published", hasDetailPage: true },
    select: { slug: true },
  });
  return sponsors.map((s) => s.slug);
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  return prisma.sponsor.findMany({
    orderBy: [{ status: "asc" }, { displayPriority: "asc" }],
  });
}

export async function getSponsorById(id: string): Promise<Sponsor | null> {
  return prisma.sponsor.findUnique({ where: { id } });
}
