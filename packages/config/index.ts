import { config as configDotEnv } from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";
configDotEnv();

let staartRc = {};
try {
  staartRc = JSON.parse(readFileSync(join(".", ".staartrc")).toString());
} catch (error) {}

export const config: { [index: string]: any } = { ...staartRc, ...process.env };

export const getConfig = (key?: string) => (key ? config[key] : config);
