import express, { Request, Response, Router } from 'express';
import Article from '../models/Article.js';
import { CustomRequest } from '../index.js';
import Teamspace from '../models/Teamspace.js';

const articleRouter: Router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /teamspace/{teamspaceId}/article/{articleId}:
 *   get:
 *     tags:
 *       - article
 *     summary: 아티클 조회
 *     description: 팀 스페이스 ID와 아티클 ID를 사용하여 아티클 정보를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: teamspaceId
 *         schema:
 *           type: string
 *         required: true
 *         description: 팀 스페이스 ID
 *       - in: path
 *         name: articleId
 *         schema:
 *           type: string
 *         required: true
 *         description: 아티클 ID
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: 팀 스페이스 또는 아티클을 찾을 수 없습니다.
 *       500:
 *         description: 서버 에러
 */
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

/**
 * @swagger
 * /teamspace/{teamspaceId}/article:
 *   post:
 *     tags:
 *       - article
 *     summary: 아티클 생성
 *     description: 팀 스페이스에 새로운 아티클을 생성합니다.
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
 *                 description: 아티클 제목
 *               content:
 *                 $ref: '#/components/schemas/Block'
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: 아티클이 성공적으로 생성되었습니다.
 *       400:
 *         description: 제목과 내용은 필수입니다.
 *       404:
 *         description: 팀 스페이스를 찾을 수 없습니다.
 *       500:
 *         description: 서버 에러
 */
articleRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { teamspaceId } = req.params;

    const teamspace = await Teamspace.findOne({ _id: teamspaceId });
    if (!teamspace) {
      return res.status(404).json({ message: 'Teamspace not found' });
    }

    const defaultBlock = { type: 'paragraph', content: '내용 없음' };
    const newArticle = new Article({ title: '제목 없음', content: [defaultBlock] });
    await newArticle.save();

    teamspace.articles.push(newArticle);
    await teamspace.save();

    const io = (req as unknown as CustomRequest).io;
    if (io) io.emit(`teamspace-${teamspaceId}`, teamspace);

    res.status(201).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /teamspace/{teamspaceId}/article/{articleId}:
 *   patch:
 *     tags:
 *       - article
 *     summary: 아티클 수정
 *     description: 팀 스페이스 ID와 아티클 ID를 사용하여 아티클 내용을 수정합니다.
 *     parameters:
 *       - in: path
 *         name: teamspaceId
 *         schema:
 *           type: string
 *         required: true
 *         description: 팀 스페이스 ID
 *       - in: path
 *         name: articleId
 *         schema:
 *           type: string
 *         required: true
 *         description: 아티클 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 $ref: '#/components/schemas/Block'
 *     responses:
 *       200:
 *         description: 아티클이 성공적으로 수정되었습니다.
 *       404:
 *         description: 팀 스페이스 또는 아티클을 찾을 수 없습니다.
 *       500:
 *         description: 서버 에러
 */
articleRouter.patch('/:articleId', async (req: Request, res: Response) => {
  try {
    const { teamspaceId, articleId } = req.params;
    const { title, content } = req.body;

    const teamspace = await Teamspace.findOne({ _id: teamspaceId }).populate('articles');
    if (!teamspace) {
      return res.status(404).json({ message: 'Teamspace not found' });
    }

    const article = teamspace.articles.find((article) => article._id.toString() === articleId);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    article.title = title || article.title;
    article.content = content || article.content;
    article.updatedAt = Date.now().toString();
    await teamspace.save();

    const io = (req as unknown as CustomRequest).io;
    if (io) {
      io.emit(`article-${article._id}`, article);
      io.emit(`teamspace-${teamspaceId}`);
    }

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /teamspace/{teamspaceId}/article/{articleId}:
 *   delete:
 *     tags:
 *       - article
 *     summary: 아티클 삭제
 *     description: 팀 스페이스 ID와 아티클 ID를 사용하여 아티클을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: teamspaceId
 *         schema:
 *           type: string
 *         required: true
 *         description: 팀 스페이스 ID
 *       - in: path
 *         name: articleId
 *         schema:
 *           type: string
 *         required: true
 *         description: 아티클 ID
 *     responses:
 *       200:
 *         description: 아티클이 성공적으로 삭제되었습니다.
 *       404:
 *         description: 팀 스페이스 또는 아티클을 찾을 수 없습니다.
 *       500:
 *         description: 서버 에러
 */
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
    if (io) io.emit(`teamspace-${teamspaceId}`, teamspace);

    res.status(200).json({ message: 'Article successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default articleRouter;
