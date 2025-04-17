// import { env } from 'node:process';
import { Pool, PoolClient, PoolConfig, QueryResult, QueryResultRow } from 'pg';

class Database {
    private static instance: Database;
    private pool: Pool;
    private client: PoolClient | null = null;

    private constructor() {
        const config: PoolConfig = {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT as unknown as number,
            database: process.env.DB_NAME,
            ssl: process.env.DB_SSL as unknown as boolean === true ? { rejectUnauthorized: false } : false
        };

        this.pool = new Pool(config);
    }

    // Init database
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    // Connect to database
    public async connect(): Promise<PoolClient> {
        if (!this.client) {
            this.client = await this.pool.connect();
            console.log('Database PostgreSQL connected');
        }
        return this.client;
    }

    // Close connection to database
    public async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.release();
            await this.pool.end();
            console.log('Database PostgreSQL disconnected');
            this.client = null;
        }
    }

    // Check connection to database
    public async checkConnection(): Promise<boolean> {
        try {
            const client = await this.connect();
            await client.query('SELECT 1');
            return true;
        } catch (error) {
            console.error('PostgreSQL connection error:', error);
            return false;
        }
    }

    public async getClient(): Promise<PoolClient> {
        return await this.pool.connect();
    }

    public async query<T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
        const client = await this.pool.connect();
        try {
            return await client.query<T>(text, params);
        } finally {
            client.release();
        }
    }
}

export default Database;