import {IBibleEntity} from "./types/IBibleEntity.js";
import {Schema} from "mongoose";

export const BibleSchema = new Schema<IBibleEntity>({
  abbreviation: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  language: {
    type: Schema.Types.String,
    required: true,
  }
})
