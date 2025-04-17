import React from "react";
import styles from './ProfileHeader.module.css';
import Button from "../Button/Button";
import logo from '../../assets/avatar.jpg';
// import mail from '../../assets/mail_icon.svg';
// import bookCompare from '../../assets/books_compare.svg';

import { FiSend } from "react-icons/fi";
import { FiBookOpen } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";

import { getFollowersWord } from "../../utils/textUtils";

function ProfileHeader({ login, avatar, name, followersCount, id, isOwnProfile }) {

    return (
        <>
            <div className={styles.profileHeader}>
                {/* <div className={styles.profileAvatar}>
                    <img src={logo} />
                </div> */}
                <div className={styles.profileCallToAction}>
                    <div className={styles.profileInfo}>
                        {name}
                    </div>
                    <div className={styles.profileFollowersCount}>
                        {login}
                    </div>
                    <div className={styles.profileFollowersCount}>
                        <FiUser size={20} />
                        <span>{followersCount}&nbsp;{getFollowersWord(followersCount)}</span>
                    </div>
                    {
                        !isOwnProfile
                        &&
                        <div className={styles.profileActions}>
                            <Button className='primaryBtn'>Подписаться</Button>
                            <Button className={styles.profileActionButton} >
                                <FiSend size={20} />
                                <span>Написать</span>
                            </Button>
                            <Button className={styles.profileActionButton}>
                                <FiBookOpen size={20} />
                                <span>Сравнить книги</span>
                            </Button>
                        </div>
                    }
                    {
                        isOwnProfile
                        &&
                        <Button className={styles.profileActionButton}>
                            <FiEdit2 size={20} />
                            <span>Редактировать профиль</span>
                        </Button>
                    }
                </div>

            </div>
        </>
    )
}

export default ProfileHeader;