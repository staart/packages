import {} from "shelljs";
import { join } from "path";
import { readdir } from "fs-extra";

const updateDependencies = async () => {
  const packages = await readdir(join(".", "packages"));
  console.log(packages);
};

updateDependencies();
