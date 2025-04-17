import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthRequest } from '../interfaces/auth.interfaces';

export const verifyToken = (req: IAuthRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies.access_cookie;
    console.log("verifyToken process started");
    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Access token is required'
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
        return;
    }
};

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