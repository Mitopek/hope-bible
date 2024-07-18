import {IBibleController} from "./types/IBibleController.js";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";
import {Response} from "express";
import {injectable, inject} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IBibleService} from "../../services/types/IBibleService.js";
import {IBibleRepository} from "../../repositories/types/IBibleRepository.js";
import {IEntityToResponseAdapter} from "../../adapters/types/IEntityToResponseAdapter.js";

@injectable()
export class BibleController implements IBibleController {
  constructor(
    @inject(InterfaceTypes.services.BibleService) private bibleService: IBibleService,
    @inject(InterfaceTypes.repositories.BibleRepository) private bibleRepository: IBibleRepository,
    @inject(InterfaceTypes.adapters.EntityToResponseAdapter) private entityToResponseAdapter: IEntityToResponseAdapter,
  ) {
  }

  public async getBibles(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const bibles = await this.bibleRepository.getBibles()
    return res.sendSuccessResponse(bibles.map(bible => this.entityToResponseAdapter.mapBibleToResponseEntity(bible)))
  }

  public async getChapter(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const {bibleShortname, book, chapter} = req.query

    const data = await this.bibleService.getChapter(String(bibleShortname), String(book), Number(chapter))

    return res.sendSuccessResponse(data)
  }
}