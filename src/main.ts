// src/main.ts

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Import Express framework to create the HTTP server
import express from 'express';

// Helmet helps secure the app by setting various HTTP headers
import helmet from 'helmet';

// CORS allows cross-origin requests
import cors from 'cors';

// TODO: Import MongoDB connection utility when ready
// import { connectToDatabase } from './infrastructure/database/mongodb';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Apply security-related HTTP headers
app.use(helmet());

// Enable CORS for all origins (can be restricted in production)
app.use(cors());

// Basic route for health check
app.get('/health', (req, res) => {
  res.status(200).send('Auth Service is running 🚀');
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`✅ Auth Service is listening on port ${PORT}`);
});
