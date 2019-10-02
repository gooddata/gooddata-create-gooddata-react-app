import React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

import styles from "./Header.module.scss";
import { useAuth } from "../../contexts/Auth";
import InlineLoading from "../InlineLoading";

const Aside = () => {
    const authState = useAuth();
    return (
        <div className={styles.Aside}>
            {authState.isLoading && <InlineLoading />}
            {!authState.isLoading && authState.data && (
                <Link to="/logout" className={cx(styles.Link, "s-logout-link")}>
                    Logout
                </Link>
            )}
            {!authState.isLoading && !authState.data && (
                <Link to="/login" className={cx(styles.Link, "s-login-link")}>
                    Login
                </Link>
            )}
        </div>
    );
};

export default Aside;
