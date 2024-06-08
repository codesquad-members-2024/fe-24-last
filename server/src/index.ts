import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import Article from './models/Article.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import articleRouter from './routes/articleRouter.js';

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || '';
const app: Express = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/article', articleRouter);

mongoose
  .connect(MONGO_DB_URL)
  .then(() => console.log('mongoDB connected'))
  .catch((err: Error) => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('conected succesfully');
  initializeDb();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const initializeDb = async () => {
  await Article.deleteMany();
  const articleCount = await Article.countDocuments();

  if (articleCount === 0) {
    try {
      await Article.insertMany({
        id: 1,
        content: [
          {
            type: 'header',
            level: 2,
            content: 'Hello World',
          },
          {
            type: 'paragraph',
            content: 'This is a simple paragraph.',
          },
          {
            type: 'ordered-list',
            items: [
              {
                type: 'ol-item',
                content: 'First Item',
              },
              {
                type: 'ol-item',
                content: 'Second Item',
              },
              {
                type: 'ol-item',
                content: 'Third Item',
              },
            ],
          },
          {
            type: 'ul-item',
            content: 'First Item',
          },
          {
            type: 'ul-item',
            content: 'Second Item',
          },
          {
            type: 'ul-item',
            content: 'Third Item',
          },
          {
            type: 'ordered-list',
            items: [
              {
                type: 'ol-item',
                content: 'First Item',
              },
              {
                type: 'ol-item',
                content: 'Second Item',
              },
              {
                type: 'ol-item',
                content: 'Third Item',
              },
            ],
          },
        ],
        updatedAt: '2024-06-03T19:00:00+09:00',
      });
      console.log('article successfully initialized');
    } catch (error) {
      console.error(error);
    }
  }
};
