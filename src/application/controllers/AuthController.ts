// src/application/controllers/AuthController.ts

import { Request, Response } from 'express';
import { LoginWithGoogleUseCase } from '../usecases/LoginWithGoogleUseCase';

/**
 * AuthController handles incoming authentication requests.
 */
export class AuthController {
  constructor(private loginWithGoogleUseCase: LoginWithGoogleUseCase) { }

  /**
   * Handles the Google login request.
   * Expects a Google OAuth idToken in the request body.
   */
  async loginWithGoogle(req: Request, res: Response): Promise<void> {
    try {
      console.log('[DEBUG] req.body:', req.body); // <-- Aqui

      const { idToken } = req.body;

      if (!idToken) {
        res.status(400).json({ message: 'Missing Google idToken' });
        return;
      }

      const user = await this.loginWithGoogleUseCase.execute(idToken);
      res.status(200).json(user);
    } catch (error: any) {
      console.error('[AuthController] Google login error:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
