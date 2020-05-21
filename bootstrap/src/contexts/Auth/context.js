// (C) 2019 GoodData Corporation
import React, { createContext, useContext, useEffect } from "react";
import backend, { authProvider } from "../../backend";
import { useAuthState, initialState } from "./state";

const noop = () => undefined;

const defaultContext = {
    ...initialState,
    backend,
    login: noop,
    logout: noop,
    register: noop,
};

export const AuthContext = createContext(defaultContext);

export const AuthProvider = ({ children }) => {
    const {
        onLoginStart,
        onLoginSuccess,
        onLoginError,
        onLogoutStart,
        onLogoutSuccess,
        onLogoutError,
        authStatus,
        authError,
    } = useAuthState(initialState);

    const login = async (username, password) => {
        onLoginStart();
        try {
            authProvider.username = username;
            authProvider.password = password;
            await backend.authenticate();
            onLoginSuccess();
        } catch (err) {
            onLoginError(err);
            throw err;
        }
    };

    const logout = async () => {
        onLogoutStart();
        try {
            await backend.deauthenticate();
            onLogoutSuccess();
        } catch (err) {
            onLogoutError(err);
            throw err;
        }
    };

    useEffect(() => {
        const auth = async () => {
            try {
                /**
                 * Authenticate force prop is needed to set to true in order
                 * for the login to be persisted after refreshing the page
                 */
                await backend.authenticate();
                onLoginSuccess();
            } catch (err) {
                onLoginError(err);
            }
        };

        auth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authStatus,
                authError,
                backend,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const useBackend = () => {
    const { backend } = useAuth();
    return backend;
};
