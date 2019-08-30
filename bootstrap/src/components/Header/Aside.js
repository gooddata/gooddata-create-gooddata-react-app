import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import { useAuth } from "../../contexts/Auth";
import InlineLoading from "../InlineLoading";

const Aside = () => {
    const authState = useAuth();
    return (
        <div className={styles.Aside}>
            {authState.isLoading && <InlineLoading />}
            {!authState.isLoading && authState.data && (
                <Link to="/logout" className={styles.Link}>
                    Logout
                </Link>
            )}
            {!authState.isLoading && !authState.data && (
                <Link to="/login" className={styles.Link}>
                    Login
                </Link>
            )}
        </div>
    );
};

export default Aside;
