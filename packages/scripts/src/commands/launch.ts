import { Command } from "@oclif/command";
import { exec } from "shelljs";

export default class Launch extends Command {
  static description = "launch the Staart API app";

  async run() {
    exec("node dist/src/index.js");
  }
}
