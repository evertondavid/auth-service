// src/domain/interfaces/IUserRepository.ts

import { User } from '../entities/User';

// Interface to abstract user persistence operations
export interface IUserRepository {
  findByProviderId(providerId: string, provider: string): Promise<User | null>;

  create(data: {
    name: string;
    email: string;
    provider: string;
    providerId: string;
    avatarUrl?: string;
  }): Promise<User>;

  update(user: User): Promise<User>;
}
