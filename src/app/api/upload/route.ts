import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-me"
);

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const EXT_MAP: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export async function POST(request: NextRequest) {
  // Verify JWT from cookie
  const token = request.cookies.get("ristointour-admin-session")?.value;
  if (!token) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }

  try {
    await jwtVerify(token, JWT_SECRET);
  } catch {
    return NextResponse.json({ error: "Sessione non valida" }, { status: 401 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  if (files.length === 0) {
    return NextResponse.json(
      { error: "Nessun file selezionato" },
      { status: 400 }
    );
  }

  // Validate all files first
  for (const file of files) {
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `Tipo non supportato: ${file.type}. Usa JPG, PNG, WebP o GIF.` },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `File troppo grande: ${file.name}. Massimo 5MB.` },
        { status: 400 }
      );
    }
  }

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const urls: string[] = [];

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = EXT_MAP[file.type] || ".jpg";
    const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
    const filePath = path.join(uploadsDir, uniqueName);

    await writeFile(filePath, buffer);
    urls.push(`/uploads/${uniqueName}`);
  }

  return NextResponse.json({ urls });
}
