import { NextResponse } from "next/server";
import { getPortfolio } from "@/lib/content";

export async function GET() {
  return NextResponse.json(getPortfolio());
}
