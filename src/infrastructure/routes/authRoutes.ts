// src/infrastructure/routes/authRoutes.ts

import { Router } from 'express';
import { config } from 'dotenv';

import { AuthController } from '../../application/controllers/AuthController';
import { MongoUserRepository } from '../repositories/MongoUserRepository';
import { LoginWithGoogleUseCase } from '../../application/usecases/LoginWithGoogleUseCase';
import { GoogleAuthService } from '../../application/services/GoogleAuthService';
import { JwtTokenService } from '../../application/services/JwtTokenService';

config();

const router = Router();

// Instanciação correta das dependências
const userRepository = new MongoUserRepository();
const googleAuthService = new GoogleAuthService(process.env.GOOGLE_CLIENT_ID!);
const jwtTokenService = new JwtTokenService(process.env.JWT_SECRET!);

// Injeta as dependências corretamente no caso de uso
const loginWithGoogleUseCase = new LoginWithGoogleUseCase(
  userRepository,
  googleAuthService,
  jwtTokenService
);

// Cria o controller com o use case
const authController = new AuthController(loginWithGoogleUseCase);

// Rota de login com Google
router.post('/google', (req, res) => authController.loginWithGoogle(req, res));

export default router;
