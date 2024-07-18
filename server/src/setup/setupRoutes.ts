import helmet from "helmet";
import cors from "cors";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import {Container} from "inversify";
import {Router} from "express";
import {IResponseMiddleware} from "../middlewares/ResponseMiddleware/types/IResponseMiddleware.js";
import {InterfaceTypes} from "../types/InterfaceTypes.js";
import {IBibleController} from "../controllers/BibleController/types/IBibleController.js";

export default function setupRoutes(apiRouter: Router, container: Container) {
  //TODO DEV ONLY
  apiRouter.use(cookieParser())
  apiRouter.use(helmet());
  const corsArray = ['https://www.holybible.pl', 'https://holybible.pl']
  apiRouter.use(cors({
    origin: [`${process.env.IP_CLIENT_HOST}`, `${process.env.CLIENT_HOST}`, `${process.env.API_HOST}/,${process.env.IP_API_HOST}/`, ...corsArray],
    credentials: true,
  }))
  apiRouter.use(bodyParser.json())
  apiRouter.use(bodyParser.urlencoded({extended: true}));

  const apiResponseMiddleware = container.get<IResponseMiddleware>(InterfaceTypes.middlewares.ApiResponseMiddleware)
  apiRouter.use(apiResponseMiddleware.handler.bind(apiResponseMiddleware))

  const bibleController = container.get<IBibleController>(InterfaceTypes.controllers.BibleController)
  apiRouter.get('/bible/bibles', bibleController.getBibles.bind(bibleController))
  apiRouter.get('/bible/chapter', bibleController.getChapter.bind(bibleController))
}