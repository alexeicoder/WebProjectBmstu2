/* Контроллер: работа с HTTP (валидация, преобразование данных) */
import { Request, Response } from "express";
import { IToken, IAuthRequest } from "../interfaces/auth.interfaces";
import { UserRepository } from '../repositories/user.repository';
import jwt from 'jsonwebtoken';
import { validateLogin, validatePassword } from "../utils/auth.validate";

export class AuthController {
    constructor(private userRepository: UserRepository) { }

    // Methods
    private generateTokens(userId: number): IToken {
        return {
            accessToken: jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '10m' }),
            refreshToken: jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '1h' })
        };
    }

    public async validateToken(req: IAuthRequest, res: Response) {
        res.status(200).json({
            success: true,
            message: 'IToken is valid',
            userId: req.userId
        });
    }

    public async refreshToken(req: Request, res: Response): Promise<any> {
        const refreshToken = req.cookies.refresh_cookie;

        console.log(refreshToken);

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token is required'
            });
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: number };

            const decodedUserId = decoded.userId;

            const newAccessToken = this.generateTokens(decodedUserId).accessToken;

            res.cookie('access_cookie', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 1000, // 1m
                sameSite: 'strict',
            });

            return res.status(200).json({
                success: true,
                message: 'Access token refreshed',
                userId: decodedUserId
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired refresh token'
            });
        }
    }

    public async register(req: Request, res: Response): Promise<any> {
        console.log("Register process started");
        const login: string = req.body.login;
        const password: string = req.body.password;
        const name: string = req.body.name;

        if (!login || !password || !name) {
            return res.status(400).json({
                message: 'login, password and name are required'
            });
        }

        if (!validateLogin(login)) {
            return res.status(400).json({ message: 'Некорректный логин.' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ message: 'Некорректный пароль.' });
        }

        try {
            const existingUser = await this.userRepository.findByLogin(login);
            if (existingUser) {
                return res.status(401).json({
                    message: 'Пользователь уже зарегистрирован.'
                });
            }

            const userId = await this.userRepository.createUser(login, password, name);
            const tokens = this.generateTokens(userId);

            this.setCookies(res, tokens);

            return res.status(201).json({
                success: true,
                message: "successful register",
                userId
            });
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            return res.status(500).json({
                message: 'Ошибка сервера.'
            });
        }
    }

    public async login(req: Request, res: Response): Promise<any> {
        const login: string = req.body.login;
        const password: string = req.body.password;

        if (!login || !password) {
            return res.status(400).json({
                message: 'login and password are required'
            });
        }

        if (!validateLogin(login)) {
            return res.status(400).json({ message: `Некорректная почта. Длинна должна быть от 8 до 32 символов. Недопустимые символы: пробел (), кавычки (', "), запятая(,) знак (*), нижнее подчёркивание(_).` });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ message: 'Некорректный пароль. Пароль должен содержать минимум 4 символа.' });
        }

        try {
            const user = await this.userRepository.findByLogin(login);

            if (!user) {
                return res.status(401).json({ success: false, message: 'Пользователь не найден.' });
            }

            if (password !== user.password) {
                return res.status(401).json({ success: false, message: 'Неверный пароль.' });
            }

            const { accessToken, refreshToken } = this.generateTokens(user.id);

            this.setCookies(res, { accessToken, refreshToken });

            return res.status(200).json({
                success: true,
                message: "successful logging in",
                userId: user.id,
                accessToken,
                refreshToken
            });

        }
        catch (error) {
            console.error("Ошибка при авторизации пользователя", error);
            return res.status(500).json({ success: false, message: 'Ошибка сервера.' });
        }

    }

    public async signout(_req: Request, res: Response): Promise<any> {
        try {
            this.clearCookies(res);
            res.status(200).json({ success: true, message: 'Вы успешно вышли из системы' });
        }
        catch (error) {
            console.error('Ошибка при выходе:', error);
            res.status(500).json({ message: 'Ошибка при выходе из системы' });
        }
    }

    public async findById(req: Request, res: Response): Promise<any> {
        const userId: number = parseInt(req.params.id);

        if (!userId) {
            return res.status(400).json({ message: 'user ID is required' });
        }

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'user ID must be a number' });
        }

        try {
            const user = await this.userRepository.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }

            return res.status(200).json(user);

        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error);
            res.status(500).json({ message: 'Ошибка сервера.' });
        }

    }

    public async findByLogin(req: Request, res: Response): Promise<any> {
        const login: string = req.params.login as unknown as string;

        console.log(login)

        if (!login) {
            return res.status(400).json({ message: 'Login is required' });
        }

        if (validateLogin(login) === false) {
            return res.status(400).json({ message: 'Некорректный логин.' });
        }

        try {
            const user = await this.userRepository.findByLogin(login);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(user);

        } catch (error) {
            console.error('Ошибка при получении данных пользователя по логину:', error);
            res.status(500).json({ message: 'Ошибка сервера.' });
        }
    }

    public async getAllUsers(_req: Request, res: Response): Promise<any> {
        try {
            const users = this.userRepository.getAllUsers();

            return res.status(200).json({
                count: (await users).length,
                users: (await users)
            });

        } catch (error) {
            console.error('Ошибка при получении списка пользователей:', error);
            return res.status(500).json({ message: 'Ошибка сервера.' });
        }
    }

    public async updateUser(req: IAuthRequest, res: Response): Promise<any> {
        console.log("Update process started");
        const userId: number = req.userId as unknown as number;
        const updateData = req.body;

        if (isNaN(userId) || userId === null || userId === undefined) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No update data provided' });
        }

        if (updateData.id) {
            return res.status(400).json({ message: 'ID cannot be updated' });
        }

        if (updateData.password) {
            if (!validatePassword(updateData.password)) {
                return res.status(400).json({ message: 'Некорректный пароль. Пароль должен содержать минимум 4 символа.' });
            }
        }

        if (updateData.login) {

            if (!validateLogin(updateData.login)) {
                return res.status(400).json({ message: `Некорректная почта. Длинна должна быть от 8 до 32 символов. Недопустимые символы: пробел (), кавычки (', "), запятая(,) знак (*), нижнее подчёркивание(_).` });
            }

            const existingUser = await this.userRepository.findByLogin(updateData.login);

            if (existingUser && existingUser.id !== userId) {
                return res.status(400).json({ message: 'Login already exists' });
            }
        }

        try {
            const updatedUser = await this.userRepository.updateUser(userId, updateData);

            if (!updatedUser || updatedUser === null) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                message: "User updated successfully",
                user: {
                    id: updatedUser.id,
                    email: updatedUser.login,
                    name: updatedUser.name,
                }
            });

        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    public async deleteUser(req: IAuthRequest, res: Response): Promise<any> {
        const userId: number = req.userId as unknown as number;

        if (isNaN(userId) || userId === null || userId === undefined) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        try {
            const deletedUser = await this.userRepository.deleteUser(userId);

            if (!deletedUser) {
                return res.status(404).json({ message: 'User is not deleted!' });
            }

            this.clearCookies(res);
            return res.status(200).json({ message: 'User deleted successfully' });

        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    public async ifExistsById(req: Request, res: Response): Promise<any> {
        const userId: number = parseInt(req.params.id);

        if (!userId) {
            return res.status(400).json({ message: 'user ID is required' });
        }

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'user ID must be a number' });
        }

        try {
            const result = await this.userRepository.ifExistsById(userId);
            return res.status(200).json({ exists: result });

        } catch (error) {
            console.error('Ошибка при проверке существования пользователя:', error);
            res.status(500).json({ message: 'Ошибка сервера.' });
        }
    }

    private setCookies(res: Response, tokens: IToken) {
        res.cookie('access_cookie', tokens.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 10 * 1000,
            sameSite: 'strict',
        });

        res.cookie('refresh_cookie', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000,
            sameSite: 'strict',
        });
    }

    private clearCookies(res: Response) {
        // Удаляем куки access_cookie и refresh_cookie
        res.clearCookie('access_cookie', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.clearCookie('refresh_cookie', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
    }
}