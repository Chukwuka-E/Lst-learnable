import { v4 as uuidv4 } from 'uuid';
import Account from '../models/accountModel';
import Card from '../models/cardModel';
import { encrypt } from '../services/encryptionService';

export const generateUniqueId = async (length: number) => {
  console.log(`generateUniqueId started with length: ${length}`);

  try {
    if (length === 3) {
      // when generatrating only a 3-digit number
      const cvv = Math.floor(100 + Math.random() * 900).toString(); 
      console.log(`Generated 3-digit numeric CVV: ${cvv}`);
      return cvv;
    }

    // to  handle account/card number generation
    let id: string;
    let isUnique = false;

    do {
      id = uuidv4().replace(/-/g, '').slice(0, length);
      const existingAccount = await Account.findOne({ accountNumber: id });
      const encryptedCardId = encrypt(id);
      const existingCard = await Card.findOne({ cardNumber: encryptedCardId });
      isUnique = !existingAccount && !existingCard;
    } while (!isUnique);

    console.log(`Generated unique ID: ${id}`);
    return id;
  } catch (error) {
    console.error(`Error in generateUniqueId (length=${length}):`, error);
    throw new Error(`Failed to generate unique ID for length ${length}`);
  }
};
