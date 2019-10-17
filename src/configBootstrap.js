// (C) 2019 GoodData Corporation
import fs from "fs-extra";

import { sanitizeAppName } from "./stringUtils";

export const parseConfig = ({ domain, appName }, nameFromCli) => {
    if (!domain) {
        throw new Error("You must provide a domain for your app");
    }

    const sanitizedAppName = sanitizeAppName(appName || nameFromCli);
    if (!sanitizedAppName) {
        throw new Error("You must provide a name for your app");
    }

    return {
        sanitizedAppName,
        domain,
    };
};

/**
 * Obtains all the information needed to bootstrap the project from config file.
 * @param {string} nameFromCli App name provided as the CLI argument.
 * @param {Object} options Other options from the CLI.
 */
const getBootstrapData = async (nameFromCli, { config }) => {
    let contents = {};

    try {
        contents = await fs.readJSON(config, { encoding: "utf8", flag: "r" })
    } catch (err) {
        throw new Error("The config file specified using the -c option was not found. Please check that the path you provided is correct.");
    }

    return parseConfig(contents, nameFromCli);
};

export default getBootstrapData;
