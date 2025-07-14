# Auth Service

A standalone, containerized microservice for handling **social login (OAuth2)** using providers such as **Google**, **Facebook**, and **Apple**. This service is designed to be reusable across multiple frontend or mobile applications.

---

## 🌐 Features

- 🔐 Secure OAuth 2.0 login for Google, Facebook, and Apple
- 🧱 Clean Architecture with SOLID principles
- 🛡️ TypeScript with type safety
- 🧩 MongoDB integration
- 📦 Dockerized and ready for deployment
- ⚡ Token generation with JWT
- 💡 Caching and performance optimization (future)

---

## 🧱 Project Structure

```
src/
├── application/
├── domain/
├── infrastructure/
├── config/
├── shared/
└── main.ts
```

---

## 📦 Setup

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

```

---

## 🐳 Run with Docker

```bash
docker-compose up --build
```

---

## 🔧 Environment Variables (.env)

```
PORT=3000
MONGO_URI=mongodb://mongo:27017/authdb
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

APPLE_TEAM_ID=your_apple_team_id
APPLE_KEY_ID=your_apple_key_id
APPLE_PRIVATE_KEY=your_apple_private_key
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Made with by [Everton David](https://github.com/evertondavid)