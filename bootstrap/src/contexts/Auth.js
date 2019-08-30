import React, { useState, useEffect, useCallback, useContext } from "react";
import sdk, { ApiResponseError } from "@gooddata/gooddata-js";
import { defaultSourceState } from "../utils";
import { createContext } from "react";

const AuthContext = createContext({
    ...defaultSourceState,
    loginError: null,
    login: () => Promise.reject("Context not ready"),
    logout: () => Promise.reject("Context not ready"),
});

const getUser = async () => {
    const isLoggedIn = await sdk.user.isLoggedIn();
    if (!isLoggedIn) {
        throw new Error("Unauthorized");
    }
    return sdk.user.getAccountInfo();
};

export const AuthProvider = ({ children }) => {
    const [userState, setUserState] = useState({ ...defaultSourceState });
    useEffect(() => {
        getUser()
            .then(account => {
                setUserState({ isLoading: false, error: null, data: account });
            })
            .catch(error => {
                setUserState({ isLoading: false, error, data: null });
            });
    }, []);

    const login = useCallback(async (username, password) => {
        setUserState({ isLoading: true, error: null, data: null });
        return sdk.user
            .login(username, password)
            .then(user => {
                setUserState({ isLoading: false, error: null, data: user });
                return user;
            })
            .catch(error => {
                setUserState({ isLoading: false, error, data: null });
                throw new ApiResponseError(error.message, error.response, error.responseBody);
            });
    }, []);

    const logout = useCallback(async () => {
        setUserState({
            ...userState,
            isLoading: true,
            error: null,
        });
        return sdk.user
            .logout()
            .then(() => {
                setUserState({
                    isLoading: false,
                    error: null,
                    data: null,
                });
            })
            .catch(() => {
                setUserState({
                    isLoading: false,
                    error: null,
                    data: null,
                });
            });
    }, [userState]);

    return <AuthContext.Provider value={{ ...userState, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth || defaultSourceState;
};
