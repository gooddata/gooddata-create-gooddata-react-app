// (C) 2019 GoodData Corporation
import fs from "fs-extra";

import { sanitizeAppName } from "./stringUtils";

export const parseConfig = ({ domain, projectId, appName }, nameFromCli) => {
    if (!domain) {
        throw new Error("You must provide a domain for your app");
    }

    if (!projectId) {
        throw new Error("You must provide a projectId for your app");
    }

    const sanitizedAppName = sanitizeAppName(appName || nameFromCli);
    if (!sanitizedAppName) {
        throw new Error("You must provide a name for your app");
    }

    return {
        sanitizedAppName,
        domain,
        projectId,
    };
};

/**
 * Obtains all the information needed to bootstrap the project from config file.
 * @param {string} nameFromCli App name provided as the CLI argument.
 * @param {Object} options Other options from the CLI.
 */
const getBootstrapData = async (nameFromCli, { config }) => {
    const contents = await fs.readJSON(config, { encoding: "utf8", flag: "r" });
    return parseConfig(contents, nameFromCli);
};

export default getBootstrapData;
