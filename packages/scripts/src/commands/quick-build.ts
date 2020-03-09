import { Command } from "@oclif/command";
import { exec, cd, rm } from "shelljs";
import { join, resolve } from "path";
import { writeFile } from "fs-extra";

const DIR = resolve(join(".staart"));

export default class QuickBuild extends Command {
  static description = "build your Staart API app";

  async run() {
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
    cd(".staart");
    exec(
      'babel src --out-dir ../dist --extensions ".ts,.tsx" --source-maps inline'
    );
    cd("../");
  }
}
