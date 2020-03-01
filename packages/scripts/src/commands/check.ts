import { Command } from "@oclif/command";
import axios from "axios";
import { readFile } from "fs-extra";
import { join } from "path";

const versionToNum = (version: string) => parseInt(version.replace(/\./g, ""));

export default class Check extends Command {
  static description = "check for Staart updates";

  async run() {
    const yourPkg = JSON.parse(
      (await readFile(join("package.json"))).toString()
    );
    const pkg = (
      await axios.get(
        "https://raw.githubusercontent.com/staart/api/master/package.json"
      )
    ).data;
    const v = yourPkg["staart-version"];
    if (versionToNum(v) < versionToNum(pkg.version)) {
      this.log("Most recent version is", pkg.version);
      this.log("Your version is", v);
      this.log(`🚨  Staart update required (v)"`);
    }
  }
}
