import { describe, it, expect } from "vitest";
import { getVehicles, getRoutes, getPackages } from "@/lib/data";
import { FLEET } from "@/constants/fleet";
import { POPULAR_ROUTES } from "@/constants/routes";
import { PACKAGES } from "@/constants/packages";

describe("Data Access & Fallbacks", () => {
  it("returns fallback fleet when database is unconfigured or offline", async () => {
    const vehicles = await getVehicles();
    expect(Array.isArray(vehicles)).toBe(true);
    expect(vehicles.length).toBeGreaterThanOrEqual(FLEET.length);
    expect(vehicles[0].name).toBeDefined();
    expect(vehicles[0].ratePerKm).toBeDefined();
  });

  it("returns fallback routes when database is unconfigured or offline", async () => {
    const routes = await getRoutes();
    expect(Array.isArray(routes)).toBe(true);
    expect(routes.length).toBeGreaterThanOrEqual(POPULAR_ROUTES.length);
    expect(routes[0].name).toBeDefined();
    expect(routes[0].distance).toBeDefined();
  });

  it("returns fallback packages when database is unconfigured or offline", async () => {
    const packages = await getPackages();
    expect(Array.isArray(packages)).toBe(true);
    expect(packages.length).toBeGreaterThanOrEqual(PACKAGES.length);
    expect(packages[0].title).toBeDefined();
    expect(packages[0].columns).toBeDefined();
    expect(packages[0].rows).toBeDefined();
  });
});
