// src/infrastructure/controllers/LoginWithGoogleController.ts

import { AuthController } from '../../application/controllers/AuthController';
import { LoginWithGoogleUseCase } from '../../application/usecases/LoginWithGoogleUseCase';
import { MongoUserRepository } from '../../infrastructure/repositories/MongoUserRepository';
import { GoogleAuthService } from '../../application/services/GoogleAuthService';
import { JwtTokenService } from '../../application/services/JwtTokenService';

console.log('[DEBUG] GoogleAuthService typeof:', typeof GoogleAuthService);

const userRepository = new MongoUserRepository();
const googleAuthService = new GoogleAuthService(process.env.GOOGLE_CLIENT_ID!);
const jwtTokenService = new JwtTokenService(process.env.JWT_SECRET!);

const loginWithGoogleUseCase = new LoginWithGoogleUseCase(
  userRepository,
  googleAuthService,
  jwtTokenService
);

const authController = new AuthController(loginWithGoogleUseCase);

export const loginWithGoogleController = authController.loginWithGoogle.bind(authController);
