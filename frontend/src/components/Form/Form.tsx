import React, { ReactNode, FormEvent } from 'react';
import styles from './Form.module.css';

interface FormContainerProps {
    children: ReactNode;
    head?: ReactNode;
    footer?: ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children, head, footer }) => {
    return (
        <div className={styles.formContainer}>
            {head &&
                <div className={styles.formHead}>{head}</div>
            }
            <div className={styles.formBody}>
                {children}
            </div>
            {footer &&
                <div className={styles.formFooter}>{footer}</div>
            }
        </div>
    );
};

interface FormProps {
    children: ReactNode;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    className?: string;
    head?: ReactNode;
    footer?: ReactNode;
}

const Form: React.FC<FormProps> = ({ children, onSubmit, className = '', head, footer }) => {
    return (
        <FormContainer head={head} footer={footer}>
            <form className={`${styles.form} ${className}`} onSubmit={onSubmit}>
                {children}
            </form>
        </FormContainer>
    );
};

export default Form;
