import mongoose from 'mongoose';
import { DATABASE_URL } from './env';

export const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('MongoDBS don  connect ooh');
  } catch (error) {
    console.error('MongoDBS connection don get error ooh:', error);
    process.exit(1);
  }
};