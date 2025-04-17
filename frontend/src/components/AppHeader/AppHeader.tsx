import React, { memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES, SERVICE_AUTH } from '../../routes/routes';
import styles from './AppHeader.module.css';
import Button from "../Button/Button";
import axios from "axios";
import { useCart } from "../../context/CartContext/CartContext"; // Import useCart

interface AppHeaderProps {
    className?: string;
}

const AppHeader: React.FC<AppHeaderProps> = memo(({ className }) => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart(); // Get clearCart from the context

    const handleLogout = async () => {
        try {
            await axios.post(SERVICE_AUTH.SIGN_OUT, {}, {
                withCredentials: true
            });
            console.log('Вы успешно вышли из системы');
            clearCart(); // Clear the cart on logout
            navigate(ROUTES.WELCOME);
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className={`${styles.appHeader} ${className || ''}`}>
            <Link to={ROUTES.HOME}>
                <div className={styles.appHeaderLogo} />
            </Link>
            <nav className={styles.appHeaderOptionsBlock}>
                <Link to={ROUTES.HOME} className={styles.appHeaderOption}>
                    <span>Главная</span>
                </Link>
                <Link to={ROUTES.CART} className={styles.appHeaderOption}>
                    <span>Корзина {cartItemCount > 0 && `(${cartItemCount})`}</span>
                </Link>
                <Link to={ROUTES.ORDERS} className={styles.appHeaderOption}>
                    <span>Заказы</span>
                </Link>
                <Link to={ROUTES.SETTINGS} className={styles.appHeaderOption}>
                    <span>Настройки</span>
                </Link>
                <Button onClick={handleLogout}>Выйти</Button>
            </nav>
        </header>
    );
});

export default AppHeader;
