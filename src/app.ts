import express from "express";


const app = express();

// Global middleware
app.use(express.json());

// Health check
app.get('/health', (_req,res) => {
    res.json({status: 'ok', timeStamp: new Date().toISOString() });
})

export default app;