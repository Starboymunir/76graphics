import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/blog";

export async function GET() {
  return NextResponse.json(getBlogPosts());
}
