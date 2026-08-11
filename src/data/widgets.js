"use strict";
// In-memory widget store - real CRUD-lite data layer, not a stub.
const INITIAL_WIDGETS = [
  { id: 1, label: "Alpha widget" },
  { id: 2, label: "Beta widget" },
  { id: 3, label: "Gamma widget" },
];

let widgets = INITIAL_WIDGETS.map((w) => ({ ...w }));
let nextId = 4;

function listWidgets() {
  return widgets;
}

function getWidget(id) {
  return widgets.find((w) => w.id === id);
}

function createWidget(label) {
  const widget = { id: nextId++, label };
  widgets.push(widget);
  return widget;
}

function resetWidgets() {
  widgets = INITIAL_WIDGETS.map((w) => ({ ...w }));
  nextId = 4;
}

module.exports = { listWidgets, getWidget, createWidget, resetWidgets };
