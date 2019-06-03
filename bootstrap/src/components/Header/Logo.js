import React from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import constants from "../../constants";

import styles from "./Header.module.scss";

const Logo = () => {
    return (
        <NavLink to="/" className={cx(styles.Link, styles.Logo)}>
            {constants.appName}
        </NavLink>
    );
};

export default Logo;
