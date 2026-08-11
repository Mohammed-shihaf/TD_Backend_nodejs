"use strict";
const express = require("express");
const app = express();
app.use(express.json());

const tokens = {
  color: { primary: "#2563eb", danger: "#dc2626", background: "#ffffff" },
  spacing: { sm: "4px", md: "8px", lg: "16px" },
  typography: { fontFamily: "Inter, sans-serif", baseSize: "16px" },
};

app.get("/api/design-tokens", (req, res) => res.json(tokens));
app.get("/health", (req, res) => res.json({ status: "ok" }));

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`designsystemharness-backend listening on ${port}`));
}
module.exports = app;
