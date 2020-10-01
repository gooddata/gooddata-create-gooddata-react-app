// (C) 2019 GoodData Corporation
import React, { createContext, useContext, useEffect, useState } from "react";
import bearFactory, { FixedLoginAndPasswordAuthProvider } from "@gooddata/sdk-backend-bear";

import { useAuthState, initialState } from "./state";
import { backend } from "../../constants";

const backendConfig = {};

if (process.env.REACT_APP_SET_HOSTNAME) {
    backendConfig.hostname = backend;
}

const noop = () => undefined;

const defaultContext = {
    ...initialState,
    backend: bearFactory(backendConfig),
    authError: null,
    login: noop,
    logout: noop,
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

    const [backend, setBackend] = useState(defaultContext.backend);

    const login = async (username, password) => {
        onLoginStart();
        try {
            const newBackend = bearFactory(backendConfig).withAuthentication(
                new FixedLoginAndPasswordAuthProvider(username, password),
            );
            await newBackend.authenticate();
            setBackend(newBackend);
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
                await backend.authenticate();
                onLoginSuccess();
            } catch (err) {
                // we do not care about the error in this context
                onLoginError({});
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
    const { backend: backendFromAuth } = useAuth();
    return backendFromAuth;
};
