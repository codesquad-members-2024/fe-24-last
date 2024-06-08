import express, { Request, Response, Router } from 'express';
import Article from '../models/Article.js';
import { CustomRequest } from '../index.js';

const articleRouter: Router = express.Router();

articleRouter.get('/:articleId', async (req: Request, res: Response) => {
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

articleRouter.patch('/:articleId', async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    const articleIdNumber = Number(articleId);
    const { content } = req.body;

    const updatedArticle = await Article.findOneAndUpdate(
      { id: articleIdNumber },
      {
        content,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const io = (req as unknown as CustomRequest).io;
    if (io) {
      io.emit('articleUpdated', updatedArticle);
    }

    res.json(updatedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default articleRouter;
