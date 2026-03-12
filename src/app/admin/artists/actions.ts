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

export async function createArtist(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = slugify(name);
  const planType = formData.get("planType") as string;
  const isPremium = planType === "premium";

  await prisma.artist.create({
    data: {
      slug,
      name,
      artistType: formData.get("artistType") as string,
      genre: formData.get("genre") as string,
      location: formData.get("location") as string,
      shortDescription: formData.get("shortDescription") as string,
      biography: (formData.get("biography") as string) || null,
      musicStyle: (formData.get("musicStyle") as string) || null,
      image: formData.get("image") as string,
      phone: (formData.get("phone") as string) || null,
      website: (formData.get("website") as string) || null,
      galleryImages: parseJson(formData.get("galleryImages") as string),
      videoEmbeds: parseJson(formData.get("videoEmbeds") as string),
      socialLinks: parseJson(formData.get("socialLinks") as string),
      eventTypes: parseJson(formData.get("eventTypes") as string),
      planType,
      showOnHomepage: true,
      hasDetailPage: isPremium,
      featured: isPremium,
      displayPriority: parseInt((formData.get("displayPriority") as string) || "100"),
      status: formData.get("status") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/artists");
  redirect("/admin/artists");
}

export async function updateArtist(id: string, formData: FormData) {
  const planType = formData.get("planType") as string;
  const isPremium = planType === "premium";

  await prisma.artist.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      artistType: formData.get("artistType") as string,
      genre: formData.get("genre") as string,
      location: formData.get("location") as string,
      shortDescription: formData.get("shortDescription") as string,
      biography: (formData.get("biography") as string) || null,
      musicStyle: (formData.get("musicStyle") as string) || null,
      image: formData.get("image") as string,
      phone: (formData.get("phone") as string) || null,
      website: (formData.get("website") as string) || null,
      galleryImages: parseJson(formData.get("galleryImages") as string),
      videoEmbeds: parseJson(formData.get("videoEmbeds") as string),
      socialLinks: parseJson(formData.get("socialLinks") as string),
      eventTypes: parseJson(formData.get("eventTypes") as string),
      planType,
      showOnHomepage: true,
      hasDetailPage: isPremium,
      featured: isPremium,
      displayPriority: parseInt((formData.get("displayPriority") as string) || "100"),
      status: formData.get("status") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/artists");
  redirect("/admin/artists");
}

export async function deleteArtist(id: string) {
  await prisma.artist.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/artists");
}
