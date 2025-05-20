import dotenv from 'dotenv';

dotenv.config();

export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY as string;
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const PORT = process.env.PORT || '3000';