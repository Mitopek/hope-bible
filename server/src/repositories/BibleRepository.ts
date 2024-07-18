import {IBibleRepository} from "./types/IBibleRepository.js";
import {InterfaceTypes} from "../types/InterfaceTypes.js";
import {inject, injectable} from "inversify";
import {IBibleEntity} from "../models/BibleModel/types/IBibleEntity.js";
import {Model} from "mongoose";

@injectable()
export class BibleRepository implements IBibleRepository {
  constructor(
    @inject(InterfaceTypes.models.BibleModel) private bibleModel: Model<IBibleEntity>
  ) {
  }

  public async getBibles(): Promise<IBibleEntity[]> {
    return this.bibleModel.find()
  }
}