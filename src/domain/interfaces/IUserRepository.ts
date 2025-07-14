// src/domain/interfaces/IUserRepository.ts

import { User } from '../entities/User';

// Interface to abstract user persistence operations
export interface IUserRepository {
  findByProviderId(providerId: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
