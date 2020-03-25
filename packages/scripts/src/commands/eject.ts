import { Command } from "@oclif/command";
import { eject } from "eject-dependencies";

export default class Eject extends Command {
  static description = "eject the Staart API app";

  async run() {
    await eject({
      dependenciesFilter: dependencies => {
        return new Set(
          Array.from(dependencies).filter(dependency =>
            dependency.startsWith("@staart/")
          )
        );
      }
    });
  }
}
