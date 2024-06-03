import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Article from './models/Article';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

mongoose
  .connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('mongoDB connected'))
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('conected succesfully');
  initializeDb();
});

app.get('/', async (req: Request, res: Response) => {
  try {
    const article = await Article.find();

    res.json(article);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const initializeDb = async () => {
  const articleCount = await Article.countDocuments();

  if (articleCount === 0) {
    try {
      await Article.insertMany({
        id: 1,
        content: '테스트 내용',
        updatedAt: '2024-06-03T19:00:00+09:00', //ISO 8601
      });
      console.log('article successfully initialized');
    } catch (error) {
      console.error(error);
    }
  }
};
