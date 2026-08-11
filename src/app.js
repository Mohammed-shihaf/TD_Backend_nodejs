"use strict";
const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/customer/products", (req, res) => {
  res.json({ products: [{ id: 1, name: "Customer-facing product" }] });
});

app.get("/api/admin/products", (req, res) => {
  res.json({ products: [{ id: 1, name: "Customer-facing product", internalCost: 4.5 }] });
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`saasplatform-backend listening on ${port}`));
}
module.exports = app;
