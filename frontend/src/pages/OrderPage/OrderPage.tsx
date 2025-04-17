import React, { useEffect, useState } from 'react';
import styles from './OrderPage.module.css';
// import { useCart } from '../../context/CartContext/CartContext';
import OrderCard from '../../components/OrderCard/OrderCard';
import PageLayout from '../../components/PageLayout/PageLayout';
import FormMessageBlock from '../../components/FormMessageBlock/FormMessageBlock';
import { ROUTES, SERVICE_AUTH, SERVICE_ORDER } from '../../routes/routes';
import empty_orders from '../../assets/food-1.svg';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext/CartContext';
import FullScreenLoading from '../../components/FullScreenLoading/FullScreenLoading';

interface IOrderItem {
    id: number;
    id_order: number;
    id_food_item: number;
    count: number;
    price: number;
    name: string;
    img: string;
}

interface IOrder {
    id: number;
    user_id: number;
    update_date: Date;
    total_price: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    order_date: Date;
    order_items?: IOrderItem[];
}

const OrderPage: React.FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // const { cart } = useCart();
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoadingValidation, setIsLoadingValidation] = useState<boolean>(false);
    const navigate = useNavigate();

    const { clearCart } = useCart();

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

                    const tryToRefreshTokenData = await tryToRefreshToken.json();
                    setUserId(tryToRefreshTokenData.userId);
                } else {
                    const validateResponseData = await validateResponse.json();
                    setUserId(validateResponseData.userId);
                }

            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch user ID.');
                navigate(ROUTES.WELCOME);
            } finally {
                setIsLoadingValidation(false);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) {
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(SERVICE_ORDER.FIND_OWNER_ID + userId);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data.orders);
            } catch (err) {
                if (err instanceof Error && err.message === 'Failed to fetch') {
                    setError('Не удалось загрузить данные. Сервер недоступен. Попробуйте позже');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

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
        return <FullScreenLoading isLoading={true} />;
    }

    console.log(orders)

    return (
        <div className={styles.layout}>
            <div className={styles.orderPage}>
                <h1>Ваши заказы</h1>
                {orders.length === 0 ? (
                    <>
                        <img src={empty_orders} alt="У вас пока нет заказов" className={styles.emprtyOrdersImage} />
                        <p>У вас пока нет заказов</p>
                    </>

                ) : (
                    <ul className={styles.orderList}>
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default OrderPage;
