"use strict";
const { expect } = require("chai");
const buildApp = require("../src/app");

describe("microservice (Fastify)", () => {
  let app;
  beforeEach(() => {
    app = buildApp();
  });
  afterEach(() => app.close());

  it("GET /health reports ok", async () => {
    const res = await app.inject({ method: "GET", url: "/health" });
    expect(res.statusCode).to.equal(200);
    expect(JSON.parse(res.payload).status).to.equal("ok");
  });

  it("GET /api/widgets/count returns a count", async () => {
    const res = await app.inject({ method: "GET", url: "/api/widgets/count" });
    expect(res.statusCode).to.equal(200);
    expect(JSON.parse(res.payload).count).to.equal(1);
  });
});
