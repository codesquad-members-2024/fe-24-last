import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { Server } from 'socket.io';
import setupSocket from './setup/socketSetup.js';
import { setupMongoDB } from './setup/dbSetup.js';
import mainRouter from './routes/mainRouter.js';
import teamspaceRouter from './routes/teamspaceRouter.js';
import swaggerSpec from './swagger/swaggerOptions.js';

export interface CustomRequest extends Request {
  io: Server;
}

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || '';
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const db = setupMongoDB(MONGO_DB_URL);
const { server, io } = setupSocket(app);

app.use('/', mainRouter);
app.use('/api/teamspace', teamspaceRouter(io));

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
