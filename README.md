# Task Management App API

A robust RESTful API for a Task Management Application built with Node.js, Express, TypeScript, and MongoDB. The API uses a layered architecture (Controller, Service, Repository) and provides comprehensive endpoints for authentication, user management, and task operations with role-based access control.

## Technologies & Libraries

- **Node.js & Express**: Core application framework.
- **TypeScript**: Static typing for enhanced code quality and maintainability.
- **MongoDB & Mongoose**: NoSQL database and Object Data Modeling (ODM).
- **Zod**: Schema declaration and request data validation.
- **JWT & bcryptjs**: Secure authentication, password hashing, and refresh token rotation.

## Key Features

- **Authentication & Authorization**: Secure login, registration, and logout with access and refresh token mechanisms.
- **Role-Based Access Control (RBAC)**: Distinct permissions and capabilities for Admin and Standard users.
- **User Management**: Paginated and filterable user lists, detailed user profiles, and active user tracking.
- **Task Management**: Comprehensive CRUD operations for tasks, status tracking, task assignment (admin only), and advanced filtering/pagination.
- **Layered Architecture**: Clean separation of concerns using Controllers, Services, and Repositories.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/WShashinduChamika/task-managment-app-api.git
    cd task-managment-app-api
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Copy the sample environment file and configure the necessary variables.

    ```bash
    cp .env.example .env
    ```

    Open the `.env` file and define the following variables:

    ```env
    # Application
    PORT=3000

    # MongoDB
    MONGODB_URI=your_mongodb_connection_string

    # Allowed CORS origin(s)
    CORS_ORIGIN=http://localhost:5173,http://localhost:3000

    # JWT
    JWT_SECRET=your_strong_random_secret
    JWT_ACCESS_EXPIRY=900
    JWT_REFRESH_EXPIRY=604800
    ```

4.  **Run the Application locally (Development):**

    ```bash
    npm run dev
    ```

    The server will start using `ts-node` and will be accessible at `http://localhost:3000` (or your configured port).

5.  **Build and Run for Production:**
    ```bash
    npm run build
    npm run start
    ```

## Project Scripts

- `npm run dev`: Starts the backend server in development mode using `ts-node`.
- `npm run build`: Compiles the TypeScript source code to JavaScript in the `dist/` directory.
- `npm run start`: Runs the compiled application from the `dist/` directory (used in production).
- `npm run watch`: Runs the TypeScript compiler in watch mode.

## API Usage / Endpoints (Overview)

The API generally follows standard REST conventions. The main modules include:

- **Auth Module** (`/auth`):
  - `POST /auth/register` - Register a new user
  - `POST /auth/login` - Authenticate user and receive tokens
  - `POST /auth/refresh` - Rotate refresh token to receive a new access token
  - `POST /auth/logout` - Securely invalidate sessions/tokens

- **User Module** (`/users`):
  - `GET /users` - Retrieve a paginated/filterable list of users
  - `GET /users/:id` - Retrieve a specific user's details
  - `GET /users/active` - Fetch actively assigned users

- **Task Module** (`/tasks`):
  - `GET /tasks` - Retrieve a list of tasks (with pagination and status/assigned filters)
  - `POST /tasks` - Create a new task (admins can assign users)
  - `PUT /tasks/:id` - Update task details or status
  - `DELETE /tasks/:id` - Delete a task

> Note: Some endpoints require specific roles (e.g., Admin) for full access. Please refer to the Zod schemas in the respective `dtos/` directories for detailed payload structures.
