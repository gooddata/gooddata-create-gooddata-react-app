// (C) 2019 GoodData Corporation
import kebabCase from "lodash/kebabCase";

const hasSchema = (hostname) => /^\w+:\/\//i.test(hostname);
export const getHostnameWithSchema = (hostname) => (hasSchema(hostname) ? hostname : `https://${hostname}`);
export const sanitizeAppName = kebabCase;
