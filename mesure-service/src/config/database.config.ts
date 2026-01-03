import { registerAs } from '@nestjs/config';

/**
 * Configuration MongoDB
 * Les valeurs sont chargées depuis .env
 */
export default registerAs('database', () => ({
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mesure_db',
}));