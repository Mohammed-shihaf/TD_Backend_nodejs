"use strict";
const Koa = require("koa");
const { getWidgets } = require("./widgets");

function buildServer() {
  const app = new Koa();
  app.use(async (ctx) => {
    if (ctx.path === "/health") {
      ctx.body = { status: "ok" };
      return;
    }
    if (ctx.path === "/api/widgets") {
      ctx.body = { widgets: getWidgets() };
      return;
    }
    ctx.status = 404;
  });
  return app;
}

module.exports = buildServer;
