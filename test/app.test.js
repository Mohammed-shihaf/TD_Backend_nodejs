"use strict";
const { expect } = require("chai");
const buildCli = require("../src/cli");
const buildServer = require("../src/server");
const http = require("http");

describe("CLI", () => {
  it("list --json prints widgets as JSON", () => {
    const logs = [];
    const orig = console.log;
    console.log = (msg) => logs.push(msg);
    buildCli().parse(["node", "cli", "list", "--json"]);
    console.log = orig;
    const parsed = JSON.parse(logs[0]);
    expect(parsed).to.be.an("array").that.is.not.empty;
  });

  it("list prints human-readable output", () => {
    const logs = [];
    const orig = console.log;
    console.log = (msg) => logs.push(msg);
    buildCli().parse(["node", "cli", "list"]);
    console.log = orig;
    expect(logs[0]).to.match(/^#\d+ /);
  });
});

describe("serve subcommand's underlying Koa server", () => {
  let server;
  afterEach(() => server && server.close());

  it("responds to /api/widgets over real HTTP", (done) => {
    server = buildServer().listen(0, () => {
      const port = server.address().port;
      http.get(`http://localhost:${port}/api/widgets`, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          expect(JSON.parse(data).widgets).to.be.an("array").that.is.not.empty;
          done();
        });
      });
    });
  });
});
