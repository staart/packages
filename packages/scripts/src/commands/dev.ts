import { Command } from "@oclif/command";
import { exec, cd } from "shelljs";
import { success, pending } from "@staart/errors";
import { watch } from "fs-extra";
import { join } from "path";
import child_process from "child_process";

export default class Dev extends Command {
  static description =
    "start a local development server for your Staart API app";

  async run() {
    exec("staart build");
    success("Completed build process");
    let nodeProcess = child_process.exec("node dist/src/__staart.js");
    const sourceFilesWatcher = watch(join("src"));
    sourceFilesWatcher.on("change", () => {
      pending("Rebuilding app...");
      exec("staart build-babel");
    });
    const distFilesWatcher = watch(join("dist"));
    distFilesWatcher.on("change", () => {
      pending("Relaunching app...");
      nodeProcess.kill();
      nodeProcess = child_process.exec("node dist/src/__staart.js");
    });
  }
}
