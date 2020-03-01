import { Command } from "@oclif/command";

export default class Hello extends Command {
  static description = "describe the command here";

  static examples = [
    `$ staart hello
hello world from ./src/hello.ts!
`
  ];

  static args = [{ name: "repo" }];

  async run() {
    const { args } = this.parse(Hello);
    if (!args.repo)
      throw new Error("Provide repo name (e.g., staart update api)");
    this.log("Starting Staart update...");
  }
}
