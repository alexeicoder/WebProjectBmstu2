import { Request } from 'express';

export interface IToken {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenPayload {
    userId: number;
}

export interface IUser {
    id: number;
    login: string;
    password: string;
    name?: string;
}

export interface IAuthRequest extends Request {
    userId?: number;
}