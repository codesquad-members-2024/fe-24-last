import express, { Request, Response, Router } from 'express';
import User from '../models/User.js';
import Teamspace from '../models/Teamspace.js';

const mainRouter: Router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - login
 *     summary: 로그인
 *     description: 닉네임을 입력하여 로그인
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: 성공
 *       400:
 *         description: 닉네임은 필수입니다.
 *       404:
 *         description: 닉네임이나 비밀번호가 유효하지 않습니다.
 *       500:
 *         description: 서버 에러
 */
mainRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { nickname } = req.body;

    if (!nickname) return res.status(400).json({ message: 'Nickname is required' });

    const user = await User.findOne({ nickname });
    if (!user) return res.status(404).json({ message: 'Invalid nickname or password' });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /registration:
 *   post:
 *     tags:
 *       - login
 *     summary: 회원가입
 *     description: 닉네임을 입력하여 회원가입
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: 성공
 *       400:
 *         description: 닉네임은 필수입니다.
 *       409:
 *         description: 중복된 닉네임입니다.
 *       500:
 *         description: 서버 에러
 */
mainRouter.post('/registration', async (req: Request, res: Response) => {
  try {
    const { nickname } = req.body;

    if (!nickname) return res.status(400).json({ message: 'Nickname is required' });

    const existingUser = await User.findOne({ nickname });
    if (existingUser) return res.status(409).json({ message: 'Nickname already taken' });

    const newUser = new User({ nickname });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /teamspaces:
 *   get:
 *     tags:
 *       - teamspace
 *     summary: 팀 스페이스 목록
 *     description: 팀 스페이스 목록 조회
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teamspaces'
 *       500:
 *         description: 서버 에러
 */
mainRouter.get('/teamspaces', async (req: Request, res: Response) => {
  try {
    const teamspace = await Teamspace.find();

    res.json(teamspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default mainRouter;
