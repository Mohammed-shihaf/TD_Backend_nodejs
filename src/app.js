"use strict";
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

function buildApp() {
  const app = express();
  app.get("/health", (req, res) => res.json({ status: "ok" }));

  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    socket.on("widget:add", (label) => {
      const widget = { id: Date.now(), label };
      io.emit("widget:added", widget);
    });
  });

  return { app, server, io };
}

if (require.main === module) {
  const { server } = buildApp();
  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`realtime server listening on ${port}`));
}

module.exports = buildApp;
