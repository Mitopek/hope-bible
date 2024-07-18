export const InterfaceTypes = {
  adapters: {
    EntityToResponseAdapter: Symbol.for('EntityToResponseAdapter'),
  },
  controllers: {
    BibleController: Symbol.for('BibleController'),
  },
  middlewares: {
    ApiResponseMiddleware: Symbol.for('ApiResponseMiddleware'),
  },
  services: {
    BibleService: Symbol.for('BibleService'),
  },
  repositories: {
    BibleRepository: Symbol.for('BibleRepository'),
  },
  databases: {
    Mongoose: Symbol.for('Mongoose'),
  },
  models: {
    BibleModel: Symbol.for('BibleModel'),
    BookListModel: Symbol.for('BookListModel'),
  },
};