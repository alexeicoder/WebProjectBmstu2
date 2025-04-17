import Database from '../core/database'; // Ваш класс для работы с БД
import { IOrder, IOrderItem, IFood } from '../interfaces/order.interfaces';

export class OrderRepository {
    constructor(private db: Database) { }

    public async findById(id: number): Promise<IOrder> {

        const result = await this.db.query(`SELECT * FROM orders WHERE id = $1`, [id]);

        return result.rows[0];
    }

    public async findByOwnerId(ownerId: number): Promise<IOrder[]> {

        const result = await this.db.query<IOrder>(`SELECT * FROM orders WHERE user_id = $1`, [ownerId]);
        const orders = result.rows;

        for (const order of orders) {
            const orderItemsResult = await this.db.query<IOrderItem>(
                `SELECT id_food_item, count, price FROM order_items WHERE id_order = $1`,
                [order.id]
            );
            order.order_items = orderItemsResult.rows;
        }

        console.log("orders\n: ", orders);
        return orders;
    }

    public async findByOwnerLogin(login: string): Promise<IOrder[]> {
        const result = await this.db.query(`SELECT * FROM orders WHERE user_id = $1`, [login]);
        return result.rows;
    }

    public async createOrder(ownerId: number, foodItems: IFood[]): Promise<IOrder> {
        const client = await this.db.getClient();
        console.log("Repository starting create order");
        try {
            await client.query('BEGIN');
            console.log(`await client.query('BEGIN')`);

            // Calculate total price
            const totalPrice = foodItems.reduce((sum, item) => sum + (item.price * item.count), 0);

            console.log("Calculated totalPrice: ", totalPrice);

            // Create order
            const orderResult = await client.query<IOrder>(
                `INSERT INTO orders (user_id, total_price, status, order_date) VALUES ($1, $2, $3, $4) RETURNING *`,
                [ownerId, totalPrice, 'pending', new Date(),]
            );
            const order = orderResult.rows[0];

            console.log("Order: ", order);

            // Create order items
            const orderItems: IOrderItem[] = [];

            for (const foodItem of foodItems) {
                const orderItemResult = await client.query<IOrderItem>(
                    `INSERT INTO order_items (id_order, id_food_item, count, price) VALUES ($1, $2, $3, $4) RETURNING *`,
                    [order.id, foodItem.id, foodItem.count, foodItem.price] // Assuming quantity is always 1 for now
                );
                orderItems.push(orderItemResult.rows[0]);
            }

            console.log("orderItems:\n", orderItems);

            await client.query('COMMIT');

            return { ...order, order_items: orderItems };
        }
        catch (error) {
            await client.query('ROLLBACK');
            console.log("Couldn't create order by repository");
            throw error;
        } finally {
            client.release();
        }
    }
}