import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  createSessionToken,
  verifySessionToken,
  isValidAdminSession,
} from "@/lib/auth";

const ORIGINAL_SECRET = process.env.ADMIN_SESSION_SECRET;

beforeEach(() => {
  process.env.ADMIN_SESSION_SECRET = "test-secret-key-that-is-long-enough-for-testing-123456";
});

afterEach(() => {
  if (ORIGINAL_SECRET === undefined) delete process.env.ADMIN_SESSION_SECRET;
  else process.env.ADMIN_SESSION_SECRET = ORIGINAL_SECRET;
});

describe("createSessionToken / verifySessionToken", () => {
  it("creates and verifies a valid token", () => {
    const token = createSessionToken("admin-123");
    expect(typeof token).toBe("string");
    const payload = verifySessionToken(token);
    expect(payload).not.toBeNull();
    expect(payload?.sub).toBe("admin-123");
    expect(typeof payload?.csrf).toBe("string");
  });

  it("rejects tampered tokens", () => {
    const token = createSessionToken("admin-123");
    const tampered = token.split(".")[0] + ".tamperedsignature";
    expect(verifySessionToken(tampered)).toBeNull();
  });

  it("rejects undefined/empty tokens", () => {
    expect(verifySessionToken(undefined as unknown as string)).toBeNull();
    expect(verifySessionToken("")).toBeNull();
    expect(verifySessionToken("not.a.token")).toBeNull();
  });

  it("isValidAdminSession returns boolean", () => {
    expect(isValidAdminSession(undefined)).toBe(false);
    expect(isValidAdminSession("")).toBe(false);
    const token = createSessionToken("admin-123");
    expect(isValidAdminSession(token)).toBe(true);
  });
});
