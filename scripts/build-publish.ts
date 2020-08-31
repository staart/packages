import { cd, exec } from "shelljs";
import { join } from "path";
import { readdir } from "fs-extra";

const buildPublish = async () => {
  const packages = await readdir(join("..", "packages"));
  for await (const dir of packages) {
    console.log(`Building @staart/${dir}`);
    cd(join("..", "packages", dir));
    exec("npm run build");
    console.log(`Publishing @staart/${dir}`);
    exec("npm --no-git-tag-version --force version patch && npm publish");
    cd("../../scripts");
  }
};

buildPublish();
