"use strict";
const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("GET /", () => {
  it("reports the migration routes", async () => {
    const res = await request(app).get("/");
    expect(res.body.legacy_app).to.equal("/legacy");
    expect(res.body.new_app).to.equal("/app");
  });
});

describe("route splitting", () => {
  it("serves the legacy placeholder at /legacy", async () => {
    const res = await request(app).get("/legacy/");
    expect(res.text).to.include("Legacy App");
  });

  it("serves the new-app placeholder at /app", async () => {
    const res = await request(app).get("/app/");
    expect(res.text).to.include("New App");
  });
});

describe("GET /health", () => {
  it("reports ok", async () => {
    const res = await request(app).get("/health");
    expect(res.body.status).to.equal("ok");
  });
});
