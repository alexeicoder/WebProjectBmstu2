import dotenv from 'dotenv';
dotenv.config();

import App from "./core/app";
import Database from './core/database';
import { Container } from './core/container';

async function startServer() {
    const database = Database.getInstance();
    try {
        await database.connect();
        const isConnected = await database.checkConnection();
        if (!isConnected) throw new Error('Database connection failed');

        // Инициализируем контейнер ДО создания App
        Container.init(database);

        const app = new App();
        app.start();

    } catch (error) {
        console.error('Failed to start:', error);
        process.exit(1);
    }
}

startServer();