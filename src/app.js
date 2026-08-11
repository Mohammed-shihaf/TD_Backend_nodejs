"use strict";
const express = require("express");
const app = express();
app.use(express.json());

const TENANTS = {
  acme: { tier: "self-serve", brand: "Acme", primaryColor: "#2563eb" },
  globex: { tier: "enterprise", brand: "Globex Corp", primaryColor: "#0f172a" },
};

app.get("/api/tenant-config", (req, res) => {
  const tenant = TENANTS[req.header("x-tenant-id")];
  if (!tenant) return res.status(404).json({ error: "unknown tenant" });
  res.json(tenant);
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`whitelabelstorefront-backend listening on ${port}`));
}
module.exports = app;
