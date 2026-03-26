import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-me"
);

const SITE_COOKIE = "ristointour-site-session";
const ADMIN_COOKIE = "ristointour-admin-session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow: login pages, static assets, API routes, webhooks
  if (
    pathname === "/auth/login" ||
    pathname === "/admin/login" ||
    pathname === "/privacy-policy" ||
    pathname === "/cookie-policy" ||
    pathname === "/termini-condizioni" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/img") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/uploads") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".xml") ||
    pathname.endsWith(".txt")
  ) {
    return NextResponse.next();
  }

  // Protect /admin/* with admin session
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Protect ALL other routes with site-wide session
  const siteToken = request.cookies.get(SITE_COOKIE)?.value;
  if (!siteToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  try {
    await jwtVerify(siteToken, JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
