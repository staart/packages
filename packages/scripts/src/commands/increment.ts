import { Command } from "@oclif/command";
import { readFile, writeFile } from "fs-extra";
import { join } from "path";

export default class Increment extends Command {
  static description = "increment the package.json version";

  async run() {
    const pkg = JSON.parse((await readFile(join("package.json"))).toString());
    if (!pkg) return;
    const newVersion = pkg.version
      .split(".")
      .map((a: string, i: number) => (i === 2 ? parseInt(a) + 1 : a))
      .join(".");
    pkg.version = newVersion;
    if (pkg.name.startsWith("@staart/")) pkg["staart-version"] = newVersion;
    await writeFile(join("package.json"), JSON.stringify(pkg, null, 2));
  }
}
