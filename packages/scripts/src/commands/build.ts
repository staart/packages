import { Command } from "@oclif/command";
import { exec, touch, mkdir, cp } from "shelljs";
import { join, resolve } from "path";
import { readFile, writeFile } from "fs-extra";
import recursive from "recursive-readdir";
import { success } from "@staart/errors";

const SRC = resolve(join(".staart", "src"));

export default class Build extends Command {
  static description = "build your Staart API app";

  async run() {
    touch(".env");
    mkdir("-p", ".staart");
    cp(".env", ".staart/.env");
    cp("-r", "src", ".staart");
    cp("-r", "static", ".staart");
    cp("package.json", ".staart");
    await updateControllerCode();
    exec("staart controllers");
    exec("tsc");
  }
}

// https://stackoverflow.com/a/38181008/1656944
const insert = <T = string>(arr: T[], index: number, ...newItems: T[]) => [
  ...arr.slice(0, index),
  ...newItems,
  ...arr.slice(index)
];

const updateControllerCode = async () => {
  const controllers = await recursive(join(SRC, "controllers"));
  for await (const controller of controllers) {
    let oneController = (await readFile(controller)).toString().split("\n");

    const hasjsonAsyncResponse = oneController.findIndex(line =>
      line.includes("jsonAsyncResponse")
    );
    const hasClassWrapper = oneController.findIndex(line =>
      line.includes("ClassWrapper")
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

    const controllerIndex = oneController.findIndex(line =>
      line.startsWith("@Controller")
    );
    oneController = insert(
      oneController,
      controllerIndex + 1,
      `@ClassWrapper(jsonAsyncResponse)`
    );

    await writeFile(controller, oneController.join("\n"));
  }
  success("Added middleware to controllers");
};
