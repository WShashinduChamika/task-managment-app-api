import express from "express";
import { corsMiddleware } from '../core/middleware/cors';
import { errorHandler } from "../core/middleware/error-handler";
import authRouter from "../modules/auth/auth.router";
import { stripApiPrefix } from "../core/middleware/strip-api-prefix.middleware";


const app = express();

// Global middleware
app.use(corsMiddleware);

app.use(stripApiPrefix('/api/v1'));

app.use(express.json());

// Health check
app.get('/health', (_req,res) => {
    res.json({status: 'ok', timeStamp: new Date().toISOString() });
});

// Mount routers
app.use('/auth', authRouter);

// Global error handler
app.use(errorHandler);

export default app;