import React, { useState, useEffect, useCallback, useContext, createContext } from "react";
import { ApiResponseError } from "@gooddata/gooddata-js";
import { defaultSourceState } from "../utils";
import sdk from "../sdk";

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
        const initializeUser = async () => {
            try {
                const user = await getUser();
                setUserState({ isLoading: false, error: null, data: user });
            } catch (error) {
                setUserState({ isLoading: false, error, data: null });
            }
        };
        initializeUser();
    }, []);

    const login = useCallback(async (username, password) => {
        try {
            setUserState({ isLoading: true, error: null, data: null });
            await sdk.user.login(username, password);
            const user = await getUser();
            setUserState({ isLoading: false, error: null, data: user });
            return user;
        } catch (error) {
            setUserState({ isLoading: false, error, data: null });
            throw new ApiResponseError(error.message, error.response, error.responseBody);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            setUserState({
                ...userState,
                isLoading: true,
                error: null,
            });

            await sdk.user.logout();

            setUserState({
                isLoading: false,
                error: null,
                data: null,
            });
        } catch (error) {
            setUserState({
                isLoading: false,
                error: null,
                data: null,
            });
        }
    }, [userState]);

    return <AuthContext.Provider value={{ ...userState, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth || defaultSourceState;
};
