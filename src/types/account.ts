import mongoose from 'mongoose';

export interface IAccount {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  accountNumber: string;
  cards?: mongoose.Types.ObjectId[];
}

export interface IAccountInput {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}