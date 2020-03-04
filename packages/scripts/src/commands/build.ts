import { Command } from "@oclif/command";
import { exec, touch, mkdir, cp } from "shelljs";

export default class Build extends Command {
  static description = "build your Staart API app";

  async run() {
    touch(".env");
    mkdir("-p", ".staart");
    cp(".env", ".staart/.env");
    cp("-r", "src", ".staart");
    exec("staart controllers");
    exec("tsc");
  }
}
