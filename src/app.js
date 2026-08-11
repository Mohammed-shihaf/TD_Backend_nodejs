"use strict";
const express = require("express");
const widgetsRouter = require("./routes/widgets");
const remotesRouter = require("./routes/remotes");

const app = express();
app.use(express.json());

app.use("/api/widgets", widgetsRouter);
app.use("/api/remotes", remotesRouter);
app.get("/health", (req, res) => res.json({ status: "ok" }));

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`td-backend-nodejs (microfrontend) listening on ${port}`));
}
module.exports = app;
