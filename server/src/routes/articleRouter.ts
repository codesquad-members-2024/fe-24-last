import express, { Request, Response, Router } from 'express';
import Article from '../models/Article.js';
import { CustomRequest } from '../index.js';
import Teamspace from '../models/Teamspace.js';

const articleRouter: Router = express.Router({ mergeParams: true });

articleRouter.get('/:articleId', async (req: Request, res: Response) => {
  try {
    const { teamspaceId, articleId } = req.params;

    const teamspace = await Teamspace.findOne({ _id: teamspaceId }).populate('articles');
    if (!teamspace) return res.status(404).json({ message: 'Teamspace not found' });

    const article = teamspace.articles.find((article) => article._id.toString() === articleId);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

articleRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { teamspaceId } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const teamspace = await Teamspace.findOne({ _id: teamspaceId });
    if (!teamspace) {
      return res.status(404).json({ message: 'Teamspace not found' });
    }

    const newArticle = new Article({ title, content });
    await newArticle.save();

    teamspace.articles.push(newArticle._id);
    await teamspace.save();

    res.status(201).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

articleRouter.patch('/:articleId', async (req: Request, res: Response) => {
  try {
    const { teamspaceId, articleId } = req.params;
    const { content } = req.body;

    const teamspace = await Teamspace.findOne({ _id: teamspaceId }).populate('articles');
    if (!teamspace) {
      return res.status(404).json({ message: 'Teamspace not found' });
    }

    const article = teamspace.articles.find((article) => article._id.toString() === articleId);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    article.content = content || article.content;
    article.updatedAt = Date.now().toString();
    await teamspace.save();

    const io = (req as unknown as CustomRequest).io;
    if (io) {
      io.emit('articleUpdated', article);
    }

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

articleRouter.delete('/:articleId', async (req: Request, res: Response) => {
  try {
    const { teamspaceId, articleId } = req.params;

    const teamspace = await Teamspace.findOne({ _id: teamspaceId }).populate('articles');
    if (!teamspace) {
      return res.status(404).json({ message: 'Teamspace not found' });
    }

    const articleIndex = teamspace.articles.findIndex((article) => article._id.toString() === articleId);

    if (articleIndex === -1) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const article = teamspace.articles[articleIndex];
    await Article.findByIdAndDelete(article._id);

    teamspace.articles.splice(articleIndex, 1);
    await teamspace.save();

    const io = (req as unknown as CustomRequest).io;
    if (io) {
      io.emit('articleDeleted', articleId);
    }

    res.status(200).json({ message: 'Article successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default articleRouter;
