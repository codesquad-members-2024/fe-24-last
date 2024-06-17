import express, { Request, Response, Router } from 'express';
import Teamspace from '../models/Teamspace.js';
import articleRouter from './articleRouter.js';
import Article from '../models/Article.js';
import { Server } from 'socket.io';
import { CustomRequest } from '../index.js';

const teamspaceRouter = (io: Server): Router => {
  const router = express.Router();

  /**
   * @swagger
   * /teamspaces/{teamspaceId}:
   *   get:
   *     tags:
   *       - teamspace
   *     summary: 팀 스페이스 조회
   *     description: 팀 스페이스 ID를 사용하여 팀 스페이스 정보를 조회합니다.
   *     parameters:
   *       - in: path
   *         name: teamspaceId
   *         schema:
   *           type: string
   *         required: true
   *         description: 팀 스페이스 ID
   *     responses:
   *       200:
   *         description: 성공
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Teamspace'
   *       404:
   *         description: 팀 스페이스를 찾을 수 없습니다.
   *       500:
   *         description: 서버 에러
   */
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

  /**
   * @swagger
   * /teamspaces:
   *   post:
   *     tags:
   *       - teamspace
   *     summary: 팀 스페이스 생성
   *     description: 새로운 팀 스페이스를 생성합니다.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 description: 팀 스페이스 이름
   *             required:
   *               - title
   *     responses:
   *       201:
   *         description: 팀 스페이스가 성공적으로 생성되었습니다.
   *       400:
   *         description: 유효하지 않은 팀 스페이스 이름
   *       409:
   *         description: 중복된 팀 스페이스 이름
   *       500:
   *         description: 서버 에러
   */
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

  /**
   * @swagger
   * /teamspaces/{teamspaceId}:
   *   patch:
   *     tags:
   *       - teamspace
   *     summary: 팀 스페이스 수정
   *     description: 팀 스페이스 ID를 사용하여 팀 스페이스 이름을 수정합니다.
   *     parameters:
   *       - in: path
   *         name: teamspaceId
   *         schema:
   *           type: string
   *         required: true
   *         description: 팀 스페이스 ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 description: 새로운 팀 스페이스 이름
   *             required:
   *               - title
   *     responses:
   *       200:
   *         description: 팀 스페이스가 성공적으로 수정되었습니다.
   *       400:
   *         description: 유효하지 않은 팀 스페이스 ID 또는 이름
   *       404:
   *         description: 팀 스페이스를 찾을 수 없습니다.
   *       500:
   *         description: 서버 에러
   */
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

  /**
   * @swagger
   * /teamspaces/{teamspaceId}:
   *   delete:
   *     tags:
   *       - teamspace
   *     summary: 팀 스페이스 삭제
   *     description: 팀 스페이스 ID를 사용하여 팀 스페이스를 삭제합니다.
   *     parameters:
   *       - in: path
   *         name: teamspaceId
   *         schema:
   *           type: string
   *         required: true
   *         description: 팀 스페이스 ID
   *     responses:
   *       200:
   *         description: 팀 스페이스가 성공적으로 삭제되었습니다.
   *       404:
   *         description: 팀 스페이스를 찾을 수 없습니다.
   *       500:
   *         description: 서버 에러
   */
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
