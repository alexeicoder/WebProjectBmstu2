import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    className?: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    autoComplete?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    id,
    className = '',
    value,
    placeholder,
    required,
    autoComplete,
    onChange = () => { },
    onClick,
    ...restProps
}) => {
    return (
        <input
            id={id}
            className={`${styles.input} ${className}`}
            value={value}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            onChange={onChange}
            onClick={onClick}
            {...restProps}
        />
    );
};

export default Input;
