import express from 'express';
import "reflect-metadata";
import 'dotenv/config'
import setupRoutes from "./setup/setupRoutes.js";
import setupContainer from "./setup/setupContainer.js";

const app = express();
const container = await setupContainer()

const apiRouter = express.Router()

app.use('/api', apiRouter);

setupRoutes(apiRouter, container)

app.listen(process.env.API_PORT, () => {
  console.log('Server is running on port 3000');
})