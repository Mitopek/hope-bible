import {IApiRequest} from "../../../types/IApiRequest.js";
import {IApiResponse} from "../../../types/IApiResponse.js";
import {Request, Response, NextFunction} from "express";

export interface IResponseMiddleware {
  handler(req: Request, res: Response, next: NextFunction): void
}