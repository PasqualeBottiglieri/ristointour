import type { Listing, Artist, Sponsor } from "@/generated/prisma/client";

// Re-export Prisma types
export type { Listing, Artist, Sponsor };

// ── JSON sub-types for Listing ─────────────────────────────────────

export interface GalleryImage {
  src: string;
  alt: string;
  layout?: "square" | "wide" | "overlay";
}

export interface SignatureDish {
  icon: string;
  name: string;
  description: string;
}

export interface Service {
  icon: string;
  label: string;
}

export interface Hours {
  day: string;
  time: string;
}

export interface Review {
  name: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
}

// ── JSON sub-types for Artist ──────────────────────────────────────

export interface ArtistVideo {
  url: string;
  title: string;
}

export interface ArtistSocial {
  platform: string;
  url: string;
}

// ── Helper to safely cast Prisma Json fields ───────────────────────

export function jsonArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  return [];
}

/**
 * Parse genre field — handles both legacy single string ("Jazz & Soul")
 * and new JSON array format ('["Jazz & Soul","Pop & Rock"]').
 */
export function parseGenres(genre: string | null | undefined): string[] {
  if (!genre) return [];
  try {
    const parsed = JSON.parse(genre);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // not JSON — legacy plain string
  }
  return [genre];
}
