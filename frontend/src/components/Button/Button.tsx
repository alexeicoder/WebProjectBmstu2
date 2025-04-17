import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    type = 'button',
    onClick,
    className = '',
    disabled = false,
    ...restProps
}) => {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={`button ${className}`}
            {...restProps}
        >
            {children}
        </button>
    );
};

export default Button;