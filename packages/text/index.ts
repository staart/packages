import { config } from "dotenv";
import anonymize from "ip-anonymize";
import Hashids from "hashids/cjs";
import slugifyString from "slugify";
import cryptoRandomString from "crypto-random-string";
import ms from "ms";
import ipRangeCheck from "ip-range-check";

config();

export { ms, ipRangeCheck };
export { isMatch } from "matcher";
export {
  setRandomFallback,
  genSalt,
  hash,
  compare,
  getRounds,
  getSalt,
  encodeBase64,
  decodeBase64
} from "bcryptjs";

const HASH_IDS = process.env.HASH_IDS || "";
const HASH_ID_PREFIX = process.env.HASH_ID_PREFIX || "";

const hashIds = new Hashids(
  HASH_IDS,
  10,
  "abcdefghijklmnopqrstuvwxyz1234567890"
);

export const generateHashId = (id: string) =>
  `${HASH_ID_PREFIX}${hashIds.encode(id)}`;

export const hashIdToId = (id: string | number): string => {
  if (typeof id === "number") return id.toString();
  if (id.startsWith(HASH_ID_PREFIX)) {
    const numberId = parseInt(
      hashIds.decode(id.replace(HASH_ID_PREFIX, "")).join("")
    );
    if (isNaN(numberId)) {
      const newId = parseInt(id);
      if (isNaN(newId)) {
        return id;
      } else {
        return newId.toString();
      }
    } else {
      return numberId.toString();
    }
  }
  return id;
};

export const slugify = (
  name: string,
  options?: {
    replacement?: string;
    remove?: RegExp;
    lower?: boolean;
  }
) => slugifyString(name, options || { lower: true, strict: true });

export const createSlug = (name: string) =>
  `${slugifyString(name, {
    lower: true
  }).replace(/'|"/g, "")}-${cryptoRandomString({ length: 5 })}`;

/**
 * Anonymize an IP address
 */
export const anonymizeIpAddress = (ipAddress: string) =>
  anonymize(ipAddress) || ipAddress;

/**
 * Capitalize each first letter in a string
 */
export const capitalizeEachFirstLetter = (string: string) =>
  (string = string
    .toLowerCase()
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.toLowerCase().substring(1))
    .join(" "));

/**
 * Capitalize the first letter of each word in a string
 */
export const capitalizeFirstAndLastLetter = (string: string) => {
  const words = string.split(" ");
  words[0] = capitalizeFirstLetter(words[0]);
  words[words.length - 1] = capitalizeFirstLetter(words[words.length - 1]);
  return words.join(" ");
};

/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);

/**
 * Convert a JS Date to MySQL-compatible datetime
 */
export const dateToDateTime = (date: Date) =>
  date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

export const randomString = cryptoRandomString;
