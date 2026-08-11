"use strict";
const express = require("express");
const router = express.Router();

// Registry of embeddable micro-frontend remotes. In the connected
// TD_Microfrontend repo, the Angular remote at /angular-remote/ is
// embedded live via iframe into this shell; this endpoint documents
// what remotes exist for a shell to discover and mount.
router.get("/", (req, res) => {
  res.json({
    remotes: [
      { name: "angular-remote", path: "/angular-remote/", framework: "angular" },
    ],
  });
});

module.exports = router;
