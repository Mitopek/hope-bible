import {IEntityToResponseAdapter} from "./types/IEntityToResponseAdapter.js";
import {IBibleEntity} from "../models/BibleModel/types/IBibleEntity.js";
import {IBibleResponseEntity} from "./types/responseEntities/IBibleResponseEntity.js";
import {injectable} from "inversify";

@injectable()
export class EntityToResponseAdapter implements IEntityToResponseAdapter {
  mapBibleToResponseEntity(bible: IBibleEntity): IBibleResponseEntity {
    return {
      id: bible.id,
      name: bible.name,
      abbreviation: bible.abbreviation,
    }
  }
}