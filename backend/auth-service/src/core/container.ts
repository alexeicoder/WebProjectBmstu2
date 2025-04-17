import Database from './database';
import { AuthController } from '../controllers/auth.controller';
import { UserRepository } from '../repositories/user.repository';

export class Container {
    private static instance: Container;
    public authController: AuthController;

    private constructor(database: Database) {
        const userRepository = new UserRepository(database);
        this.authController = new AuthController(userRepository);
    }

    public static init(database: Database): void {
        Container.instance = new Container(database);
    }

    public static getAuthController(): AuthController {
        if (!Container.instance) {
            throw new Error('Container not initialized');
        }
        return Container.instance.authController;
    }
}