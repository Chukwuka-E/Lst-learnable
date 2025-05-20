import CryptoJS from 'crypto-js';
import { ENCRYPTION_KEY } from '../config/env';

export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const decrypt = (encrypted: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      throw new Error('Decryption failed: Invalid data or key');
    }
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
};