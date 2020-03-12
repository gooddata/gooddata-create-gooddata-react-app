// (C) 2019 GoodData Corporation
import chalk from "chalk";
import path from "path";
import execa from "execa";
import Listr from "listr";
import mkdirp from "mkdirp";
import tar from "tar";

import replaceInFiles from "./replaceInFiles";
import { getDomainWithSchema } from "./stringUtils";
import { verboseLog } from "./verboseLogging";

const getTargetDirPath = (sanitizedAppName, targetDir) =>
    path.resolve(targetDir || process.cwd(), sanitizedAppName);

const copyAppFiles = async ({ targetDir }) => {
    mkdirp(targetDir);
    return tar.x({
        file: path.resolve(__dirname, "bootstrap.tgz"),
        strip: 1,
        cwd: targetDir,
    });
};

const performTemplateReplacements = ({ targetDir, sanitizedAppName, domain }) => {
    // this object has structure corresponding to the file structure relative to targetDir
    // having it like this makes sure that all the replacements relevant to each file are in one place, thus preventing race conditions
    const replacementDefinitions = {
        "package.json": [{ regex: /@gooddata\/gdc-app-name/, value: sanitizedAppName }],
        src: {
            "constants.js": [
                { regex: /appName: "(.*?)"/, value: `appName: "${sanitizedAppName}"` },
                {
                    regex: /backend: "https:\/\/developer\.na\.gooddata\.com"/g,
                    value: `backend: "${getDomainWithSchema(domain)}"`,
                },
            ],
        },
    };

    return replaceInFiles(targetDir, replacementDefinitions);
};

const runYarnInstall = ({ targetDir, install }) => {
    if (!install) {
        console.log("Skipping installation because the --no-install flag was specified");
        return true;
    }

    return execa("yarn", {
        cwd: targetDir,
        stdio: [process.stdin, process.stdout, process.stderr],
    })
        .then(() => true)
        .catch(() => {
            console.log(
                chalk.red(
                    "Installation failed. Please make sure that you have yarn installed and try again.",
                ),
            );
            return false;
        });
};

const outputFinalInstructions = ({ sanitizedAppName, install, targetDir }) => {
    console.log(`Success! Your GoodData-powered application "${sanitizedAppName}" was created.`);
    console.log("You can start it using the following commands:");
    console.log(chalk.cyan(`    cd ${path.relative(process.cwd(), targetDir)}`));
    if (!install) {
        console.log(chalk.cyan("    yarn install"));
    }
    console.log(chalk.cyan("    yarn start"));
};

const main = async partialBootstrapData => {
    const bootstrapData = {
        ...partialBootstrapData,
        targetDir: getTargetDirPath(partialBootstrapData.sanitizedAppName, partialBootstrapData.targetDir),
    };

    if (bootstrapData.verbose) {
        verboseLog(`Target directory: ${bootstrapData.targetDir}`);
    }

    const tasks = new Listr([
        {
            title: "Copy app files",
            task: () => copyAppFiles(bootstrapData),
        },
        {
            title: "Set up app",
            task: () => performTemplateReplacements(bootstrapData),
        },
    ]);

    await tasks.run();

    if (await runYarnInstall(bootstrapData)) {
        outputFinalInstructions(bootstrapData);
    }
};

export default main;
