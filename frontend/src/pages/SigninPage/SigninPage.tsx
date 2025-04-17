// import React from "react";
import SigninForm from "../../components/SigninForm/SigninForm";
import styles from './SigninPage.module.css';

function SigninPage() {
    return (
        <div className={styles.layout}>
            <SigninForm />
        </div>
    )
}

export default SigninPage;