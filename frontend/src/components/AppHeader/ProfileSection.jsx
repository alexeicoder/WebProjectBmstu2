import React from "react";
import styles from './ProfileSection.module.css';

function ProfileSection({ avatar, name }) {
    return (
        <div className={styles.profileSection}>
            <div className={styles.profileAvatar}>

            </div>
            <div className={styles.profileName}>
                {name}
            </div>
        </div>
    )
}

export default ProfileSection;