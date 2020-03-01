import { Command } from "@oclif/command";
import { exec } from "shelljs";

export default class Start extends Command {
  static description = "build and launch Staart API app";

  async run() {
    exec("staart build");
    exec("staart launch");
  }
}
