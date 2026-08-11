"use strict";
const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("GET /api/design-tokens", () => {
  it("returns color, spacing, and typography tokens", async () => {
    const res = await request(app).get("/api/design-tokens");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.all.keys("color", "spacing", "typography");
  });
});

describe("GET /health", () => {
  it("reports ok", async () => {
    const res = await request(app).get("/health");
    expect(res.body.status).to.equal("ok");
  });
});
