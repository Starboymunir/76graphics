import { NextRequest, NextResponse } from "next/server";
import { getPageContent, updatePageContent, getPortfolio, updatePortfolio } from "@/lib/content";
import type { PortfolioItem } from "@/lib/content";
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
  if (page === "portfolio") {
    return NextResponse.json(getPortfolio());
  }
  const content = getPageContent(page);
  if (!content) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { page, content, portfolio } = body as {
    page?: string;
    content?: Record<string, unknown>;
    portfolio?: PortfolioItem[];
  };

  // Portfolio save
  if (page === "portfolio" && portfolio) {
    updatePortfolio(portfolio);
    revalidatePath("/our-work");
    revalidatePath("/");
    return NextResponse.json({ success: true });
  }

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
