import { IUserRepository } from '@domain/interfaces/IUserRepository';
import { User } from '@domain/entities/User';
import { UserModel } from '../database/schemas/UserSchema';

export class UserRepository implements IUserRepository {
  async findByProviderId(providerId: string, provider: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ providerId, provider }).lean();
    if (!userDoc) return null;

    return {
      id: userDoc._id.toString(),
      name: userDoc.name || '',
      email: userDoc.email || '',
      provider: userDoc.provider || '',
      providerId: userDoc.providerId || '',
      avatarUrl: userDoc.avatarUrl || '',
    };
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {

    const userDoc = await UserModel.create(userData);
    const plain = userDoc.toObject();

    return {
      id: plain._id.toString(),
      name: plain.name ?? 'Unknown',
      email: plain.email ?? '',
      provider: plain.provider ?? 'google',
      providerId: plain.providerId ?? '',
      avatarUrl: plain.avatarUrl ?? '',
    };
  }
}