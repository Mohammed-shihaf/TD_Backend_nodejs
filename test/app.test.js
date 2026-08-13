"use strict";
const { expect } = require("chai");
const { io: ioClient } = require("socket.io-client");
const request = require("supertest");
const buildApp = require("../src/app");

describe("real-time (Socket.IO)", () => {
  let server, app, port;

  beforeEach((done) => {
    ({ app, server } = buildApp());
    server.listen(0, () => {
      port = server.address().port;
      done();
    });
  });

  afterEach((done) => server.close(done));

  it("GET /health reports ok", async () => {
    const res = await request(app).get("/health");
    expect(res.body.status).to.equal("ok");
  });

  it("broadcasts widget:added when a client emits widget:add", (done) => {
    const client = ioClient(`http://localhost:${port}`);
    client.on("connect", () => {
      client.emit("widget:add", "Real-time widget");
    });
    client.on("widget:added", (widget) => {
      expect(widget.label).to.equal("Real-time widget");
      client.close();
      done();
    });
  });
});
