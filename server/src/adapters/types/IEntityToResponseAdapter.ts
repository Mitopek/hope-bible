import {IBibleEntity} from "../../models/BibleModel/types/IBibleEntity.js";
import {IBibleResponseEntity} from "./responseEntities/IBibleResponseEntity.js";

export interface IEntityToResponseAdapter {
  mapBibleToResponseEntity(bible: IBibleEntity): IBibleResponseEntity
}