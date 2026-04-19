import { NextRequest, NextResponse } from "next/server";
import { deleteImage } from "@/lib/cloudinary";

export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { publicId } = body as { publicId?: string };

  if (!publicId) {
    return NextResponse.json({ error: "publicId is required" }, { status: 400 });
  }

  await deleteImage(publicId);
  return NextResponse.json({ success: true });
}
