import {IBibleEntity} from "../../models/BibleModel/types/IBibleEntity.js";

export interface IBibleRepository {
  getBibles(): Promise<IBibleEntity[]>;
}