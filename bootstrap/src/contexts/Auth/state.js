// (C) 2019 GoodData Corporation
import { useState } from "react";

export const AuthStatus = {
    AUTHORIZING: "AUTHORIZING",
    AUTHORIZED: "AUTHORIZED",
    UNAUTHORIZED: "UNAUTHORIZED",
    LOGGING_IN: "LOGGING_IN",
    LOGGING_OUT: "LOGGING_OUT",
};

export const initialState = {
    authStatus: AuthStatus.AUTHORIZING,
};

export const useAuthState = (initialState) => {
    const [{ authStatus, authError }, setState] = useState(initialState);
    const onLoginStart = () =>
        setState({
            authStatus: AuthStatus.LOGGING_IN,
        });
    const onLoginSuccess = () =>
        setState({
            authStatus: AuthStatus.AUTHORIZED,
        });
    const onLoginError = (err) =>
        setState({
            authStatus: AuthStatus.UNAUTHORIZED,
            authError: err.message,
        });

    const onLogoutStart = () =>
        setState({
            authStatus: AuthStatus.LOGGING_OUT,
        });
    const onLogoutSuccess = () =>
        setState({
            authStatus: AuthStatus.UNAUTHORIZED,
            authError: undefined,
        });
    const onLogoutError = (err) =>
        setState({
            authStatus: AuthStatus.UNAUTHORIZED,
            authError: err.message,
        });

    return {
        onLoginStart,
        onLoginSuccess,
        onLoginError,
        onLogoutStart,
        onLogoutSuccess,
        onLogoutError,
        authStatus,
        authError,
    };
};
