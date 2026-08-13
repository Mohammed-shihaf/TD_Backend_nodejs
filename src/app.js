"use strict";
const Fastify = require("fastify");

function buildApp() {
  const app = Fastify({ logger: false });

  app.get("/health", async () => ({ status: "ok" }));

  app.get("/api/widgets/count", async () => {
    const widgets = [{ id: 1, label: "Standalone backend widget" }];
    return { count: widgets.length };
  });

  return app;
}

if (require.main === module) {
  const app = buildApp();
  const port = process.env.PORT || 3000;
  app.listen({ port }, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log(`td-backend-nodejs microservice listening on ${port}`);
  });
}

module.exports = buildApp;
