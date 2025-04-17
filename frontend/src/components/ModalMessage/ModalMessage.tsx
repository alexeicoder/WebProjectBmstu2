import React, { ReactNode } from 'react';
import styles from './ModalMessage.module.css';
import { FiX, FiAlertCircle } from "react-icons/fi";

interface ModalMessageProps {
    type: 'error' | 'warning' | 'success';
    message: ReactNode;
    onClose: () => void;
}

const ModalMessage: React.FC<ModalMessageProps> = ({ type, message, onClose }) => {
    let typeClass: string;
    let typeCloseClass: string;
    let icon: ReactNode;

    switch (type) {
        case 'error':
            typeClass = styles.error_container;
            typeCloseClass = styles.error_close;
            icon = <FiAlertCircle />;
            break;
        case 'warning':
            typeClass = styles.warning_container;
            typeCloseClass = styles.warning_close;
            icon = <FiAlertCircle />;
            break;
        case 'success':
            typeClass = styles.success_container;
            typeCloseClass = styles.success_close;
            icon = null;
            break;
        default:
            typeClass = styles.default;
            typeCloseClass = styles.default_close;
            icon = null;
            break;
    }

    const handleCloseClick = () => {
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${styles.container} ${typeClass}`}>
                <div className={styles.block_message}>
                    {icon && <div className={styles.icon}>{icon}</div>}
                    <div className={styles.message}>
                        {message}
                    </div>
                    <div className={`${styles.close} ${typeCloseClass}`} onClick={handleCloseClick}>
                        <FiX />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalMessage;
