import mongoose from 'mongoose';
import { DATABASE_URL } from './env';

export const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};