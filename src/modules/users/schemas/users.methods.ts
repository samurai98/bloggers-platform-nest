import { SchemaFactory } from '@nestjs/mongoose';
import { FilterQuery, HydratedDocument, Model } from 'mongoose';
import { add } from 'date-fns';

import { User } from '.';

export const UserSchema = SchemaFactory.createForClass(User);

type UserDocument = HydratedDocument<User>;

type Search = { searchLoginTerm: string; searchEmailTerm: string };

type CreateUser = {
  userId: string;
  email: string;
  login: string;
  passHash: string;
  passSalt: string;
  currentDate: string;
  confirmationCode: string;
};

export interface UserDocumentModel extends Model<UserDocument> {
  getFilter(search: Search): FilterQuery<User>;

  findUser(id: string): Promise<UserDocument | null>;

  createUser(user: CreateUser): Promise<UserDocument>;
}

UserSchema.statics = {
  getFilter({ searchEmailTerm, searchLoginTerm }: Search): FilterQuery<User> {
    return {
      $or: [
        { 'accountData.email': { $regex: new RegExp(`${searchEmailTerm}`, 'i') } },
        { 'accountData.login': { $regex: new RegExp(`${searchLoginTerm}`, 'i') } },
      ],
    };
  },

  async findUser(id: string): Promise<UserDocument | null> {
    return await this.findOne({ 'accountData.id': id }).exec();
  },

  async createUser(userData: CreateUser): Promise<UserDocument> {
    const { userId, email, login, passHash, passSalt, currentDate, confirmationCode } = userData;

    return new this({
      accountData: { id: userId, email, login, passHash, passSalt, createdAt: currentDate },
      emailConfirmation: {
        confirmationCode,
        expirationDate: add(new Date(currentDate), { hours: 1 }),
        isConfirmed: false,
      },
    });
  },
};
