import React from "react";
import styles from './ProfileCard.module.css';
import logo from '../../assets/avatar.jpg';
import Button from "../Button/Button";

import { FiUser } from "react-icons/fi";
import { FiFeather } from "react-icons/fi";

function ProfileCard({ name, followersCount, reviewsCount }) {

    return (
        <>
            <div className={styles.profileCard}>
                <div className={styles.top}>
                    <img className={styles.avatar} src={logo} />
                    <Button>Подписаться</Button>
                </div>
                <div className={styles.name}>
                    {name}
                </div>
                <div className={styles.countBlock}>
                    <FiUser size={16} />
                    <span>{followersCount}&nbsp;подписчиков</span>
                </div>
                <div className={styles.countBlock}>
                    <FiFeather size={16} />
                    <span>{reviewsCount}&nbsp;отзывов</span>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default ProfileCard;