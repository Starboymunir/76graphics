import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  const isAdminApi = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login");

  if (isAdminPage || isAdminApi) {
    const token = request.cookies.get("admin_token")?.value;
    const secret = process.env.ADMIN_SECRET ?? "";
    const password = process.env.ADMIN_PASSWORD ?? "";

    const valid = token && password && secret
      ? token === (await computeHmac(password, secret))
      : false;

    if (!valid) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const res = NextResponse.redirect(new URL("/admin/login", request.url));
      res.cookies.delete("admin_token");
      return res;
    }
  }

  return NextResponse.next();
}

async function computeHmac(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data)
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
