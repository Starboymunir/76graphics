import { NextRequest, NextResponse } from "next/server";
import { getPageContent, updatePageContent } from "@/lib/content";
import { revalidatePath } from "next/cache";

const PATH_MAP: Record<string, string> = {
  homepage: "/",
  "branding-services": "/branding-services",
  "website-design": "/website-design",
  "vehicle-wraps": "/vehicle-wraps",
  signage: "/signage",
  "environmental-graphics": "/environmental-graphics",
  "promotional-products": "/promotional-products",
};

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page");
  if (!page) {
    return NextResponse.json({ error: "page param required" }, { status: 400 });
  }
  const content = getPageContent(page);
  if (!content) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { page, content } = body as { page?: string; content?: Record<string, unknown> };

  if (!page || !content) {
    return NextResponse.json(
      { error: "page and content are required" },
      { status: 400 },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatePageContent(page, content as any);

  const pagePath = PATH_MAP[page];
  if (pagePath) {
    revalidatePath(pagePath);
  }

  return NextResponse.json({ success: true });
}
