import { Request, Response, NextFunction } from "express";

export const timeoutMiddleware = (timeoutMs: number) =>
    (req: Request, res: Response, next: NextFunction) => {
        const timeout = setTimeout(() => {
            if (!res.headersSent) {
                console.error(`Timeout: ${req.method} ${req.url}`);
                res.status(504).json({ error: "Request timeout" });
            }
        }, timeoutMs);

        // Очищаем таймаут при успешном ответе
        res.on('finish', () => clearTimeout(timeout));
        next();
    };