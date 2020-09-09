import { Command } from "@oclif/command";
import { exec, touch, mkdir, cp, cd } from "shelljs";
import { updateControllerCode } from "./build";
import { join, resolve } from "path";
import { writeJson, writeFile, readFile, readJson } from "fs-extra";

const DIR = resolve(join(".staart"));

export default class BuildBabel extends Command {
  static description = "build your Staart API app with Babel";

  async run() {
    let staartRc: any = {};
    try {
      staartRc = await readJson(join(".", ".staartrc"));
    } catch (error) {}

    touch(".env");
    let env = await readFile(".env", "utf8");
    Object.keys(staartRc.env || {}).forEach((i) => {
      env += `${i} = ${staartRc.env[i]}`;
    });
    await writeFile(".env", env);

    touch("static/robots.txt");
    let robots = await readFile("static/robots.txt", "utf8");
    (staartRc.robots || []).forEach((i: string) => {
      robots += `${i} = ${staartRc.robots[i]}`;
    });
    await writeFile("static/robots.txt", robots);

    mkdir("-p", ".staart");
    cp(".env", ".staart/.env");
    cp(".env", "./prisma/.env");
    cp(".staartrc", ".staart/.staartrc");
    cp("-r", "src", ".staart");
    cp("-r", "static", ".staart");
    cp("package.json", ".staart");
    await updateControllerCode();
    exec("staart controllers");

    const babelRc = {
      presets: ["@babel/env", "@babel/typescript"],
      plugins: [
        ["@babel/plugin-transform-runtime"],
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "@babel/proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
      ],
      ...(staartRc.babel || {}),
    };

    await writeJson(join(DIR, ".babelrc"), babelRc);
    cd(".staart");
    exec(
      'babel src --out-dir ../dist/src --extensions ".ts,.tsx" --source-maps inline'
    );
    cd("../");
  }
}
