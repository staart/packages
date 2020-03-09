import { Command } from "@oclif/command";
import { exec, cd } from "shelljs";
import { join, resolve } from "path";
import { writeFile } from "fs-extra";
import { success, info } from "@staart/errors";
import nodemon from "nodemon";
import onchange from "onchange";

const DIR = resolve(join(".staart"));

export default class Local extends Command {
  static description = "build your Staart API app";

  async run() {
    exec("staart build");
    success("Completed build process");
    await writeFile(
      join(DIR, ".babelrc"),
      `
        {
          "presets": ["@babel/env", "@babel/typescript"],
          "plugins": [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            "@babel/proposal-class-properties",
            "@babel/plugin-proposal-object-rest-spread"
          ]
        }
      `
    );
    success("Set up babel for transpiling");
    nodemon({
      script: "dist/src/__staart.js",
      ext: "js json",
      delay: 1000
    });
    cd(".staart");
    onchange(
      ["../src/**/*.ts", "../static/**/*"],
      'babel src --out-dir ../dist/src --extensions ".ts,.tsx" --source-maps inline',
      undefined,
      {}
    );
    cd("../");
  }
}

nodemon
  .on("start", function() {
    success("Started local server");
  })
  .on("quit", function() {
    success("Stopped local server");
    process.exit();
  })
  .on("restart", files => {
    info("Restarted local server due to:", files);
  });
