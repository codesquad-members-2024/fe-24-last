import express, { Request, Response, Router } from 'express';
import Teamspace from '../models/Teamspace.js';
import articleRouter from './articleRouter.js';
import Article from '../models/Article.js';
import { Server } from 'socket.io';
import { CustomRequest } from '../index.js';

const teamspaceRouter = (io: Server): Router => {
  const router = express.Router();

  router.get('/:teamspaceId', async (req: Request, res: Response) => {
    try {
      const { teamspaceId } = req.params;

      const teamspace = await Teamspace.findOne({ _id: teamspaceId });
      if (!teamspace) return res.status(404).json({ message: 'Teamspace not found' });

      res.json(teamspace);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { title } = req.body;

      if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Invalid teamspace name' });
      }

      const isDuplicate = await Teamspace.findOne({ title });
      if (isDuplicate) {
        return res.status(409).json({ message: 'Teamspace name already exists' });
      }

      const defaultBlock = { type: 'paragraph', content: '내용 없음' };
      const defaultArticle = new Article({ title: '제목 없음', content: [defaultBlock], updatedAt: Date.now() });
      const newTeamspace = new Teamspace({ title, articles: [defaultArticle] });
      await newTeamspace.save();

      res.status(201).json({ message: 'Teamspace successfully created' });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.patch('/:teamspaceId', async (req: Request, res: Response) => {
    try {
      const { teamspaceId } = req.params;
      const teamspaceIdNumber = Number(teamspaceId);
      const { title } = req.body;

      if (isNaN(teamspaceIdNumber) || teamspaceIdNumber <= 0)
        return res.status(400).json({ message: 'Invalid teamspace ID' });

      if (!title || typeof title !== 'string' || title.trim() === '')
        return res.status(400).json({ message: 'Invalid teamspace name' });

      const updatedTeamspace = await Teamspace.findOneAndUpdate(
        {
          id: teamspaceIdNumber,
        },
        {
          title,
        },
        { new: true, runValidators: true }
      );

      if (!updatedTeamspace) return res.status(404).json({ message: 'Teamspace not found' });

      res.status(200).json(updatedTeamspace);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  router.delete('/:teamspaceId', async (req: Request, res: Response) => {
    try {
      const { teamspaceId } = req.params;
      const teamspaceIdNumber = Number(teamspaceId);

      const deletedTeamspace = await Teamspace.findOneAndDelete({ _id: teamspaceIdNumber });

      if (!deletedTeamspace) return res.status(404).json({ message: 'Teamspace not found' });

      res.status(200).json({ message: 'Teamspace successfully deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  router.use(
    '/:teamspaceId/article',
    (req, res, next) => {
      (req as unknown as CustomRequest).io = io;
      next();
    },
    articleRouter
  );

  return router;
};

export default teamspaceRouter;
