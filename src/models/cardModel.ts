import mongoose, { Schema, Document } from 'mongoose';
import { ICard } from '../types/card';

interface ICardDocument extends ICard, Document {}

const cardSchema = new Schema<ICardDocument>({
  cardNumber: { type: String, required: true, unique: true },
  cvv: { type: String, required: true },
  expiryDate: { type: String, required: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
});

export default mongoose.model<ICardDocument>('Card', cardSchema);