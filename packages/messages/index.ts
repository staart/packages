import { CREATED, NO_CONTENT, OK } from "http-status-codes";
// import { Request, Response } from "express";

// General resource statuses messages
export const RESOURCE_CREATED = `${CREATED}/resourced`;
export const RESOURCE_UPDATED = `${OK}/updated`;
export const RESOURCE_DELETED = `${OK}/deleted`;
export const NO_CONTENT_CODE = NO_CONTENT;

// Function to convert message to result object
export const getMessage = (message: string, lang = "en") => {};

export const respond = (message: string, req: Request, res: Response) => {
  const code =
    message.includes("/") && !isNaN(parseInt(message.split("/")[0]))
      ? message.split("/")[0]
      : OK;
  message =
    message.includes("/") &&
    !isNaN(parseInt(message.split("/")[0])) &&
    message.split("/").length > 1
      ? message.split("/")[1]
      : message;
  const resultObject = {
    code,
    message
  };
  return resultObject;
  // return res.status(code).json(resultObject);
};
