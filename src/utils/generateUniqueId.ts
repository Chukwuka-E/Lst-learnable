import { v4 as uuidv4 } from 'uuid';
import Account from '../models/accountModel';
import Card from '../models/cardModel';
import { encrypt } from '../services/encryptionService';

export const generateUniqueId = async (length: number): Promise<string> => {
  let id: string;
  let isUnique = false;

  do {
    id = uuidv4().replace(/-/g, '').slice(0, length);
    const existingAccount = await Account.findOne({ accountNumber: id });
    const existingCard = await Card.findOne({ cardNumber: encrypt(id) });
    isUnique = !existingAccount && !existingCard;
  } while (!isUnique);

  return id;
};