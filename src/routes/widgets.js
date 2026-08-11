"use strict";
const express = require("express");
const { listWidgets, getWidget, createWidget } = require("../data/widgets");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ widgets: listWidgets() });
});

router.get("/:id", (req, res) => {
  const widget = getWidget(Number(req.params.id));
  if (!widget) return res.status(404).json({ error: "widget not found" });
  res.json(widget);
});

router.post("/", (req, res) => {
  const { label } = req.body;
  if (!label) return res.status(400).json({ error: "label is required" });
  res.status(201).json(createWidget(label));
});

module.exports = router;
