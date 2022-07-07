// (C) 2021 GoodData Corporation

import { getSchema, DEFAULT_SCHEMA, getHostnameWithSchema } from "./stringUtils";
import replaceInFiles from "./replaceInFiles";

export const performTemplateReplacements = async ({
    targetDir,
    sanitizedAppName,
    hostname,
    backend,
    flavor,
}) => {
    const hostnameSchema = getSchema(hostname) || DEFAULT_SCHEMA;
    const isTigerBackend = backend === "tiger";

    // this object has structure corresponding to the file structure relative to targetDir
    // having it like this makes sure that all the replacements relevant to each file are in one place, thus preventing race conditions
    const replacementDefinitions = {
        "package.json": [
            { regex: /@gooddata\/gdc-app-name/, value: sanitizedAppName },
            {
                regex: /@gooddata\/sdk-backend-bear/g,
                value: "@gooddata/sdk-backend-tiger",
                apply: isTigerBackend,
            },
            {
                regex: /"refresh-md": "node .\/scripts\/refresh-md.js"/g,
                value: '"refresh-md": "node ./scripts/refresh-md.js --backend tiger"',
                apply: isTigerBackend,
            },
            {
                regex: /HTTPS=true/g,
                value: "",
                apply: hostnameSchema !== "https",
            },
            {
                regex: /PORT=3000/g,
                value: "PORT=8443",
                apply: isTigerBackend,
            },
        ],
        src: {
            [`constants.${flavor}`]: [
                { regex: /appName = "(.*?)"/, value: `appName = "${sanitizedAppName}"` },
                {
                    regex: /backend = "https:\/\/developer\.na\.gooddata\.com"/g,
                    value: `backend = "${getHostnameWithSchema(hostname)}"`,
                },
            ],
            "setupProxy.js": [
                {
                    regex: /"\/gdc"/g,
                    value: '"/api"',
                    apply: isTigerBackend,
                },
            ],
            components: {
                Header: {
                    // remove Login / Logout buttons for now from tiger
                    [flavor === "js" ? "Header.js" : "Header.tsx"]: [
                        { regex: /import Aside from ".\/Aside";\n/g, value: "", apply: isTigerBackend },
                        { regex: /<Aside \/>/g, value: "", apply: isTigerBackend },
                    ],
                },
            },
        },
    };

    return replaceInFiles(targetDir, replacementDefinitions);
};
