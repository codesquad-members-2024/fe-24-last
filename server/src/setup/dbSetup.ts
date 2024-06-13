import mongoose from 'mongoose';
import { printErrorAndExit } from '../utils/processUtils.js';
import Article from '../models/Article.js';
import Teamspace from '../models/Teamspace.js';

export const initializeDB = async () => {
  await Article.deleteMany({});
  await Teamspace.deleteMany({});
};

export async function setupMongoDB(url: string) {
  try {
    await mongoose.connect(url);
    console.log('mongoDB connected');
    await initializeDB();
    console.log('mongoDB successfully initialized');
  } catch (error) {
    printErrorAndExit(error);
  }

  const db = mongoose.connection;
  db.on('error', (error) => printErrorAndExit(error));

  return db;
}
