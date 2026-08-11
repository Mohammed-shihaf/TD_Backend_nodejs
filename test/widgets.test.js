"use strict";
const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");
const { resetWidgets } = require("../src/data/widgets");

describe("GET /api/widgets", () => {
  beforeEach(resetWidgets);

  it("returns the widget list", async () => {
    const res = await request(app).get("/api/widgets");
    expect(res.status).to.equal(200);
    expect(res.body.widgets).to.have.lengthOf(3);
  });

  it("returns a single widget by id", async () => {
    const res = await request(app).get("/api/widgets/2");
    expect(res.status).to.equal(200);
    expect(res.body.label).to.equal("Beta widget");
  });

  it("404s for an unknown widget id", async () => {
    const res = await request(app).get("/api/widgets/999");
    expect(res.status).to.equal(404);
  });

  it("creates a new widget", async () => {
    const res = await request(app).post("/api/widgets").send({ label: "Delta widget" });
    expect(res.status).to.equal(201);
    expect(res.body.label).to.equal("Delta widget");
    const list = await request(app).get("/api/widgets");
    expect(list.body.widgets).to.have.lengthOf(4);
  });

  it("400s when creating without a label", async () => {
    const res = await request(app).post("/api/widgets").send({});
    expect(res.status).to.equal(400);
  });
});
