// src/domain/entities/User.ts

/**
 * Represents a user in the authentication domain.
 * This entity is independent of persistence or framework concerns.
 */
export class User {
  constructor(
    public readonly id: string,               // Unique identifier for the user (e.g., from MongoDB)
    public name: string,                      // User's full name
    public email: string,                     // User's email (must be unique)
    public provider: string,                  // OAuth provider used (e.g., 'google', 'facebook', 'apple')
    public providerId: string,               // ID from the OAuth provider
    public avatarUrl?: string                 // Optional avatar image URL
  ) { }
}  