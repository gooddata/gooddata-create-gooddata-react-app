import React, { useState, useEffect, useCallback } from "react";
import throttle from "lodash/throttle";
import Logo from "./Logo";

import styles from "./Header.module.scss";
import Links from "./Links";
import Aside from "./Aside";
import { useAuth } from "../../contexts/Auth";
// uncomment the next line to use ProjectPicker
// import ProjectPicker from "../controls/ProjectPicker";

const VR = ({ ...restProps }) => <div className={styles.VR} {...restProps} />;

// a wrapper for items visible to authenticated users only (e.g. ProjectPicker)
const ProtectedItems = ({ children }) => {
    const authState = useAuth();
    if (!authState.data || authState.isLoading) return null;
    return children || null;
};

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
                    <ProtectedItems>
                        {/* Uncomment these lines to add a project picker into the burger menu */}
                        {/* <div className={styles.Centered}>
                            <ProjectPicker />
                        </div> */}
                    </ProtectedItems>
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
    const isTooSmall = windowWidth < 666;
    return (
        <nav className={styles.Header}>
            {isTooSmall ? (
                <>
                    <BurgerMenu />
                    <Logo />
                </>
            ) : (
                <>
                    <ProtectedItems>
                        {/* Uncomment these lines to add a project picker into the menu */}
                        {/* <div className={`${styles.Centered} ${styles.Link}`}>
                            <ProjectPicker />
                        </div> */}
                    </ProtectedItems>
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
