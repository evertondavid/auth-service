// src/application/services/JwtTokenService.ts

import jwt from 'jsonwebtoken';
import { User } from '../../domain/entities/User';

export class JwtTokenService {
  constructor(private readonly secret: string) { }

  /**
   * Gera um token JWT com informações básicas do usuário.
   * @param user - Usuário autenticado
   */
  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      provider: user.provider,
    };

    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }
}
