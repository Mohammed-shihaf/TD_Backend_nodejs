"use strict";
const express = require("express");
const app = express();
app.use(express.json());

let widgets = [{ id: 1, label: "Standalone backend widget" }];
let nextId = 2;

app.get("/api/widgets", (req, res) => res.json({ widgets }));

app.get("/api/widgets/:id", (req, res) => {
  const widget = widgets.find((w) => w.id === Number(req.params.id));
  if (!widget) return res.status(404).json({ error: "not found" });
  res.json(widget);
});

app.post("/api/widgets", (req, res) => {
  if (!req.body || typeof req.body.label !== "string") {
    return res.status(400).json({ error: "label is required" });
  }
  const widget = { id: nextId++, label: req.body.label };
  widgets.push(widget);
  res.status(201).json(widget);
});

app.delete("/api/widgets/:id", (req, res) => {
  const before = widgets.length;
  widgets = widgets.filter((w) => w.id !== Number(req.params.id));
  if (widgets.length === before) return res.status(404).json({ error: "not found" });
  res.status(204).end();
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`td-backend-nodejs listening on ${port}`));
}
module.exports = app;
