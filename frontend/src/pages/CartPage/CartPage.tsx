import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext/CartContext';
import { getImgSrc } from '../../utils/utils';
import styles from './CartPage.module.css';
import Button from '../../components/Button/Button';
import { ROUTES, SERVICE_AUTH, SERVICE_FOOD, SERVICE_ORDER } from '../../routes/routes';

import empty_cart from '../../assets/food-2.svg';

import { FiPlus, FiMinus } from 'react-icons/fi';
import PageLayout from '../../components/PageLayout/PageLayout';
import FormMessageBlock from '../../components/FormMessageBlock/FormMessageBlock';
import { useNavigate } from 'react-router-dom';
import FullScreenLoading from '../../components/FullScreenLoading/FullScreenLoading';

interface FoodItem {
    id: number;
    name: string;
    count: number;
    price: number;
    description: string;
    img: string;
    id_category: number;
    category_name: string;
}

const CartPage: React.FC = () => {
    const { cart, updateCartItemQuantity, clearCart, removeFromCart } = useCart(); // Get removeFromCart
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoadingValidation, setIsLoadingValidation] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchFoodItems = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(SERVICE_FOOD.FIND_ALL);
                if (!response.ok) {
                    throw new Error('Failed to fetch food items');
                }
                const data = await response.json();
                setFoodItems(data.foodItems);
            } catch (err) {
                if (err instanceof Error && err.message === 'Failed to fetch') {
                    setError('Не удалось загрузить данные о продуктах. Сервер недоступен. Попробуйте позже.');
                }
                // setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchFoodItems();
    }, []);

    useEffect(() => {
        const fetchUserId = async () => {
            setIsLoadingValidation(true);
            try {
                const validateResponse = await fetch(SERVICE_AUTH.VALIDATE_TOKEN, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!validateResponse.ok) {
                    const tryToRefreshToken = await fetch(SERVICE_AUTH.REFRESH_TOKEN, {
                        method: 'GET',
                        credentials: 'include',
                    });

                    if (!tryToRefreshToken.ok) {
                        clearCart();
                        navigate(ROUTES.WELCOME);
                        // throw new Error('Не удалось проверить токен. Пожалуйста, войдите снова.');
                    }

                    const validateResponseData = await tryToRefreshToken.json();
                    setUserId(validateResponseData.userId);
                }
                else {
                    const validateResponseData = await validateResponse.json();
                    setUserId(validateResponseData.userId);
                }
            } catch (err) {
                if (err instanceof Error && err.message === 'Failed to fetch') {
                    navigate(ROUTES.WELCOME);
                    // setError('Сервер недоступен. Попробуйте позже.');
                }
                setError(err instanceof Error ? err.message : 'Failed to fetch user ID.');
            } finally {
                setIsLoadingValidation(false);
            }
        };

        fetchUserId();
    }, []);

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        updateCartItemQuantity(productId, newQuantity);
    };

    const handleRemoveFromCart = (productId: number) => {
        removeFromCart(productId);
    };

    const getFoodItemById = (productId: number) => {
        return foodItems.find((item) => item.id === productId);
    };

    const handlePlaceOrder = async () => {
        if (!userId) {
            setError('User ID not found. Please log in again.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            // Prepare the data for the request
            const orderItems = cart.map((cartItem) => {
                const foodItem = getFoodItemById(cartItem.productId);
                return {
                    id: foodItem?.id,
                    name: foodItem?.name,
                    price: foodItem?.price,
                    count: cartItem.quantity,
                    id_category: foodItem?.id_category,
                    category_name: foodItem?.category_name
                };
            });

            const orderData = {
                ownerId: userId,
                foodItems: orderItems,
            };

            console.log(orderData);

            // Simulate the request to the backend
            const response = await fetch(SERVICE_ORDER.CREATE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to place order');
            }

            // Handle successful order placement
            console.log('Order placed successfully');
            clearCart();
            window.location.href = ROUTES.ORDERS;
            // You might want to redirect the user to a confirmation page here
        } catch (err) {

            if (err instanceof Error && err.message === 'Failed to fetch') {
                setError('Не удалось создать заказ. Сервер недоступен. Попробуйте позже.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <FullScreenLoading isLoading={true} />;
    }

    if (error) {
        return (
            <PageLayout>
                <FormMessageBlock message={error} type='error' />
            </PageLayout>
        );
    }

    if (isLoadingValidation) {
        return <FullScreenLoading isLoading={true} />;;
    }

    return (
        <>
            <div className={styles.layout}>
                <div className={styles.cartPage}>
                    <h1>Корзина</h1>
                    {cart.length === 0 ? (
                        <>
                            <img src={empty_cart} alt="Корзина пуста" className={styles.emptyCartImage} />
                            <p>Корзина пуста</p>
                        </>
                    ) : (
                        <>
                            <ul className={styles.cartList}>
                                {cart.map((cartItem) => {
                                    const foodItem = getFoodItemById(cartItem.productId);
                                    if (!foodItem) {
                                        return null;
                                    }
                                    return (
                                        <li key={cartItem.productId} className={styles.cartItem}>
                                            <div className={styles.cartItemImageContainer}>
                                                <img src={getImgSrc(foodItem.name)} alt={foodItem.name} className={styles.cartItemImage} />
                                                <Button onClick={() => handleRemoveFromCart(cartItem.productId)}>Удалить</Button>
                                            </div>
                                            <div className={styles.cartItemInfo}>
                                                <h3 className={styles.cartItemName}>{foodItem.name}</h3>
                                                <p className={styles.cartItemPrice}>Цена: {foodItem.price}₽</p>
                                                <div className={styles.quantityControl}>
                                                    <Button onClick={() => handleQuantityChange(cartItem.productId, cartItem.quantity - 1)} disabled={cartItem.quantity <= 1}>
                                                        <FiMinus />
                                                    </Button>
                                                    <span>{cartItem.quantity}</span>
                                                    <Button onClick={() => handleQuantityChange(cartItem.productId, cartItem.quantity + 1)} disabled={cartItem.quantity >= foodItem.count}>
                                                        <FiPlus />
                                                    </Button>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            <Button onClick={handlePlaceOrder} className={'signinBtn'} disabled={isLoading}>
                                Сделать заказ
                            </Button>
                        </>
                    )}
                    {error && <div>{error}</div>}
                </div>
            </div>
        </>
    );
};

export default CartPage;
