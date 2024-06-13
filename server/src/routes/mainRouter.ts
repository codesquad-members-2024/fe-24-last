import express, { Request, Response, Router } from 'express';
import User from '../models/User.js';
import Teamspace from '../models/Teamspace.js';

const mainRouter: Router = express.Router();

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
