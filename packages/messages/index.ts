import { CREATED, NO_CONTENT, OK } from "http-status-codes";
import { Request, Response } from "express";
import en from "./locales/en";

// General resource statuses messages
export const RESOURCE_CREATED = `${CREATED}/created`;
export const RESOURCE_UPDATED = `${OK}/updated`;
export const RESOURCE_DELETED = `${OK}/deleted`;
export const NO_CONTENT_CODE = NO_CONTENT;

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
  req: Request,
  res: Response,
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
  const resultObject = {
    code,
    message: messageWithoutCode,
    text: ucFirst(
      m(getText(message, req.params.lang), { resource: "resource", ...data })
    )
  };
  return res.status(code).json(resultObject);
};
