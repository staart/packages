import { Command } from "@oclif/command";
import { join } from "path";
import { readFileSync, readdirSync, writeFile } from "fs-extra";
import recursive from "recursive-readdir";
import { success, pending } from "@staart/errors";
import { parse } from "yaml";
import { config } from "dotenv";
config();

const SRC = join("src");
let server = readFileSync(join(SRC, "server.ts")).toString();

const generateControllers = async () => {
  const controllers = (await recursive(join(SRC, "controllers"))).map(
    file => file.split(join(SRC, "controllers").toString())[1]
  );
  const exportName: string[] = [];
  const generatedName: string[] = [];
  controllers.forEach((controller, index) => {
    const controllerFile = readFileSync(
      join(SRC, "controllers", controller)
    ).toString();
    exportName.push(controllerFile.split("export class ")[1].split(" ")[0]);
    generatedName.push(`Controller${index}`);
  });
  const importCode = `${exportName
    .map(
      (e, i) =>
        `import { ${e} as ${generatedName[i]} } from "./controllers${
          controllers[i].split(".ts")[0]
        }";`
    )
    .join("\n")}`;
  const insertCode = `
    // start automatic code
    super.addControllers([${generatedName
      .map(e => `new ${e}()`)
      .join(", ")}], undefined, () => asyncHandler);
    // staart-autogenerated
  `;
  server =
    importCode + server.replace("// staart:setup/controllers", insertCode);
  success("Generated paths");
};

const generateRedirects = async () => {
  let redirects: string[] = [];
  try {
    redirects = parse(readFileSync(join(SRC, "redirects.yml")).toString());
  } catch (error) {
    success("Processed no redirect rules");
  }
  const redirectCode = `
    ${redirects
      .map(
        rule => `
      this.app.get("${rule.split(" ")[0]}", (req, res) => res.redirect("${
          rule.split(" ")[1]
        }"));
    `
      )
      .join("")}
      // staart-autogenerated
  `;
  server = server.replace("// staart-autogenerated", redirectCode);
  if (redirects.length) success(`Processed ${redirects.length} redirect rules`);
};

const generateCrons = async () => {
  const crons = readdirSync(join(SRC, "crons"));
  const cronImport = crons
    .map(
      cronFile =>
        `import cron_${cronFile.split(".ts")[0]} from "./crons/${
          cronFile.split(".ts")[0]
        }";`
    )
    .join("\n");
  const cronCode = `
  ${crons.map(cronFile => `cron_${cronFile.split(".ts")[0]}();`).join("")}
  `;
  server = cronImport + "\n" + cronCode + "\n" + server;
  if (crons.length) success(`Setup ${crons.length} cron jobs`);
};

const generateStaticFiles = async () => {
  const files = await recursive(join(SRC, "..", "static"));
  const staticFiles = files.map(
    file => file.split(join(SRC, "..", "static").toString())[1]
  );
  const staticCode = `
    ${staticFiles
      .map(
        staticFile => `
      this.app.get("${staticFile}", (req, res) => res.sendFile(join("static", "${staticFile}")));
    `
      )
      .join("")}
      // staart-autogenerated
  `;
  server = server.replace("// staart-autogenerated", staticCode);
  success(`Serving ${staticFiles.length} static files`);
};

const writeServerFile = async () => {
  await writeFile(
    join(SRC, "app.ts"),
    server.replace("// staart-autogenerated", "")
  );
  success("Generated app.ts file");
};

export default class Controllers extends Command {
  static description = "setup Staart API app controller";

  async run() {
    await generateControllers();
    await generateRedirects();
    await generateCrons();
    await generateStaticFiles();
    await writeServerFile();
    pending("Compiling TypeScript");
  }
}
