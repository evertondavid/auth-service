// src/main.ts

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './infrastructure/routes/authRoutes';
import { connectToMongoDB } from './infrastructure/database/mongoConnection';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Cria aplicação Express
const app = express();

// Middlewares globais
app.use(cors());                // Permite requisições de outras origens (CORS)
app.use(express.json());        // Converte o corpo das requisições para JSON

// Rotas
app.use('/auth', authRoutes);   // Ex: POST /auth/google

// Middleware global para tratamento de erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[GLOBAL ERROR HANDLER]', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Inicializa o servidor somente após conectar no banco
const PORT = process.env.PORT || 3000;

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Auth Service is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('[MongoDB] Connection failed:', err);
    process.exit(1); // Encerra a aplicação se o banco não conectar
  });
