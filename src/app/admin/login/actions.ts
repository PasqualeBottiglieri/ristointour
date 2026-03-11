"use server";

import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";

export async function loginAction(
  formData: FormData
): Promise<{ error?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email e password sono obbligatori." };
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });

  if (!user) {
    return { error: "Credenziali non valide." };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { error: "Credenziali non valide." };
  }

  await createSession({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return {};
}
