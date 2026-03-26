"use server";

import { SignJWT } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-me"
);

const VALID_USERNAME = "mimmo";
const VALID_PASSWORD = "1234";
const COOKIE_NAME = "ristointour-site-session";

export async function siteLoginAction(
  formData: FormData
): Promise<{ error?: string }> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username e password sono obbligatori." };
  }

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return { error: "Credenziali non valide." };
  }

  const token = await new SignJWT({ user: username, type: "site" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return {};
}
