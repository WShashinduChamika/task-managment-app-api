import { config } from 'dotenv';
config();

import app from './app';
import { getConnection } from '../core/database/connection';

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
    try {
        await getConnection();

        app.listen(PORT, () => {
            console.log(`\nServer running on http://localhost:${PORT}`);
            console.log('Health: GET /health');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

void startServer();
