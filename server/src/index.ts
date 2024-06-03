import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import Article from './models/Article';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

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

app.get('/api/article/:articleId', async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    const articleIdNumber = Number(articleId);

    if (isNaN(articleIdNumber)) return res.status(400).json({ message: 'Invalid article ID' });

    const article = await Article.findOne({ id: articleIdNumber });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/api/article/:articleId', async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;

    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      {
        content,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(updatedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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
        content: '테스트 내용\n테스트 내용2\n테스트 내용3',
        updatedAt: '2024-06-03T19:00:00+09:00',
      });
      console.log('article successfully initialized');
    } catch (error) {
      console.error(error);
    }
  }
};
