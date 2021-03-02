// (C) 2019 GoodData Corporation
import chalk from "chalk";
import path from "path";
import execa from "execa";
import Listr from "listr";
import mkdirp from "mkdirp";
import tar from "tar";

import processTigerFiles from "./processTigerFiles";
import { verboseLog } from "./verboseLogging";
import { performTemplateReplacements } from "./performTemplateReplacements";

const getTargetDirPath = (sanitizedAppName, targetDir) =>
    path.resolve(targetDir || process.cwd(), sanitizedAppName);

const copyAppFiles = async ({ targetDir, flavor }) => {
    const tarFile = flavor === "js" ? "bootstrap.js.tgz" : "bootstrap.ts.tgz";
    mkdirp(targetDir);
    return tar.x({
        file: path.resolve(__dirname, tarFile),
        strip: 1,
        cwd: targetDir,
    });
};

const setupApp = async bootstrapData => {
    await performTemplateReplacements(bootstrapData);
    await processTigerFiles(bootstrapData.targetDir, bootstrapData.backend === "tiger");
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
            task: () => setupApp(bootstrapData),
        },
    ]);

    await tasks.run();

    if (await runYarnInstall(bootstrapData)) {
        outputFinalInstructions(bootstrapData);
    }
};

export default main;
