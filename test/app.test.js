"use strict";
const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("GET /api/customer/products", () => {
  it("returns customer-namespace products", async () => {
    const res = await request(app).get("/api/customer/products");
    expect(res.status).to.equal(200);
    expect(res.body.products[0]).to.not.have.property("internalCost");
  });
});

describe("GET /api/admin/products", () => {
  it("returns admin-namespace products with internal fields", async () => {
    const res = await request(app).get("/api/admin/products");
    expect(res.body.products[0]).to.have.property("internalCost");
  });
});

describe("GET /health", () => {
  it("reports ok", async () => {
    const res = await request(app).get("/health");
    expect(res.body.status).to.equal("ok");
  });
});
