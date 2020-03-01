import { Command } from "@oclif/command";
import { exec, touch, mkdir, cp } from "shelljs";

export default class Build extends Command {
  static description = "build your Staart API app";

  async run() {
    touch(".env");
    mkdir("-p", "dist");
    cp(".env", "dist/.env");
    exec("staart controllers");
    exec("tsc");
  }
}
