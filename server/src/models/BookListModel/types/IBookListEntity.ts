import {IEntity} from "../../types/IEntity.js";

export interface IBookListEntity extends IEntity{
  abbreviation: string,
  books: {
    abbreviation: string,
    name: string,
    part: {
      abbreviation: string,
      name: string,
    },
  }[],
}