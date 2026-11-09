import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 60; // 60 requests per minute

interface RateEntry {
  count: number;
  reset: number;
}

const store = new Map<string, RateEntry>();

function cleanExpiredEntries() {
  const now = Date.now();
  if (store.size > 500) {
    for (const [key, entry] of store.entries()) {
      if (now > entry.reset) {
        store.delete(key);
      }
    }
  }
}

function getKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  const ua = request.headers.get("user-agent") ?? "no-ua";
  return `${ip}:${ua}`;
}

function allow(key: string): boolean {
  cleanExpiredEntries();
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count += 1;
  return true;
}

const PUBLIC_ADMIN_PATHS = [
  "/morya-admin-hq-9x/login",
  "/morya-admin-hq-9x/forgot-password",
  "/morya-admin-hq-9x/reset-password",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Edge protection for admin panel pages
  if (pathname.startsWith("/morya-admin-hq-9x")) {
    const isPublic = PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p));
    if (!isPublic) {
      const session = request.cookies.get("vgh_admin_session")?.value;
      if (!session || !session.includes(".")) {
        const loginUrl = new URL("/morya-admin-hq-9x/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // 2. API Rate Limiting
  if (pathname.startsWith("/api/")) {
    const key = getKey(request);
    if (!allow(key)) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }
    const res = NextResponse.next();
    res.headers.set("X-RateLimit-Limit", String(MAX_REQUESTS));
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/morya-admin-hq-9x/:path*"],
};
