"use strict";
const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("GET /api/widgets", () => {
  it("returns a widgets array", async () => {
    const res = await request(app).get("/api/widgets");
    expect(res.status).to.equal(200);
    expect(res.body.widgets).to.be.an("array");
  });
});

describe("GET /health", () => {
  it("reports ok", async () => {
    const res = await request(app).get("/health");
    expect(res.body.status).to.equal("ok");
  });
});
