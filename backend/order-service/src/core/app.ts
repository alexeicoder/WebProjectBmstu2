import express from "express";
import { createServer, Server } from "http";
import router from "../routes/routes";
import bodyParser from 'body-parser';
import cors from 'cors';
// import { timeoutMiddleware } from "../middleware/timeout.middleware";

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./doc/swagger.yaml');

class App {
    private port: number = process.env.APP_PORT as unknown as number;
    private host: string = process.env.APP_HOST as unknown as string;
    private app: express.Application;
    private server: Server;

    constructor() {
        this.app = this.createApp();
        this.server = createServer(this.app);
    }

    private createApp(): express.Application {
        const app = express();

        app.use(bodyParser.json());
        app.use(cors(
            {
                origin: 'http://localhost:4000', // Разрешить запросы с любых доменов
                methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные HTTP-методы
                credentials: true, // Разрешить отправку учётных данных
            }
        ));

        // app.use(timeoutMiddleware(5000));

        app.use("/api/order/", router);
        app.use('/api/order/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        return app;
    }

    public async start(): Promise<void> {
        this.server.listen(this.port, this.host, () => {
            console.log(`Order server is running on url http://${this.host}:${this.port}/api/order`)
        });
    }

    public async stop(): Promise<void> {
        // await this.database.disconnect();
        this.server.close();
        console.log('Server stopped');
    }
}

export default App;