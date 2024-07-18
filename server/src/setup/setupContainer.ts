import {Container} from "inversify";
import {IBibleController} from "../controllers/BibleController/types/IBibleController.js";
import {InterfaceTypes} from "../types/InterfaceTypes.js";
import {BibleController} from "../controllers/BibleController/BibleController.js";
import {IResponseMiddleware} from "../middlewares/ResponseMiddleware/types/IResponseMiddleware.js";
import {ApiResponseMiddleware} from "../middlewares/ResponseMiddleware/ApiResponseMiddleware.js";
import {BibleService} from "../services/BibleService.js";
import setupMongoose from "./setupMongoose.js";
import {BibleRepository} from "../repositories/BibleRepository.js";
import {EntityToResponseAdapter} from "../adapters/EntityToResponseAdapter.js";

export default async function setupContainer() {
  const container = new Container();

  //ADAPTERS
  container.bind(InterfaceTypes.adapters.EntityToResponseAdapter).to(EntityToResponseAdapter)

  //CONTROLLERS
  container.bind<IBibleController>(InterfaceTypes.controllers.BibleController).to(BibleController)

  //MIDDLEWARES
  container.bind<IResponseMiddleware>(InterfaceTypes.middlewares.ApiResponseMiddleware).to(ApiResponseMiddleware)

  //SERVICES
  container.bind(InterfaceTypes.services.BibleService).to(BibleService)

  //REPOSITORIES
  container.bind(InterfaceTypes.repositories.BibleRepository).to(BibleRepository)

  await setupMongoose(container)

  return container
}