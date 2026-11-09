import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 30;

interface RateEntry {
  count: number;
  reset: number;
}

const store = new Map<string, RateEntry>();

function getKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  const ua = request.headers.get("user-agent") ?? "no-ua";
  return `${ip}:${ua}`;
}

function allow(key: string): boolean {
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

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/")) {
    const key = getKey(request);
    if (!allow(key)) {
      return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
    }
    const res = NextResponse.next();
    res.headers.set("X-RateLimit-Limit", String(MAX_REQUESTS));
    res.headers.set("X-RateLimit-Remaining", "0");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
