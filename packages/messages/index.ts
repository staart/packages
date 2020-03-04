import { config } from "dotenv";
import { OK } from "http-status-codes";
import en from "./locales/en";

config();

const m = (string?: string, data?: { [index: string]: string }) =>
  string && data
    ? Object.entries(data).reduce(
        (r, [k, v]) => r.replace(new RegExp(`{{\\s*${k}\\s*}}`, "g"), v),
        string
      )
    : undefined;

const ucFirst = (string?: string) =>
  string ? string.charAt(0).toUpperCase() + string.slice(1) : undefined;

// Function to convert message to result object
export const getText = (message: string, lang = "en") => {
  switch (lang) {
    case "en":
      return en[message];
    default:
      return;
  }
};

export const respond = (
  message: string,
  data?: { [index: string]: string }
) => {
  const code =
    message.includes("/") && !isNaN(parseInt(message.split("/")[0]))
      ? parseInt(message.split("/")[0])
      : OK;
  const messageWithoutCode =
    message.includes("/") &&
    !isNaN(parseInt(message.split("/")[0])) &&
    message.split("/").length > 1
      ? message.split("/")[1]
      : message;
  const success =
    !code.toString().startsWith("4") && !code.toString().startsWith("5");
  const resultObject = {
    code,
    success,
    message: messageWithoutCode,
    text: ucFirst(m(getText(message, "en"), { resource: "resource", ...data }))
  };
  return resultObject;
};

export * from "./messages";
