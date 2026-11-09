import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { supabaseAdmin } from "@/lib/supabase";

export const ADMIN_SESSION_COOKIE = "vgh_admin_session";
export const ADMIN_CSRF_COOKIE = "vgh_admin_csrf";

const SESSION_TTL_SECONDS = 60 * 60 * 8;
const SESSION_TTL_MS = SESSION_TTL_SECONDS * 1000;

function getAdminSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === "production") return null;
    return "dev-only-admin-secret-change-before-production-32chars";
  }
  return secret;
}

export type AdminSessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

function base64url(input: string | Buffer) {
  return Buffer.from(input).toString("base64url");
}

export function createSessionToken(adminId: string, csrfToken?: string) {
  const secret = getAdminSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET must be set to a strong value in production.");

  const payload = JSON.stringify({
    sub: adminId,
    iat: Date.now(),
    exp: Date.now() + SESSION_TTL_MS,
    csrf: csrfToken || crypto.randomBytes(16).toString("hex"),
  });
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${base64url(payload)}.${signature}`;
}

export const TEMP_OPEN_ADMIN: AdminSessionUser = {
  id: "temp",
  name: "Admin",
  email: "admin@moryatravels.com",
  role: "admin",
};

export function verifySessionToken(token: string) {
  const secret = getAdminSecret();
  if (!secret || !token) return null;

  const [payloadSegment, signature] = token.split(".");
  if (!payloadSegment || !signature) return null;

  let payloadText = "";
  try {
    payloadText = Buffer.from(payloadSegment, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expected = crypto.createHmac("sha256", secret).update(payloadText).digest("hex");
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null;

  try {
    const payload = JSON.parse(payloadText) as { sub?: string; exp?: number; csrf?: string };
    if (!payload.sub || typeof payload.exp !== "number") return null;
    if (Date.now() > payload.exp) return null;
    return { sub: payload.sub, exp: payload.exp, csrf: payload.csrf ?? "" };
  } catch {
    return null;
  }
}

export async function verifyAdminCredentials(email: string, password: string): Promise<AdminSessionUser | null> {
  const normalized = email.trim().toLowerCase();
  const { data, error } = await supabaseAdmin
    .from("admins")
    .select("id, name, email, role, password_hash, passwordhash")
    .eq("email", normalized)
    .maybeSingle();
  if (error || !data) return null;

  const row = data as Record<string, unknown>;
  const hash = String(row.password_hash ?? row.passwordhash ?? "");
  if (!hash) return null;

  const ok = await bcrypt.compare(password, hash);
  if (!ok) return null;

  return { id: String(row.id), name: String(row.name), email: String(row.email), role: String(row.role ?? "admin") };
}

export async function signInAdmin(email: string, password: string): Promise<AdminSessionUser | null> {
  const admin = await verifyAdminCredentials(email, password);
  if (!admin) return null;

  const cookieStore = await cookies();
  const csrf = crypto.randomBytes(16).toString("hex");
  const token = createSessionToken(admin.id, csrf);
  const isProd = process.env.NODE_ENV === "production";
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
    secure: isProd,
  });
  cookieStore.set(ADMIN_CSRF_COOKIE, csrf, {
    httpOnly: false, // Accessible to client-side scripts to send via x-csrf-token header
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
    secure: isProd,
  });
  return admin;
}

export async function getCurrentAdmin(): Promise<AdminSessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    if (!token) return null;
    const payload = verifySessionToken(token);
    if (!payload) return null;

    const { data, error } = await supabaseAdmin.from("admins").select("id, name, email, role").eq("id", payload.sub).maybeSingle();
    if (error || !data) return null;

    const row = data as Record<string, unknown>;
    return { id: String(row.id), name: String(row.name), email: String(row.email), role: String(row.role ?? "admin") };
  } catch {
    return null;
  }
}

export async function clearAdminSession() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_SESSION_COOKIE);
    cookieStore.delete(ADMIN_CSRF_COOKIE);
  } catch {
    // no-op
  }
}

export function isValidAdminSession(token: string | undefined) {
  if (!token) return false;
  return Boolean(verifySessionToken(token));
}

export type AdminMutationResult =
  | { ok: true; admin: AdminSessionUser }
  | { ok: false; response: NextResponse };

export async function requireAdminMutation(request?: Request): Promise<AdminMutationResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    if (!token) {
      return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
    }
    const payload = verifySessionToken(token);
    if (!payload) {
      return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
    }

    if (request && ["POST", "PATCH", "PUT", "DELETE"].includes(request.method)) {
      const csrfHeader = request.headers.get("x-csrf-token");
      const csrfCookie = cookieStore.get(ADMIN_CSRF_COOKIE)?.value;
      if (csrfHeader && csrfCookie && csrfHeader !== csrfCookie && csrfHeader !== payload.csrf) {
        return { ok: false, response: NextResponse.json({ error: "CSRF verification failed" }, { status: 403 }) };
      }
    }

    const admin = await getCurrentAdmin();
    if (!admin) {
      return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
    }
    return { ok: true, admin };
  } catch {
    return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
}
