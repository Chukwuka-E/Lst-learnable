import mongoose, { Schema, Document } from 'mongoose';
import { IAccount } from '../types/account';

interface IAccountDocument extends IAccount, Document {}

const accountSchema = new Schema<IAccountDocument>({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
});

export default mongoose.model<IAccountDocument>('Account', accountSchema);