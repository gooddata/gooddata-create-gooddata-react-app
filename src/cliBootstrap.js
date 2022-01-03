// (C) 2019 GoodData Corporation
import { inquireName, inquireHostname, inquireFlavor, inquireBackend } from "./inquiries";
import { sanitizeAppName } from "./stringUtils";

const getSanitizedAppName = async (nameFromCli) => {
    const name = nameFromCli || (await inquireName());

    if (!name) {
        throw new Error("You must provide a name for your app");
    }

    return sanitizeAppName(name);
};

const getSanitizedFlavor = async (flavor) => {
    const sanitizedFlavor = flavor !== "ts" && flavor !== "js" ? undefined : flavor;
    return sanitizedFlavor || inquireFlavor();
};

const getSanitizedBackend = async (backend) => {
    const sanitizedBackend = backend !== "bear" && backend !== "tiger" ? undefined : backend;
    return sanitizedBackend || inquireBackend();
};

/**
 * Obtains all the information needed to bootstrap the project either from command line options or via interactive prompts.
 * @param {string} nameFromCli App name provided as the CLI argument.
 * @param {Object} options Other options from the CLI.
 */
const getBootstrapData = async (
    nameFromCli,
    { hostname: hostnameFromCli, backend: backendFromCli, flavor: flavorFromCli },
) => {
    const sanitizedAppName = await getSanitizedAppName(nameFromCli);

    const backend = await getSanitizedBackend(backendFromCli);

    const hostname = hostnameFromCli || (await inquireHostname(backend === "bear"));

    const flavor = await getSanitizedFlavor(flavorFromCli);

    return {
        sanitizedAppName,
        hostname,
        flavor,
        backend,
    };
};

export default getBootstrapData;
