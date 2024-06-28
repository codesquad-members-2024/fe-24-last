import mongoose from 'mongoose';
import { printErrorAndExit } from '../utils/processUtils.js';

export async function setupMongoDB(url: string) {
  try {
    await mongoose.connect(url);
    console.log('mongoDB connected');
  } catch (error) {
    printErrorAndExit(error);
  }

  const db = mongoose.connection;
  db.on('error', (error) => printErrorAndExit(error));

  return db;
}
