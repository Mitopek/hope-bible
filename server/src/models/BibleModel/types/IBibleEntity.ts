import {IEntity} from "../../types/IEntity.js";

export interface IBibleEntity extends IEntity{
  abbreviation: string,
  description: string,
  name: string,
  language: string,
}