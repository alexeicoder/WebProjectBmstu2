import React, { useState, useEffect } from 'react';
import styles from './AddToCart.module.css';
import Button from '../Button/Button';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface AddToCartProps {
    productId: number;
    productName: string;
    count: number;
    onAddToCart: (productId: number, quantity: number) => void;
}

const AddToCart: React.FC<AddToCartProps> = ({ productId, productName, count, onAddToCart }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (quantity > count) {
            setQuantity(count);
            setError(`Нельзя добавить больше ${count} ${productName}`);
        }
    }, [count, quantity, productName]);

    const handleIncrement = () => {
        if (quantity < count) {
            setQuantity(quantity + 1);
            setError(null);
        } else {
            setError(`Нельзя добавить больше ${count} ${productName}`);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setError(null);
        }
    };

    const handleAddToCartClick = () => {
        onAddToCart(productId, quantity);
        setQuantity(1);
        setError(null);
    };

    return (
        <div className={styles.addToCart}>
            <div className={styles.quantityControl}>
                <Button onClick={handleDecrement} disabled={quantity <= 1}>
                    <FiMinus />
                </Button>
                <span>{quantity}</span>
                <Button onClick={handleIncrement} disabled={quantity >= count}>
                    <FiPlus />
                </Button>
            </div>
            <Button onClick={handleAddToCartClick} className={'signinBtn'}>
                В корзину
            </Button>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default AddToCart;
