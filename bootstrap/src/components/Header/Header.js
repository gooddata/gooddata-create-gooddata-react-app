import React, { useState, useEffect, useCallback } from "react";
import throttle from "lodash/throttle";
import Logo from "./Logo";

import styles from "./Header.module.scss";
import Links from "./Links";
import Aside from "./Aside";

const VR = ({ ...restProps }) => <div className={styles.VR} {...restProps} />;

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={styles.BurgerMenu}>
            <button
                className={styles.BurgerToggle}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                ☰
            </button>
            {isOpen && (
                <div className={styles.BurgerContent}>
                    <Links />
                </div>
            )}
        </div>
    );
};

const Header = () => {
    const [windowWidth, setWindowWidth] = useState(window ? window.innerWidth : null);

    const handleResize = useCallback(
        throttle(() => {
            if (window) {
                setWindowWidth(window.innerWidth);
            }
        }, 200),
        [],
    );

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    // You need to set this manually to the smallest window width that can still fit all menu items
    const isTooSmall = windowWidth < 440;
    return (
        <nav className={styles.Header}>
            {isTooSmall ? (
                <>
                    <BurgerMenu />
                    <Logo />
                </>
            ) : (
                <>
                    <Logo />
                    <VR />
                    <Links />
                </>
            )}
            <Aside />
        </nav>
    );
};

export default Header;
