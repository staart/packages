import { Command } from "@oclif/command";
import { exec, touch, mkdir, cp } from "shelljs";
import { success, pending } from "@staart/errors";
import watch from "node-watch";
import { join } from "path";
import child_process from "child_process";
import kill from "tree-kill";

export default class Dev extends Command {
  static description =
    "start a local development server for your Staart API app";

  async run() {
    exec("staart build");
    success("Completed build process");
    let PID = 0;
    const nodeProcess = child_process.exec(
      "node dist/src/__staart.js",
      (err, stdout) => {
        if (err) console.log(err);
        if (stdout) console.log(stdout);
      }
    );
    PID = nodeProcess.pid;
    success("Launched app");
    watch(join("src"), { recursive: true }, () => {
      pending("Rebuilding app...");
      touch(".env");
      mkdir("-p", ".staart");
      cp(".env", ".staart/.env");
      cp(".staartrc", ".staart/.staartrc");
      cp("-r", "src", ".staart");
      cp("-r", "static", ".staart");
      cp("package.json", ".staart");
      exec("staart controllers");
      exec("staart build-babel");
      kill(PID);
      success("Stopped app");
      setTimeout(() => {
        pending("Launching app...");
        const newProcess = child_process.exec(
          "node dist/src/__staart.js",
          (err, stdout) => (err ? console.log(err) : console.log(stdout))
        );
        PID = newProcess.pid;
      }, 2500);
    });
  }
}
