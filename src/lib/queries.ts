import { prisma } from "./prisma";
import type { Listing, Artist } from "@/generated/prisma/client";

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
