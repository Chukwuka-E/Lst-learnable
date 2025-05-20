import mongoose from 'mongoose';

export interface ICard {
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  accountId: mongoose.Types.ObjectId;
}