"use strict";
const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("GET /api/remotes", () => {
  it("lists the angular-remote entry", async () => {
    const res = await request(app).get("/api/remotes");
    expect(res.status).to.equal(200);
    expect(res.body.remotes[0]).to.include({ name: "angular-remote", framework: "angular" });
  });
});
