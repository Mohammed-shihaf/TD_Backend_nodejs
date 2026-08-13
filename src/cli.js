#!/usr/bin/env node
"use strict";
const { Command } = require("commander");
const { getWidgets } = require("./widgets");
const buildServer = require("./server");

function buildCli() {
  const program = new Command();
  program.name("td-widgets").description("TD Widgets CLI");

  program
    .command("list")
    .description("list all widgets")
    .option("--json", "output as JSON")
    .action((opts) => {
      const widgets = getWidgets();
      if (opts.json) {
        console.log(JSON.stringify(widgets));
      } else {
        widgets.forEach((w) => console.log(`#${w.id} ${w.label}`));
      }
    });

  program
    .command("serve")
    .description("start the Koa HTTP server")
    .option("-p, --port <port>", "port to listen on", "3000")
    .action((opts) => {
      buildServer().listen(Number(opts.port), () =>
        console.log(`serving on ${opts.port}`)
      );
    });

  return program;
}

if (require.main === module) {
  buildCli().parse(process.argv);
}

module.exports = buildCli;
