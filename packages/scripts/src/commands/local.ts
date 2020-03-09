import { Command } from "@oclif/command";
import { exec, cd } from "shelljs";
import { join, resolve } from "path";
import { writeFile } from "fs-extra";

const DIR = resolve(join(".staart"));

export default class Local extends Command {
  static description = "build your Staart API app";

  async run() {
    exec("staart build");
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
    exec("nodemon --delay 10 ../dist/src/__staart.js", { async: true });
    cd(".staart");
    exec(
      'onchange "../src/**/*.ts" "../static/**/*" -- babel src --out-dir ../dist/src --extensions ".ts,.tsx" --source-maps inline'
    );
    cd("../");
  }
}
