import { NextResponse } from "next/server";
import { listImages } from "@/lib/cloudinary";

export async function GET() {
  try {
    const images = await listImages("portfolio");
    return NextResponse.json(images, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json([]);
  }
}
