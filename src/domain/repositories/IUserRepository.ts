// src/domain/repositories/IUserRepository.ts

import { User } from '../entities/User';

// IUserRepository defines the contract for user data persistence.
// This interface allows decoupling between domain and database implementations.
export interface IUserRepository {
  // Finds a user by their provider and provider ID (e.g., Google, Facebook).
  findByProviderId(provider: string, providerId: string): Promise<User | null>;

  // Finds a user by email (used for account linking or conflict detection).
  findByEmail(email: string): Promise<User | null>;

  // Persists a new user in the database.
  create(user: User): Promise<User>;

  // Optionally update an existing user (e.g., refresh tokens, names, avatars).
  update(user: User): Promise<User>;
}
