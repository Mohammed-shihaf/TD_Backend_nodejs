"use strict";
const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("REST API /api/widgets", () => {
  it("GET /api/widgets returns the list", async () => {
    const res = await request(app).get("/api/widgets");
    expect(res.status).to.equal(200);
    expect(res.body.widgets).to.be.an("array").that.is.not.empty;
  });

  it("POST /api/widgets creates a widget", async () => {
    const res = await request(app).post("/api/widgets").send({ label: "New widget" });
    expect(res.status).to.equal(201);
    expect(res.body.label).to.equal("New widget");
  });

  it("POST /api/widgets rejects missing label", async () => {
    const res = await request(app).post("/api/widgets").send({});
    expect(res.status).to.equal(400);
  });

  it("GET /api/widgets/:id 404s for unknown id", async () => {
    const res = await request(app).get("/api/widgets/99999");
    expect(res.status).to.equal(404);
  });

  it("DELETE /api/widgets/:id removes a widget", async () => {
    const created = await request(app).post("/api/widgets").send({ label: "Temp" });
    const res = await request(app).delete(`/api/widgets/${created.body.id}`);
    expect(res.status).to.equal(204);
  });

  it("GET /health reports ok", async () => {
    const res = await request(app).get("/health");
    expect(res.body.status).to.equal("ok");
  });
});
