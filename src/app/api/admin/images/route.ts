import { NextRequest, NextResponse } from "next/server";
import { listImages } from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get("section") ?? "portfolio";
  const images = await listImages(section);
  return NextResponse.json(images);
}
