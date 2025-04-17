// import React from "react";
import SignupForm from "../../components/SignupForm/SignupForm"
import styles from './SignupPage.module.css';

function SignupPage() {
    return (
        <div className={styles.layout}>
            <SignupForm />
        </div>
    )
}

export default SignupPage;
