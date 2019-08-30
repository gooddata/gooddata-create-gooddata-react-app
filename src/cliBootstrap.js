// (C) 2019 GoodData Corporation
import sdk from "@gooddata/gooddata-js";
import Listr from "listr";
import chalk from "chalk";

import {
    inquireName,
    inquireDomain,
    inquireProjectId,
    inquireUsernamePassword,
    inquireProjectChoice,
    CHOOSING_PROJECT_ID,
} from "./inquiries";
import { sanitizeAppName, getDomainWithSchema } from "./stringUtils";

const outputProjectIdInstructions = () => {
    console.log("To obtain project ID, please consult the help");
    console.log(
        chalk.cyan(
            "https://help.gooddata.com/doc/en/project-and-user-administration/administering-projects-and-project-objects/find-the-project-id",
        ),
    );
    console.log("or request a trial");
    console.log(chalk.cyan("https://gooddata.com/trial"));
};

const showProjectIdPicker = async domain => {
    const { username, password } = await inquireUsernamePassword();
    try {
        sdk.config.setCustomDomain(getDomainWithSchema(domain));

        const tasks = new Listr([
            {
                title: "Signing you in",
                task: () =>
                    sdk.user.login(username, password).catch(e => {
                        throw new Error(
                            `Error communicating with GoodData (${e.message}). Please try again.`,
                        );
                    }),
            },
            {
                title: "Getting available projects",
                task: async ctx => {
                    const metadataResponse = await sdk.xhr.get("/gdc/md");
                    const metadata = metadataResponse.getData();
                    ctx.links = metadata.about.links;
                    const hasProjects = ctx.links && ctx.links.length > 0;
                    if (!hasProjects) {
                        throw new Error(
                            "There is no project associated with your account. Please contact your administrator.",
                        );
                    }
                },
            },
        ]);

        const { links } = await tasks.run();

        return inquireProjectChoice(links);
    } catch (e) {
        return process.exit(1);
    }
};

const getSanitizedAppName = async nameFromCli => {
    const name = nameFromCli || (await inquireName());

    if (!name) {
        throw new Error("You must provide a name for your app");
    }

    return sanitizeAppName(name);
};

const getProjectId = async domain => {
    const projectId = await inquireProjectId();

    if (projectId === CHOOSING_PROJECT_ID) {
        return showProjectIdPicker(domain);
    }

    if (projectId) {
        return projectId;
    }

    outputProjectIdInstructions();
    return process.exit();
};

/**
 * Obtains all the information needed to bootstrap the project either from command line options or via interactive prompts.
 * @param {string} nameFromCli App name provided as the CLI argument.
 * @param {Object} options Other options from the CLI.
 */
const getBootstrapData = async (nameFromCli, { domainUrl: domainFromCli, projectId: projectIdFromCli }) => {
    const sanitizedAppName = await getSanitizedAppName(nameFromCli);

    const domain = domainFromCli || (await inquireDomain());

    const projectId = projectIdFromCli || (await getProjectId(domain));

    return {
        sanitizedAppName,
        domain,
        projectId,
    };
};

export default getBootstrapData;
