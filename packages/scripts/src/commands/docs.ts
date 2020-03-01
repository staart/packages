import { Command } from "@oclif/command";
import { exec } from "shelljs";

export default class Docs extends Command {
  static description = "generate TypeDoc documentation site";

  async run() {
    exec("typedoc --out docs ./src");
  }
}
