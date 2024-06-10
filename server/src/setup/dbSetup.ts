import mongoose from 'mongoose';
import { printErrorAndExit } from '../utils/processUtils';
import Article from '../models/Article';
import { mockArticle } from './mockArticle';

const initializeDb = async () => {
  await Article.deleteMany();
  const articleCount = await Article.countDocuments();

  if (articleCount === 0) {
    await Article.insertMany(mockArticle);
    console.log('article successfully initialized');
  }
};

export async function setupMongoDB(url: string) {
  try {
    await mongoose.connect(url);
    console.log('mongoDB connected');
  } catch (error) {
    printErrorAndExit(error);
  }

  const db = mongoose.connection;
  db.on('error', (error) => printErrorAndExit(error));
  db.once('open', () => {
    console.log('connected successfully');
    initializeDb();
  });

  return db;
}
