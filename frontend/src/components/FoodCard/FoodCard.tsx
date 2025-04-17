import React from 'react';
import styles from './FoodCard.module.css';
import { getImgSrc } from '../../utils/utils';
import AddToCart from '../AddToCard/AddToCart';

interface FoodCardProps {
    id: number;
    name: string;
    description: string;
    price: number;
    count: number;
    category_name: string;
    onAddToCart: (productId: number, quantity: number) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ id, name, description, price, count, category_name, onAddToCart }) => {
    return (
        <div key={id} className={styles.foodCard}>
            <img src={getImgSrc(name)} alt={name} className={styles.foodImage} />
            <div className={styles.foodInfo}>
                <div className={styles.categoryNameContainer}>
                    {category_name}
                </div>
                <h3 className={styles.foodName}>{name}</h3>
                <p className={styles.foodDescription}>{description}</p>
                <p className={styles.foodPrice}>Цена: {price}₽</p>
                {/* <p className={styles.foodCount}>Количество: {count}</p> */}
                <AddToCart productId={id} productName={name} count={count} onAddToCart={onAddToCart} />
            </div>
        </div>
    );
};

export default FoodCard;
