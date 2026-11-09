import { describe, it, expect } from "vitest";
import {
  buildMetadata,
  organizationSchema,
  webSiteSchema,
  serviceSchema,
  vehicleSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { FLEET } from "@/constants/fleet";
import { SERVICES } from "@/constants/services";

describe("SEO and Schema generation", () => {
  it("builds valid Next.js metadata objects", () => {
    const meta = buildMetadata({
      title: "Test Title",
      description: "Test description for SEO",
      canonical: "/fleet/swift-dzire",
    });

    expect(meta.title).toBe("Test Title");
    expect(meta.description).toBe("Test description for SEO");
    expect(meta.alternates?.canonical).toContain("/fleet/swift-dzire");
    expect(meta.openGraph?.title).toBe("Test Title");
  });

  it("generates Organization schema with required fields", () => {
    const schemas = organizationSchema();
    expect(Array.isArray(schemas)).toBe(true);
    const org = schemas[0];
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("Morya Travels");
    expect(org.telephone).toBeDefined();
    expect(org.address).toBeDefined();

    const taxi = schemas[1];
    expect(taxi["@type"]).toBe("TaxiService");
  });

  it("generates WebSite schema with search action", () => {
    const site = webSiteSchema();
    expect(site["@type"]).toBe("WebSite");
    expect(site.name).toBe("Morya Travels");
  });

  it("generates Product schema for fleet vehicles", () => {
    const vehicle = FLEET[0];
    const schema = vehicleSchema(vehicle);
    expect(schema["@type"]).toBe("Product");
    expect(schema.name).toBe(vehicle.name);
    expect(schema.offers).toBeDefined();
  });

  it("generates Service schema with provider and offer catalog", () => {
    const service = SERVICES[0];
    const schema = serviceSchema(service);
    expect(schema["@type"]).toBe("Service");
    expect(schema.serviceType).toBe(service.title);
    expect(schema.provider).toBeDefined();
  });

  it("generates BreadcrumbList schema correctly", () => {
    const breadcrumb = breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Fleet", url: "/fleet" },
      { name: "Swift Dzire", url: "/fleet/swift-dzire" },
    ]);
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(breadcrumb.itemListElement).toHaveLength(3);
    expect(breadcrumb.itemListElement[0].position).toBe(1);
    expect(breadcrumb.itemListElement[0].item).toContain("/");
  });
});
