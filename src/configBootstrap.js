// (C) 2019 GoodData Corporation
import fs from "fs-extra";

import { sanitizeAppName } from "./stringUtils";

export const parseConfig = (nameFromCli, { hostname, appName, flavor }) => {
    if (!hostname) {
        throw new Error("You must provide a hostname for your app");
    }

    const sanitizedAppName = sanitizeAppName(appName || nameFromCli);
    if (!sanitizedAppName) {
        throw new Error("You must provide a name for your app");
    }

    if (flavor !== undefined && flavor !== "ts" && flavor !== "js") {
        throw new Error("You must provide valid flavor value");
    }

    return {
        sanitizedAppName,
        hostname,
        flavor: flavor || "js",
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
        contents = await fs.readJSON(config, { encoding: "utf8", flag: "r" });
    } catch (err) {
        throw new Error(
            "The config file specified using the -c option was not found. Please check that the path you provided is correct.",
        );
    }

    return parseConfig(nameFromCli, contents);
};

export default getBootstrapData;
