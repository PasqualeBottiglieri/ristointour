import type { Listing, Artist } from "@/generated/prisma/client";

// Re-export Prisma types
export type { Listing, Artist };

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
