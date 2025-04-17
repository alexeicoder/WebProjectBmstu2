import React from "react";
import ProfileCard from "./ProfileCard";
import styles from './ProfileList.module.css';

function ProfileList({ profiles }) {



    return (
        <>
            <div className={styles.profileList}>
                {/* <p>Profile List</p> */}
                {profiles.map(profile => (
                    <ProfileCard
                        key={profile.id}
                        name={profile.name}
                        followersCount={0}
                        reviewsCount={0}
                    />
                ))}
            </div>
        </>
    );
}

export default ProfileList;