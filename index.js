// (C) 2019 GoodData Corporation
import program from "commander";

import main from "./src/main";
import getBootstrapDataFromCli from "./src/cliBootstrap";
import getBootstrapDataFromConfig from "./src/configBootstrap";

program
    .name("@gooddata/create-react-app")
    .arguments("[app-name]")
    .option("-d, --domainUrl <domain>", "URL of your GoodData domain")
    .option("-p, --projectId <projectId>", "projectID of your GoodData project")
    .option("-c, --config <config>", "path to configuration file")
    .option("--target-dir <path>", 'path to the directory to create the app in (default: ".")')
    .option("--no-install", "skip yarn installing the app dependencies")
    .option("--verbose", "output additional logs, useful mainly for debugging and bug reports")
    .action(async appName => {
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
