import { cd, exec } from "shelljs";
import { join } from "path";
import { readdir } from "fs-extra";

const updateDependencies = async () => {
  const packages = await readdir(join("..", "packages"));
  for await (const dir of packages) {
    console.log(`Updating dependencies for @staart/${dir}`);
    cd(join("..", "packages", dir));
    exec("pnpx updates -ui && pnpm i");
    cd("../../scripts");
  }
};

updateDependencies();
