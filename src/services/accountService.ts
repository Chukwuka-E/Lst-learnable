import mongoose, { Document } from 'mongoose';
import Account from '../models/accountModel';
import Card from '../models/cardModel';
import { IAccountInput } from '../types/account';
import { ICard } from '../types/card';
import { generateUniqueId } from '../utils/generateUniqueId';
import { generateExpiryDate } from '../utils/dateUtils';
import { encrypt, decrypt } from './encryptionService';

interface IAccountDocument extends IAccountInput, Document {
  _id: mongoose.Types.ObjectId;
  accountNumber: string;
  cards: mongoose.Types.ObjectId[];
}

export const createAccount = async (input: IAccountInput) => {
  const accountNumber = await generateUniqueId(10);
  const encryptedPhone = encrypt(input.phoneNumber);
  const encryptedDob = encrypt(input.dateOfBirth);

  const account = new Account({
    ...input,
    phoneNumber: encryptedPhone,
    dateOfBirth: encryptedDob,
    accountNumber,
    cards: [], // Initialize cards array
  });

  await account.save();

  // Generate virtual card
  const cardNumber = await generateUniqueId(16);
  const cvv = await generateUniqueId(3);
  const encryptedCardNumber = encrypt(cardNumber);
  const encryptedCvv = encrypt(cvv);
  const expiryDate = generateExpiryDate();

  const card = new Card({
    cardNumber: encryptedCardNumber,
    cvv: encryptedCvv,
    expiryDate,
    accountId: account._id,
  });

  await card.save();

  // Add card to account's cards array
  account.cards = account.cards || []; // Ensure cards is not undefined
  account.cards.push(card._id as mongoose.Types.ObjectId); // Explicitly cast _id
  await account.save();

  return { account, card };
};

export const listAccounts = async () => {
  const accounts = await Account.find()
    .populate<{ cards: (ICard & Document)[] }>('cards')
    .exec();

  return accounts.map((account) => ({
    accountNumber: account.accountNumber,
    fullName: `${account.firstName} ${account.surname}`,
    email: account.email,
    phoneNumber: {
      encrypted: account.phoneNumber,
      decrypted: decrypt(account.phoneNumber),
    },
    dateOfBirth: {
      encrypted: account.dateOfBirth,
      decrypted: decrypt(account.dateOfBirth),
    },
    cards: (account.cards ?? [])
      .map((card) => {
        if (
          card &&
          typeof card === 'object' &&
          'cardNumber' in card &&
          'cvv' in card &&
          'expiryDate' in card
        ) {
          return {
            cardNumber: {
              encrypted: (card as ICard).cardNumber,
              decrypted: decrypt((card as ICard).cardNumber),
            },
            cvv: {
              encrypted: (card as ICard).cvv,
              decrypted: decrypt((card as ICard).cvv),
            },
            expiryDate: (card as ICard).expiryDate,
          };
        }
        return null;
      })
      .filter((c) => c !== null),
  }));
};

export const decryptData = async (encryptedData: { [key: string]: string }) => {
  const decryptedData: { [key: string]: string } = {};
  for (const [key, value] of Object.entries(encryptedData)) {
    decryptedData[key] = decrypt(value);
  }
  return decryptedData;
};