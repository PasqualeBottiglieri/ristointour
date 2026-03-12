"use server";

import { prisma } from "@/lib/prisma";
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

export async function createSponsor(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = slugify(name);

  await prisma.sponsor.create({
    data: {
      slug,
      name,
      logo: formData.get("logo") as string,
      coverImage: (formData.get("coverImage") as string) || null,
      shortDescription: formData.get("shortDescription") as string,
      fullDescription: (formData.get("fullDescription") as string) || null,
      website: (formData.get("website") as string) || null,
      email: (formData.get("email") as string) || null,
      phone: (formData.get("phone") as string) || null,
      sponsorType: formData.get("sponsorType") as string,
      category: (formData.get("category") as string) || null,
      badge: (formData.get("badge") as string) || null,
      ctaLabel: (formData.get("ctaLabel") as string) || null,
      ctaUrl: (formData.get("ctaUrl") as string) || null,
      featured: formData.get("featured") === "on",
      showOnHomepage: formData.get("showOnHomepage") === "on",
      hasDetailPage: formData.get("hasDetailPage") === "on",
      displayPriority: parseInt((formData.get("displayPriority") as string) || "100"),
      status: formData.get("status") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/partner");
  revalidatePath("/admin/sponsors");
  redirect("/admin/sponsors");
}

export async function updateSponsor(id: string, formData: FormData) {
  await prisma.sponsor.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      logo: formData.get("logo") as string,
      coverImage: (formData.get("coverImage") as string) || null,
      shortDescription: formData.get("shortDescription") as string,
      fullDescription: (formData.get("fullDescription") as string) || null,
      website: (formData.get("website") as string) || null,
      email: (formData.get("email") as string) || null,
      phone: (formData.get("phone") as string) || null,
      sponsorType: formData.get("sponsorType") as string,
      category: (formData.get("category") as string) || null,
      badge: (formData.get("badge") as string) || null,
      ctaLabel: (formData.get("ctaLabel") as string) || null,
      ctaUrl: (formData.get("ctaUrl") as string) || null,
      featured: formData.get("featured") === "on",
      showOnHomepage: formData.get("showOnHomepage") === "on",
      hasDetailPage: formData.get("hasDetailPage") === "on",
      displayPriority: parseInt((formData.get("displayPriority") as string) || "100"),
      status: formData.get("status") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/partner");
  revalidatePath("/admin/sponsors");
  redirect("/admin/sponsors");
}

export async function deleteSponsor(id: string) {
  await prisma.sponsor.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/partner");
  revalidatePath("/admin/sponsors");
}
