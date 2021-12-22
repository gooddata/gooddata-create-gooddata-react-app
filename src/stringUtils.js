// (C) 2019 GoodData Corporation
import kebabCase from "lodash/kebabCase";

export const DEFAULT_SCHEMA = "https";

export const getSchema = (hostname) => {
    const matches = /^(\w+):\/\//i.exec(hostname);

    if (!(matches && matches[1])) {
        return "";
    }

    return matches[1];
};

export const getHostnameWithSchema = (hostname) =>
    getSchema(hostname) ? hostname : `${DEFAULT_SCHEMA}://${hostname}`;

export const sanitizeAppName = kebabCase;
