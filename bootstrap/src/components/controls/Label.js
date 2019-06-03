import React from "react";
import cx from "classnames";

import styles from "./Label.module.scss";

const Label = ({ className = null, type = "text", children, hasError = false, ...restProps }) => {
    return (
        <label className={cx(styles.Label, hasError && styles.Error, className)} {...restProps}>
            {children}
        </label>
    );
};

export default Label;
