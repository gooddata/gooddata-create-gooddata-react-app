// (C) 2019 GoodData Corporation
import program from "commander";

import main from "./src/main";
import getBootstrapDataFromCli from "./src/cliBootstrap";
import getBootstrapDataFromConfig from "./src/configBootstrap";

process.on("unhandledRejection", (err) => console.error(err.message));

program
    .name("@gooddata/create-react-app")
    .arguments("[app-name]")
    .option("--hostname <hostname>", "URL of your GoodData host")
    .option("-c, --config <config>", "path to configuration file")
    .option("--target-dir <path>", 'path to the directory to create the app in (default: ".")')
    .option("--no-install", "skip yarn installing the app dependencies")
    .option("--verbose", "output additional logs, useful mainly for debugging and bug reports")
    .option("--backend <backend>", "setting backend of the app (default: bear backend)")
    .option("--flavor <flavor>", "language flavor of the app, either TypeScript (ts) or JavaScript (js)")
    .action(async (appName) => {
        const bootstrapFunc = program.config ? getBootstrapDataFromConfig : getBootstrapDataFromCli;
        const bootstrapData = await bootstrapFunc(appName, program);
        return main({
            ...bootstrapData,
            install: program.install,
            targetDir: program.targetDir,
            verbose: program.verbose,
        });
    })
    .parse(process.argv);
