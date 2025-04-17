import React from "react";
// import { Outlet, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../../routes/routes';
import styles from './Header.module.css';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate();

    const handleHeaderLogoClick = () => {
        navigate(ROUTES.WELCOME);
    };

    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerLogo} onClick={handleHeaderLogoClick} />
            </div>
        </>
    );
};

export default Header;
