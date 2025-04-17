/* Содержит бизнес-логику, выполняет запросы к БД */

import Database from '../core/database';
import { IUser } from '../interfaces/auth.interfaces';

export class UserRepository {

    // Constuctor
    constructor(private db: Database) { }

    // Methods
    public async findByLogin(login: string): Promise<IUser | null> {
        const result = await this.db.query<IUser>(
            'SELECT * FROM users WHERE login = $1',
            [login]
        );
        return result.rows[0] || null;
    }

    public async findById(id: number): Promise<IUser | null> {
        const result = await this.db.query<IUser>(
            'SELECT id, login, name FROM users WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    }

    public async createUser(login: string, password: string, name: string): Promise<number> {
        const result = await this.db.query<{ id: number }>(
            `INSERT INTO users (login, password, name) 
             VALUES ($1, $2, $3) RETURNING id`,
            [login, password, name]
        );
        return result.rows[0].id;
    }

    public async getAllUsers(): Promise<IUser[]> {
        const result = await this.db.query<IUser>('SELECT * FROM users');

        return result.rows;
    }

    public async updateUser(userId: number, updateData: Partial<IUser>): Promise<IUser | null> {
        // Формируем части SQL запроса динамически
        const setClauses: string[] = [];
        const values: any[] = [];
        let paramIndex = 1;

        // Исключаем поле id из обновления
        const { id, ...dataToUpdate } = updateData;

        // Подготавливаем параметры для запроса
        for (const [key, value] of Object.entries(dataToUpdate)) {
            if (value !== undefined) {
                setClauses.push(`${key} = $${paramIndex}`);
                values.push(value);
                paramIndex++;
            }
        }

        // Если нечего обновлять
        if (setClauses.length === 0) {
            return null;
        }

        // Добавляем userId в конец массива значений
        values.push(userId);

        try {
            // Формируем SQL запрос
            const query = `
            UPDATE users 
            SET ${setClauses.join(', ')} 
            WHERE id = $${paramIndex}
            RETURNING id, login, name
        `;

            // Выполняем запрос
            const result = await this.db.query<IUser>(query, values);

            // Возвращаем обновленного пользователя или null если не найден
            return result.rows[0] || null;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    public async deleteUser(_userId: number): Promise<boolean> {
        // const result = await this.db.query('DELETE FROM users WHERE id = $1', [userId]);
        // return result.rowCount === 1;
        return true;
    }

    public async ifExistsById(id: number): Promise<boolean> {

        const user = this.findById(id);
        if (await user) return true;
        else return false;
    }
}