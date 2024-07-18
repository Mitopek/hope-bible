import {IBookListEntity} from "./types/IBookListEntity.js";
import {Schema} from "mongoose";

export const BookListSchema = new Schema<IBookListEntity>({
  abbreviation: {
    type: Schema.Types.String,
    required: true,
  },
  books: {
    type: [new Schema({
      abbreviation: {
        type: Schema.Types.String,
        required: true,
      },
      name: {
        type: Schema.Types.String,
        required: true,
      },
      part: {
        abbreviation: {
          type: Schema.Types.String,
          required: true,
        },
        name: {
          type: Schema.Types.String,
          required: true,
        },
      },
    })],
    required: true,
  }
})
