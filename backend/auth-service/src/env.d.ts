declare namespace NodeJS {
    export interface ProcessEnv {
        // Database configuration
        DB_USER: string;
        DB_HOST: string;
        DB_NAME: string;
        DB_PASSWORD: string;
        DB_PORT: number;
        DB_SSL: boolean;
        // Jwt token configuration
        JWT_SECRET: string;
        JWT_REFRESH_SECRET: string;
        // Server configuration
        APP_HOST: string;
        APP_PORT: number;
    }
}
