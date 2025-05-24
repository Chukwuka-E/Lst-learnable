import { Request, Response } from 'express';
import { z } from 'zod';
import { IAccountInput } from '../types/account';
import { createAccount, listAccounts, decryptData } from '../services/accountService';
import { decrypt } from '../services/encryptionService';

const accountSchema = z.object({
  firstName: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const decryptSchema = z.record(z.string());

export const createAccountHandler = async (req: Request, res: Response) => {
  try {
    const validated = accountSchema.parse(req.body);
    const { account, card } = await createAccount(validated);
    res.status(201).json({
      accountNumber: account.accountNumber,
      firstName: account.firstName,
      surname: account.surname,
      email: account.email,
      phoneNumber: {
        encrypted: account.phoneNumber,
        decrypted: decrypt(account.phoneNumber),
      },
      dateOfBirth: {
        encrypted: account.dateOfBirth,
        decrypted: decrypt(account.dateOfBirth),
      },
      card: {
        cardNumber: {
          encrypted: card.cardNumber,
          decrypted: decrypt(card.cardNumber),
        },
        cvv: {
          encrypted: card.cvv,
          decrypted: decrypt(card.cvv),
        },
        expiryDate: card.expiryDate,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid input' });
  }
};

export const getAccounts = async (_req: Request, res: Response) => {
  try {
    const accounts = await listAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Omo Server don get error' });
  }
};

export const decryptFields = async (req: Request, res: Response) => {
  try {
    const validated = decryptSchema.parse(req.body);
    const decrypted = await decryptData(validated);
    res.status(200).json(decrypted);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Omo you don put wrong data  ' });
  }
};