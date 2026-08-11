"use strict";
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());

app.get("/api/widgets", (req, res) => {
  res.json({ widgets: [{ id: 1, label: "Migration-bridge proof widget" }] });
});

app.use("/legacy", express.static(path.join(__dirname, "..", "legacy-static")));
app.get("/legacy/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "legacy-static", "index.html"));
});

app.use("/app", express.static(path.join(__dirname, "..", "app-static")));
app.get("/app/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "app-static", "index.html"));
});

app.get("/", (req, res) => {
  res.json({ message: "Migration in progress", legacy_app: "/legacy", new_app: "/app" });
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`migrationbridge-backend listening on ${port}`));
}
module.exports = app;
