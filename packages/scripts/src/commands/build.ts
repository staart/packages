import { Command } from "@oclif/command";
import { exec, touch, mkdir, cp } from "shelljs";
import { join, resolve } from "path";
import { readFile, writeFile, readJson } from "fs-extra";
import recursive from "recursive-readdir";
import { success } from "@staart/errors";

const SRC = resolve(join(".staart", "src"));

const replaceEnd = (text: string, find: string, replace: string) =>
  text.endsWith(find) ? `${text.slice(0, -1 * find.length)}${replace}` : text;

export default class Build extends Command {
  static description = "build your Staart API app";
  static args = [{ name: "skip-tsc" }];

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
    cp(".env", ".staart/prisma/.env");
    cp(".staartrc", ".staart/.staartrc");
    cp("-r", "src", ".staart");
    cp("-r", "static", ".staart");
    cp("package.json", ".staart");
    await updateControllerCode();
    exec("staart controllers");

    const typeScriptConfig = {
      moduleResolution: "node ",
      target: "es6 ",
      module: "commonjs ",
      strict: "true ",
      sourceMap: "true ",
      declaration: "true ",
      esModuleInterop: "true ",
      allowSyntheticDefaultImports: "true ",
      experimentalDecorators: "true ",
      resolveJsonModule: "true ",
      emitDecoratorMetadata: "true ",
      declarationDir: "./dist ",
      outDir: "./dist",
      ...(staartRc.tsconfig || {}),
    };

    let tsString = "";
    Object.keys(typeScriptConfig).forEach((key) => {
      tsString += `--${key} ${typeScriptConfig[key]}`;
    });

    const { args } = this.parse(Build);
    if (args["skip-tsc"]) return;

    // See https://github.com/microsoft/TypeScript/issues/27379
    exec(
      `tsc ${tsString} --lib esnext --lib dom --typeRoots ./src/@types --typeRoots node_modules/@types .staart/**/*.ts`
    );
  }
}

// https://stackoverflow.com/a/38181008/1656944
const insert = <T = string>(arr: T[], index: number, ...newItems: T[]) => [
  ...arr.slice(0, index),
  ...newItems,
  ...arr.slice(index),
];

export const updateControllerCode = async () => {
  const controllers = await recursive(join(SRC, "controllers"));
  const controllerClassName = `Controller${
    Math.random().toString().split(".")[1]
  }`;
  for await (const controller of controllers) {
    let oneController = (await readFile(controller)).toString().split("\n");

    const hasjsonAsyncResponse = oneController.findIndex((line) =>
      line.includes("jsonAsyncResponse")
    );
    const hasClassWrapper = oneController.findIndex((line) =>
      line.includes("ClassWrapper")
    );
    const hasClassOptions = oneController.findIndex((line) =>
      line.includes("ClassOptions")
    );

    if (hasjsonAsyncResponse === -1) {
      oneController = insert(
        oneController,
        0,
        `import { jsonAsyncResponse } from "@staart/server";`
      );
    }

    if (hasClassWrapper === -1) {
      oneController = insert(
        oneController,
        0,
        `import { ClassWrapper } from "@staart/server";`
      );
    }

    if (hasClassOptions === -1) {
      oneController = insert(
        oneController,
        0,
        `import { ClassOptions } from "@staart/server";`
      );
    }

    oneController = insert(
      oneController,
      0,
      `import { Controller as ${controllerClassName} } from "@staart/server";`
    );

    const controllerIndex = oneController.findIndex((line) =>
      line.startsWith("export class")
    );
    const controllerPathName = replaceEnd(
      replaceEnd(controller.split("src/controllers/")[1], ".ts", ""),
      "/index",
      ""
    ).replace(/_/g, ":");
    oneController = insert(
      oneController,
      controllerIndex,
      `@${controllerClassName}("${controllerPathName}")
@ClassWrapper(jsonAsyncResponse)\n@ClassOptions({ mergeParams: true })`
    );

    await writeFile(controller, oneController.join("\n"));
  }
  success("Added middleware to controllers");
};
