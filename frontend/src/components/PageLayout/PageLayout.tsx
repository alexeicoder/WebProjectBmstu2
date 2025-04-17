import React, { ReactNode } from "react";
import styles from './PageLayout.module.css';

interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div className={styles.pageLayout}>
            {children}
        </div>
    );
};

export default PageLayout;
