"use strict";
const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/widgets", (req, res) => {
  res.json({ widgets: [{ id: 1, label: "Standalone backend widget" }] });
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`td-backend-nodejs listening on ${port}`));
}
module.exports = app;
