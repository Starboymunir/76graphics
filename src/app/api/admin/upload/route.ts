import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const section = (formData.get("section") as string) || "portfolio";
  const title = (formData.get("title") as string) || "";
  const category = (formData.get("category") as string) || "";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }

  // 10 MB limit
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const context: Record<string, string> = {};
  if (title) context.title = title;
  if (category) context.category = category;

  const result = await uploadImage(buffer, section, Object.keys(context).length ? context : undefined);

  return NextResponse.json(result);
}
