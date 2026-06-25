import express from "express";
import { corsMiddleware } from '../core/middleware/cors';


const app = express();

// Global middleware
app.use(corsMiddleware);
app.use(express.json());

// Health check
app.get('/health', (_req,res) => {
    res.json({status: 'ok', timeStamp: new Date().toISOString() });
});

export default app;