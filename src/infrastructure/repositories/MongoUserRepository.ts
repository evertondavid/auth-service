// src/infrastructure/repositories/MongoUserRepository.ts

import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';

// Define the structure of a User document for MongoDB
interface IUserDocument extends Document {
  provider: string;
  providerId: string;
  name: string;
  email: string;
  avatar?: string;
}

// MongoDB schema definition for User
const UserSchema: Schema = new Schema<IUserDocument>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
);

// Create the Mongoose model
const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>('User', UserSchema);

// Implementation of the user repository interface
export class MongoUserRepository implements IUserRepository {
  async findByProviderId(providerId: string, provider: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ providerId, provider }).exec();
    return userDoc ? this.toDomain(userDoc) : null;
  }

  async create(data: {
    name: string;
    email: string;
    provider: string;
    providerId: string;
    avatarUrl?: string;
  }): Promise<User> {
    const created = await UserModel.create({
      name: data.name,
      email: data.email,
      provider: data.provider,
      providerId: data.providerId,
      avatar: data.avatarUrl,
    });

    return this.toDomain(created);
  }

  async update(user: User): Promise<User> {
    const updated = await UserModel.findOneAndUpdate(
      { providerId: user.providerId, provider: user.provider },
      {
        name: user.name,
        email: user.email,
        avatar: user.avatarUrl,
      },
      { new: true }
    ).exec();

    if (!updated) {
      throw new Error('User not found for update');
    }

    return this.toDomain(updated);
  }

  private toDomain(doc: IUserDocument): User {
    return new User(
      (doc._id as mongoose.Types.ObjectId).toString(),
      doc.name,
      doc.email,
      doc.provider,
      doc.providerId,
      doc.avatar
    );
  }
}
