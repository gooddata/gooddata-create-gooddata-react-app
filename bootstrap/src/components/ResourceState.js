import React, { useEffect } from "react";

import DefaultLoadingComponent from "./CustomLoading";
import { ErrorComponent as DefaultErrorComponent, ErrorCodes } from "@gooddata/react-components";

export const defaultGetLoadingComponentProps = () => ({});
export const defaultGetErrorComponentProps = error => {
    if (error) {
        return {
            code: error.code,
            message: error.message,
        };
    }
    return {
        code: ErrorCodes.APP_NO_DATA.toString(),
        message: "No data",
    };
};

const ResourceState = ({
    children,
    source,
    onData = null,
    onError = null,
    onLoadingChanged = null,
    LoadingComponent = DefaultLoadingComponent,
    getLoadingComponentProps = defaultGetLoadingComponentProps,
    ErrorComponent = DefaultErrorComponent,
    getErrorComponentProps = defaultGetErrorComponentProps,
}) => {
    const { isLoading, error, data } = source;
    useEffect(() => {
        if (data && onData) {
            onData(data);
        }
        // Do not update on onData change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (error && onError) {
            onError(error);
        }
        // Do not update on onError change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    useEffect(() => {
        if (onLoadingChanged) {
            onLoadingChanged(isLoading);
        }
        // Do not update on onLoadingChanged change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    if (isLoading) {
        return <LoadingComponent {...getLoadingComponentProps()} />;
    }
    if (error) {
        return <ErrorComponent {...getErrorComponentProps(error)} />;
    }
    if (!data) {
        return <ErrorComponent {...getErrorComponentProps(error)} />;
    }
    return children(data);
};

export default ResourceState;
