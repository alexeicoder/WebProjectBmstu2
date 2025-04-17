import React, { ReactNode } from 'react';
import styles from './FormElement.module.css';

interface FormElementProps {
    children: ReactNode;
    className?: string;
}

const FormElement: React.FC<FormElementProps> = ({ children, className = '' }) => {
    return (
        <div className={`${styles.formElement} ${className}`}>
            {children}
        </div>
    );
};

export default FormElement;
