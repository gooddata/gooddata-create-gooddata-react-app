import React from "react";

import Page from "../components/Page";
import LoginForm from "../components/Auth/LoginForm";
import { useAuth } from "../contexts/Auth";

import styles from "../components/Page.module.scss";

function Login() {
    const { login, authError } = useAuth();

    return (
        <Page className={styles.Inverse} mainClassName={styles.VerticalCenter}>
            <LoginForm login={login} loginError={authError} />
        </Page>
    );
}

export default Login;
