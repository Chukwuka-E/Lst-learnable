import Account from '../models/accountModel';
import Card from '../models/cardModel';
import { encrypt } from '../services/encryptionService';

// when  generating numeric string of given length
const generateNumericId = (length: number): string => {
  let numericId = '';
  while (numericId.length < length) {
    numericId += Math.floor(Math.random() * 10).toString();
  }
  return numericId;
};

export const generateUniqueId = async (length: number): Promise<string> => {
  console.log(`generateUniqueId started with length: ${length}`);

  try {
    if (length === 3) {
      // when generating 3-digit numeric CVV
      const cvv = Math.floor(100 + Math.random() * 900).toString(); // 100-999
      console.log(`Generated 3-digit numeric CVV: ${cvv}`);
      return cvv;
    }

    let id: string;
    let isUnique = false;

    do {
      id = generateNumericId(length);
      const existingAccount = await Account.findOne({ accountNumber: id });
      const encryptedCardId = encrypt(id);
      const existingCard = await Card.findOne({ cardNumber: encryptedCardId });
      isUnique = !existingAccount && !existingCard;
    } while (!isUnique);

    console.log(`Generated unique numeric ID: ${id}`);
    return id;
  } catch (error) {
    console.error(`Error in generateUniqueId (length=${length}):`, error);
    throw new Error(`Failed to generate unique ID for length ${length}`);
  }
};
