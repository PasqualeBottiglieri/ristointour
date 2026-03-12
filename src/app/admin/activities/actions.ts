"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseJson(value: string | null): Prisma.InputJsonValue | typeof Prisma.JsonNull | undefined {
  if (!value || value.trim() === "") return Prisma.JsonNull;
  try {
    return JSON.parse(value) as Prisma.InputJsonValue;
  } catch {
    return Prisma.JsonNull;
  }
}

export async function createListing(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = slugify(name);
  const planType = formData.get("planType") as string;
  const isPremium = planType === "premium";

  await prisma.listing.create({
    data: {
      slug,
      name,
      category: formData.get("category") as string,
      planType,
      location: formData.get("location") as string,
      address: (formData.get("address") as string) || null,
      description: formData.get("description") as string,
      cuisine: (formData.get("cuisine") as string) || null,
      phone: (formData.get("phone") as string) || null,
      website: (formData.get("website") as string) || null,
      email: (formData.get("email") as string) || null,
      bookingLink: (formData.get("bookingLink") as string) || null,
      menuLink: (formData.get("menuLink") as string) || null,
      image: formData.get("image") as string,
      heroImage: (formData.get("heroImage") as string) || null,
      mapImage: (formData.get("mapImage") as string) || null,
      badge: (formData.get("badge") as string) || null,
      badgeStyle: (formData.get("badgeStyle") as string) || null,
      rating: formData.get("rating") ? parseFloat(formData.get("rating") as string) : null,
      reviewCount: formData.get("reviewCount") ? parseInt(formData.get("reviewCount") as string) : null,
      priceRange: (formData.get("priceRange") as string) || null,
      priceLabel: (formData.get("priceLabel") as string) || null,
      openTime: (formData.get("openTime") as string) || null,
      philosophy: (formData.get("philosophy") as string) || null,
      galleryImages: parseJson(formData.get("galleryImages") as string),
      dishes: parseJson(formData.get("dishes") as string),
      services: parseJson(formData.get("services") as string),
      hours: parseJson(formData.get("hours") as string),
      reviews: parseJson(formData.get("reviews") as string),
      socialLinks: parseJson(formData.get("socialLinks") as string),
      showOnHomepage: true,
      hasDetailPage: isPremium,
      featured: isPremium,
      displayPriority: parseInt((formData.get("displayPriority") as string) || "100"),
      status: formData.get("status") as string,
      googlePlaceId: (formData.get("googlePlaceId") as string) || null,
      latitude: formData.get("latitude") ? parseFloat(formData.get("latitude") as string) : null,
      longitude: formData.get("longitude") ? parseFloat(formData.get("longitude") as string) : null,
      googleMapsUrl: (formData.get("googleMapsUrl") as string) || null,
      sourceProvider: (formData.get("sourceProvider") as string) || "manual",
      sourceLastSyncedAt: (formData.get("googlePlaceId") as string) ? new Date() : null,
      enrichmentStatus: (formData.get("googlePlaceId") as string) ? "complete" : "none",
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/activities");
  revalidatePath(`/ristoranti/${slug}`);
  redirect("/admin/activities");
}

export async function updateListing(id: string, formData: FormData) {
  const planType = formData.get("planType") as string;
  const isPremium = planType === "premium";

  await prisma.listing.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      planType,
      location: formData.get("location") as string,
      address: (formData.get("address") as string) || null,
      description: formData.get("description") as string,
      cuisine: (formData.get("cuisine") as string) || null,
      phone: (formData.get("phone") as string) || null,
      website: (formData.get("website") as string) || null,
      email: (formData.get("email") as string) || null,
      bookingLink: (formData.get("bookingLink") as string) || null,
      menuLink: (formData.get("menuLink") as string) || null,
      image: formData.get("image") as string,
      heroImage: (formData.get("heroImage") as string) || null,
      mapImage: (formData.get("mapImage") as string) || null,
      badge: (formData.get("badge") as string) || null,
      badgeStyle: (formData.get("badgeStyle") as string) || null,
      rating: formData.get("rating") ? parseFloat(formData.get("rating") as string) : null,
      reviewCount: formData.get("reviewCount") ? parseInt(formData.get("reviewCount") as string) : null,
      priceRange: (formData.get("priceRange") as string) || null,
      priceLabel: (formData.get("priceLabel") as string) || null,
      openTime: (formData.get("openTime") as string) || null,
      philosophy: (formData.get("philosophy") as string) || null,
      galleryImages: parseJson(formData.get("galleryImages") as string),
      dishes: parseJson(formData.get("dishes") as string),
      services: parseJson(formData.get("services") as string),
      hours: parseJson(formData.get("hours") as string),
      reviews: parseJson(formData.get("reviews") as string),
      socialLinks: parseJson(formData.get("socialLinks") as string),
      showOnHomepage: true,
      hasDetailPage: isPremium,
      featured: isPremium,
      displayPriority: parseInt((formData.get("displayPriority") as string) || "100"),
      status: formData.get("status") as string,
      googlePlaceId: (formData.get("googlePlaceId") as string) || null,
      latitude: formData.get("latitude") ? parseFloat(formData.get("latitude") as string) : null,
      longitude: formData.get("longitude") ? parseFloat(formData.get("longitude") as string) : null,
      googleMapsUrl: (formData.get("googleMapsUrl") as string) || null,
      sourceProvider: (formData.get("sourceProvider") as string) || "manual",
      sourceLastSyncedAt: (formData.get("googlePlaceId") as string) ? new Date() : null,
      enrichmentStatus: (formData.get("googlePlaceId") as string) ? "complete" : "none",
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/activities");
  redirect("/admin/activities");
}

export async function deleteListing(id: string) {
  await prisma.listing.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/activities");
}
