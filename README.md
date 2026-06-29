# Task Management App API

This is the backend API for the Task Management App, built with Node.js, Express, and TypeScript.

## Dependencies

The project relies on the following major dependencies:
- **[Express](https://expressjs.com/)**: Fast, unopinionated, minimalist web framework for Node.js.
- **[Mongoose](https://mongoosejs.com/)**: Elegant MongoDB object modeling for Node.js.
- **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation library.
- **[JSONWebToken (JWT)](https://github.com/auth0/node-jsonwebtoken)**: For secure user authentication.
- **[Bcryptjs](https://www.npmjs.com/package/bcryptjs)**: For password hashing.
- **[Dotenv](https://github.com/motdotla/dotenv)**: To load environment variables from a `.env` file.
- **[TypeScript](https://www.typescriptlang.org/)**: Strongly typed programming language that builds on JavaScript.

## Setup Instructions

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/WShashinduChamika/task-managment-app-api.git
   cd task-managment-app-api
   ```
   > **Note:** Please consider the `dev` branch as the main active branch containing the most up-to-date code. Switch to it after cloning:
   ```bash
   git checkout dev
   ```

2. **Install dependencies:**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the `.env.example` file to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and populate the necessary variables:
   - `PORT`: The port on which the server will run (default is 3000).
   - `MONGODB_URI`: Your MongoDB connection string.
   - `CORS_ORIGIN`: Allowed origins for CORS (e.g., `http://localhost:5173,http://localhost:3000`).
   - `JWT_SECRET`: A strong secret key used for signing JWT tokens.
   - `JWT_ACCESS_EXPIRY`: Expiry time for access tokens (e.g., `900` for 15 minutes).
   - `JWT_REFRESH_EXPIRY`: Expiry time for refresh tokens (e.g., `604800` for 7 days).

## Usage

### Development

To start the development server with live-reloading:
```bash
npm run dev
```
The server will typically start at `http://localhost:3000` (or the port specified in your `.env` file).

### Production Build

To compile the TypeScript code into JavaScript for production:
```bash
npm run build
```

To start the compiled production server:
```bash
npm run start
```