// frontend/src/context/CartContext/CartContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface CartItem {
    productId: number;
    quantity: number;
}

interface CartContextProps {
    cart: CartItem[];
    addToCart: (productId: number, quantity: number) => void;
    updateCartItemQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    removeFromCart: (productId: number) => void; // Add removeFromCart
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

const CART_STORAGE_KEY = 'cart';

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = (productId: number, quantity: number) => {
        const existingCartItem = cart.find((item) => item.productId === productId);

        if (existingCartItem) {
            setCart(
                cart.map((item) =>
                    item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
                )
            );
        } else {
            setCart([...cart, { productId, quantity }]);
        }
    };

    const updateCartItemQuantity = (productId: number, quantity: number) => {
        setCart(
            cart.map((item) =>
                item.productId === productId ? { ...item, quantity: quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem(CART_STORAGE_KEY);
    };

    const removeFromCart = (productId: number) => {
        setCart(cart.filter((item) => item.productId !== productId));
    };

    const contextValue: CartContextProps = {
        cart,
        addToCart,
        updateCartItemQuantity,
        clearCart,
        removeFromCart, // Add removeFromCart to the context value
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
