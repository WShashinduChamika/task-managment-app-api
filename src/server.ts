import { config } from 'dotenv';
config();

import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`\nServer running on http://localhost:${PORT}`);
    console.log('Health: GET /health');
});
