import {Request, Response} from "express";

export interface IBibleController {
  getBibles(req: Request, res: Response): Promise<Response>
  getChapter(req: Request, res: Response): Promise<Response>
}