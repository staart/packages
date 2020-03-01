import { Command } from "@oclif/command";

const versionToNum = (version: string) => parseInt(version.replace(/\./g, ""));

export default class CheckUpdate extends Command {
  static description = "describe the command here";

  async run() {
    const checkUpdate = async () => {
      const pkg = (await axios.get(packageUrl)).data;
      const v = yourPkg["staart-version"];
      if (versionToNum(v) < versionToNum(pkg.version)) {
        this.log("Most recent version is", pkg.version);
        this.log("Your version is", v);
        this.log(`🚨  Staart update required (v)"`);
      }
      const i = JSON.parse(
        (
          await fs.readFile(path.join(__dirname, "..", "package.json"))
        ).toString()
      );
    };
  }
}
