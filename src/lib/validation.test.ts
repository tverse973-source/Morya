import { describe, it, expect } from "vitest";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().trim().min(10).max(20).regex(/^[+\d\s()-]{10,20}$/, "Invalid phone number"),
  message: z.string().trim().min(10).max(4000),
  source: z.string().trim().max(80).optional().default("website"),
});

const bookingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(5).max(30),
  email: z.string().trim().email().optional().or(z.literal("")),
  pickup: z.string().trim().min(2).max(300),
  dropoff: z.string().trim().min(2).max(300),
  date: z.string().min(1),
  tripType: z.string().trim().min(1).max(80).default("One way"),
  passengers: z.string().trim().max(120).optional().default(""),
  vehicleId: z.string().trim().max(120).optional().default(""),
  vehicleName: z.string().trim().max(120).optional().default(""),
  details: z.string().trim().max(4000).optional().default(""),
  notes: z.string().trim().max(4000).optional().default(""),
  source: z.string().trim().max(80).optional().default("website"),
  status: z.enum(["pending", "confirmed", "cancelled", "completed", "closed"]).optional().default("pending"),
  amount: z.coerce.number().finite().optional().nullable(),
});

describe("API Validation Schemas", () => {
  describe("contactSchema", () => {
    it("accepts valid contact enquiries", () => {
      const valid = contactSchema.safeParse({
        name: "Rahul Sharma",
        phone: "+91 9876543210",
        email: "rahul@example.com",
        message: "Need a quote for Pune to Shirdi round trip.",
      });
      expect(valid.success).toBe(true);
    });

    it("rejects invalid phone numbers or short messages", () => {
      const invalidPhone = contactSchema.safeParse({
        name: "Rahul Sharma",
        phone: "123", // too short
        message: "Need a quote.",
      });
      expect(invalidPhone.success).toBe(false);

      const shortMessage = contactSchema.safeParse({
        name: "Rahul Sharma",
        phone: "9876543210",
        message: "Hi", // too short (< 10 chars)
      });
      expect(shortMessage.success).toBe(false);
    });
  });

  describe("bookingSchema", () => {
    it("accepts complete valid booking requests", () => {
      const valid = bookingSchema.safeParse({
        name: "Pooja Patil",
        phone: "9876543210",
        pickup: "Pune Airport",
        dropoff: "Hinjawadi Phase 1",
        date: "2026-12-01",
        tripType: "Airport transfer",
        passengers: "2",
        vehicleName: "Swift Dzire",
      });
      expect(valid.success).toBe(true);
      if (valid.success) {
        expect(valid.data.status).toBe("pending");
        expect(valid.data.source).toBe("website");
      }
    });

    it("rejects bookings missing required fields", () => {
      const missingDate = bookingSchema.safeParse({
        name: "Pooja Patil",
        phone: "9876543210",
        pickup: "Pune Airport",
        dropoff: "Hinjawadi Phase 1",
        date: "",
      });
      expect(missingDate.success).toBe(false);
    });
  });
});
