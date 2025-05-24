import crypto from 'crypto';
import { ENCRYPTION_KEY } from '../config/env';

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32); 
const ivLength = 16;

export const encrypt = (data: string): string => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(data, 'utf8'),
    cipher.final(),
  ]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (encrypted: string): string => {
  try {
    const [ivHex, encryptedHex] = encrypted.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedData = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
};
