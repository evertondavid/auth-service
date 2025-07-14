// src/application/services/GoogleAuthService.ts

import { OAuth2Client, TokenPayload } from 'google-auth-library';

export class GoogleAuthService {
  private client: OAuth2Client;

  constructor(private readonly clientId: string) {
    this.client = new OAuth2Client(clientId);
  }

  async verify(idToken: string): Promise<TokenPayload> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: this.clientId,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid Google token payload');
    }

    return payload;
  }
}
