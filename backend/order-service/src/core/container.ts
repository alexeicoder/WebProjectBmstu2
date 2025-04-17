import Database from './database';
import { OrderController } from '../controllers/order.controller';
import { OrderRepository } from '../repositories/order.repository';

export class Container {
    private static instance: Container;
    public orderController: OrderController;

    private constructor(database: Database) {
        const userRepository = new OrderRepository(database);
        this.orderController = new OrderController(userRepository);
    }

    public static init(database: Database): void {
        Container.instance = new Container(database);
    }

    public static getOrderController(): OrderController {
        if (!Container.instance) {
            throw new Error('Container not initialized');
        }
        return Container.instance.orderController;
    }
}