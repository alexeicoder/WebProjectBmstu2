import React, { ReactNode } from 'react';
import styles from './Label.module.css';

interface LabelProps {
    id?: string;
    htmlFor?: string;
    className?: string;
    isErrorLabel?: boolean;
    children: ReactNode;
}

const Label: React.FC<LabelProps> = ({ id, htmlFor, className = '', children }) => {
    return (
        <label
            id={id}
            htmlFor={htmlFor}
            className={`${styles.label} ${className}`}
        >
            {children}
        </label>
    );
};

export default Label;
