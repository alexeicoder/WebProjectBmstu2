declare namespace NodeJS {
    export interface ProcessEnv {
        // Database configuration
        DB_USER: string;
        DB_HOST: string;
        DB_NAME: string;
        DB_PASSWORD: string;
        DB_PORT: number;
        DB_SSL: boolean;
        // Server configuration
        APP_HOST: string;
        APP_PORT: number;
    }
}
