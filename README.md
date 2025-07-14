# Auth Service

This is a Node.js authentication microservice built with TypeScript and Clean Architecture principles. It provides Google OAuth login, JWT generation, and MongoDB integration for user management.

## Features

- Google OAuth2.0 login
- JWT access token generation
- MongoDB user persistence
- Clean and modular folder structure
- Ready for route protection and refresh token implementation
- Written in TypeScript

## Technologies

- Node.js
- Express
- TypeScript
- MongoDB (with Mongoose)
- JWT (jsonwebtoken)
- Google OAuth2.0
- ts-node-dev for local development

## Folder Structure

```
src/
│
├── application/
│   ├── controllers/          # Controllers (entry points for routes)
│   ├── services/             # Business logic services (GoogleAuthService, JwtTokenService)
│   └── usecases/             # Use case implementations
│
├── domain/
│   ├── entities/             # Core domain entities (e.g. User)
│   └── interfaces/           # Abstractions and contracts (e.g. IUserRepository)
│
├── infrastructure/
│   ├── controllers/          # (Optional) infrastructure-level controllers
│   ├── database/             # MongoDB connection and schemas
│   ├── repositories/         # MongoDB repository implementation
│   └── routes/               # Express routes
│
└── main.ts                   # App entry point
```

## Getting Started

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

Create a `.env` file based on `.env.example`:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_uri
```

3. **Start the server:**

```bash
npm run dev
```

## API Endpoint

### `POST /auth/google`

Accepts a Google ID token and returns a JWT token.

**Request body:**

```json
{
  "idToken": "your_google_id_token"
}
```

**Response:**

```json
{
  "token": "your_jwt_token"
}
```

## Author

Developed by Everton David.
