import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Verifies admin JWT from cookie. Returns null if authenticated, or a 401 NextResponse if not.
 */
export async function verifyAdminAuth(
  request: NextRequest
): Promise<NextResponse | null> {
  const token = request.cookies.get("ristointour-admin-session")?.value;
  if (!token) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }
  try {
    await jwtVerify(token, JWT_SECRET);
    return null;
  } catch {
    return NextResponse.json(
      { error: "Sessione non valida" },
      { status: 401 }
    );
  }
}
