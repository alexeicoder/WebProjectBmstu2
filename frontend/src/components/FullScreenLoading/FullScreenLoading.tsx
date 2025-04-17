import React from 'react';
import styles from './FullScreenLoading.module.css';

interface FullScreenLoadingProps {
    isLoading: boolean;
}

const FullScreenLoading: React.FC<FullScreenLoadingProps> = ({ isLoading }) => {
    if (!isLoading) {
        return null;
    }

    return (
        <div className={styles.fullScreenLoading}>
            <div className={styles.loadingSpinner}></div>
        </div>
    );
};

export default FullScreenLoading;
