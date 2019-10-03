// (C) 2019 GoodData Corporation
import {
    inquireName,
    inquireDomain,
} from "./inquiries";
import { sanitizeAppName } from "./stringUtils";

const getSanitizedAppName = async nameFromCli => {
    const name = nameFromCli || (await inquireName());

    if (!name) {
        throw new Error("You must provide a name for your app");
    }

    return sanitizeAppName(name);
};

/**
 * Obtains all the information needed to bootstrap the project either from command line options or via interactive prompts.
 * @param {string} nameFromCli App name provided as the CLI argument.
 * @param {Object} options Other options from the CLI.
 */
const getBootstrapData = async (nameFromCli, { domainUrl: domainFromCli}) => {
    const sanitizedAppName = await getSanitizedAppName(nameFromCli);

    const domain = domainFromCli || (await inquireDomain());

    return {
        sanitizedAppName,
        domain,
    };
};

export default getBootstrapData;
