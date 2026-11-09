import { NextResponse } from "next/server";

export function serverError(message: string) {
  return NextResponse.json({ error: message }, { status: 500 });
}

export function badRequest(message: string, issues?: unknown) {
  return NextResponse.json({ error: message, ...(issues ? { issues } : {}) }, { status: 400 });
}

export function notFound(message: string) {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function tooManyRequests() {
  return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
}
