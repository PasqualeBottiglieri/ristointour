import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
  const authError = await verifyAdminAuth(request);
  if (authError) return authError;

  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json(
      { error: "Parametro url mancante" },
      { status: 400 }
    );
  }

  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const response = await fetch(oembedUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Video non trovato" },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      title: data.title,
      author_name: data.author_name,
    });
  } catch {
    return NextResponse.json(
      { error: "Errore nel recupero dati YouTube" },
      { status: 502 }
    );
  }
}
