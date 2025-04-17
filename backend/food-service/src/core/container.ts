import Database from './database';
import { FoodController } from '../controllers/food.controller';
import { FoodRepository } from '../repositories/food.repository';

export class Container {
    private static instance: Container;
    public foodController: FoodController;

    private constructor(database: Database) {
        const foodRepository = new FoodRepository(database);
        this.foodController = new FoodController(foodRepository);
    }

    public static init(database: Database): void {
        Container.instance = new Container(database);
    }

    public static getFoodController(): FoodController {
        if (!Container.instance) {
            throw new Error('Container not initialized');
        }
        return Container.instance.foodController;
    }
}