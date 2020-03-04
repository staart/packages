import { config } from "dotenv";
import helmet from "helmet";
import cors from "cors";
import responseTime from "response-time";
import { json, urlencoded } from "body-parser";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import RateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

export interface RawRequest extends Request {
  rawBody: string;
}

config();

export * from "@overnightjs/core";
export { asyncHandler, slowDown, RateLimit };
export { Request, Response, NextFunction, RequestHandler } from "express";

export const jsonAsyncResponse = async (
  method: (req: Request, res: Response) => Promise<any>
) => {
  return async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await method(req, res);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "some error occurred" });
    }
  };
};

export const setupMiddleware = (app: any) => {
  if (!process.env.DISALLOW_OPEN_CORS)
    app.use(
      cors({
        maxAge: process.env.CORS_MAXAGE
          ? parseInt(process.env.CORS_MAXAGE)
          : 600
      })
    );
  if (!process.env.DISABLE_HELMET)
    app.use(
      helmet(
        process.env.HELMET_CONFIG
          ? JSON.parse(process.env.HELMET_CONFIG)
          : { hsts: { maxAge: 31536000, preload: true } }
      )
    );
  if (!process.env.DISABLE_RESPONSE_TIME) app.use(responseTime());
  app.use(urlencoded({ extended: true }));
  app.use(
    json({
      verify: (request: RawRequest, response, buffer) => {
        if (request.query.raw) {
          request.rawBody = buffer.toString();
        }
      }
    })
  );
};
