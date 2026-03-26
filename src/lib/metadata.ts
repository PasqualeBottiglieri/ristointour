import type { Metadata } from "next";

const OG_IMAGE = {
  url: "/images/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "ristointour.it — Ristoranti, Agriturismi, Caseifici ed Esperienze nella Piana del Sele",
};

/**
 * Creates page-specific openGraph + twitter metadata,
 * inheriting the default OG image and site-level fields.
 */
export function ogMeta(title: string, description?: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      ...(description && { description }),
      images: [OG_IMAGE],
    },
    twitter: {
      title,
      ...(description && { description }),
      images: [OG_IMAGE],
    },
  };
}
