import * as mongoose from "mongoose";
import {Container, interfaces} from "inversify";
import {Model} from "mongoose";
import {InterfaceTypes} from "../types/InterfaceTypes.js";
import {IBibleEntity} from "../models/BibleModel/types/IBibleEntity.js";
import {BibleSchema} from "../models/BibleModel/BibleSchema.js";
import {IBookListEntity} from "../models/BookListModel/types/IBookListEntity.js";
import {BookListSchema} from "../models/BookListModel/BookListSchema.js";

export default async function setupMongoose(container: Container) {
  const mongooseClient = await mongoose.connect(process.env.MONGO_URL);
  container.bind<typeof mongoose>(InterfaceTypes.databases.Mongoose).toConstantValue(mongooseClient)

  container.bind<Model<IBibleEntity>>(InterfaceTypes.models.BibleModel).toDynamicValue((context: interfaces.Context) => {
    const schema: mongoose.Schema<IBibleEntity> = addVirtuals(BibleSchema)
    const mongooseClient = context.container.get<typeof mongoose>(InterfaceTypes.databases.Mongoose)
    return mongooseClient.model('Bible', schema)
  })

  container.bind<Model<IBookListEntity>>(InterfaceTypes.models.BookListModel).toDynamicValue((context: interfaces.Context) => {
    const schema: mongoose.Schema<IBookListEntity> = addVirtuals(BookListSchema)
    const mongooseClient = context.container.get<typeof mongoose>(InterfaceTypes.databases.Mongoose)
    return mongooseClient.model('BookList', schema)
  })
}

const addVirtuals = (schema: mongoose.Schema): mongoose.Schema => {
  schema.set('toObject', {
    virtuals: true,
  })
  schema.set('toJSON', {
    virtuals: true,
  })
  return schema
}