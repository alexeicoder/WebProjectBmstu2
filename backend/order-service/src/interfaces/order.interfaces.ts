export interface IOrder {
    id: number;
    user_id: number;
    // update_date: Date;
    total_price: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    order_date: Date;
    order_items: IOrderItem[];
}

export interface IOrderItem {
    id: number;
    id_order: number;
    id_food_item: number;
    name?: string;
    img?: string;
    count: number;
    price: number;
}

export interface IFood {
    id: number;
    name: string;
    count: number;
    price: number;
    description?: string;
    img?: string;
    id_category: number;
    category_name: string;
}

export interface IFoodCategory {
    id: number;
    name: string;
}