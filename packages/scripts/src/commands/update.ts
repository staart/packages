import { Command } from "@oclif/command";
import { which, exec } from "shelljs";

export default class Update extends Command {
  static description = "update this app from the staart repo";

  static examples = [
    `$ staart update api
Updating Staart...
`
  ];

  static args = [{ name: "repo" }];

  async run() {
    const { args } = this.parse(Update);
    if (!args.repo)
      throw new Error("Provide repo name (e.g., staart update api)");
    this.log("Updating Staart...");
    if (!which("git")) throw new Error(`"git" command is unavailable`);
    exec(`git pull https://github.com/staart/${args.repo}`);
    this.log("Staart is updated");
  }
}
