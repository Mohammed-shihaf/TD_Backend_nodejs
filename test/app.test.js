"use strict";
const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("GET /api/tenant-config", () => {
  it("resolves a self-serve tenant from the header", async () => {
    const res = await request(app).get("/api/tenant-config").set("x-tenant-id", "acme");
    expect(res.body.tier).to.equal("self-serve");
  });

  it("resolves an enterprise tenant from the header", async () => {
    const res = await request(app).get("/api/tenant-config").set("x-tenant-id", "globex");
    expect(res.body.tier).to.equal("enterprise");
  });

  it("404s for an unknown tenant", async () => {
    const res = await request(app).get("/api/tenant-config").set("x-tenant-id", "nope");
    expect(res.status).to.equal(404);
  });
});

describe("GET /health", () => {
  it("reports ok", async () => {
    const res = await request(app).get("/health");
    expect(res.body.status).to.equal("ok");
  });
});
