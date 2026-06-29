import express from "express";
import { corsMiddleware } from "../core/middleware/cors";
import { errorHandler } from "../core/middleware/error-handler";
import authRouter from "../modules/auth/auth.router";
import taskRouter from "../modules/tasks/task.router";
import userRouter from "../modules/users/user.router";
import { stripApiPrefix } from "../core/middleware/strip-api-prefix.middleware";
import { authMiddleware } from "../core/middleware/auth-middleware";

const app = express();

// Global middleware
app.use(corsMiddleware);

app.use(stripApiPrefix("/api/v1"));

app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timeStamp: new Date().toISOString() });
});

// Mount routers
app.use("/auth", authRouter);

app.use("/tasks", authMiddleware, taskRouter);

app.use("/users", authMiddleware, userRouter);

// Global error handler
app.use(errorHandler);

export default app;
