import React from 'react';
import styles from './OrderCard.module.css';
import { getImgSrc } from '../../utils/utils';

interface IOrderItem {
    id: number;
    id_order: number;
    id_food_item: number;
    count: number;
    price: number;
    name: string;
    img: string;
}

interface OrderCardProps {
    order: {
        id: number;
        order_date: Date;
        status: string;
        total_price: number;
        order_items?: IOrderItem[]; // Make order_items optional here
    };
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    return (
        <>
            <li key={order.id} className={styles.orderItem}>
                <div className={styles.orderHeader}>
                    <h3>Заказ №{order.id}</h3>
                    <p>Дата заказа: {new Date(order.order_date).toLocaleString()}</p>
                    <p>Статус: {order.status}</p>
                    <p>Сумма заказа: <b>{order.total_price}₽</b></p>
                </div>
                <ul className={styles.orderItemList}>
                    {order.order_items && Array.isArray(order.order_items) ? (
                        order.order_items.map((item) => (
                            <li key={item.id_food_item} className={styles.orderItemItem}>
                                <img src={getImgSrc(item.name)} alt={item.name} className={styles.orderItemImage} />
                                <p>"{item.name}"</p>
                                <p>x {item.count}</p>
                                <p>Цена: {item.price}₽</p>
                            </li>
                        ))
                    ) : (
                        <li>Нет данных о товарах в заказе</li>
                    )}
                </ul>
            </li>
        </>
    );
};

export default OrderCard;
