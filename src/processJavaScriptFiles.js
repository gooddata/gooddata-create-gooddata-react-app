// (C) 2021 GoodData Corporation
import replaceInFiles from "./replaceInFiles";

const processedDirectoryPath = process.argv.slice(2)[0]; // the first node script argument

if (processedDirectoryPath === undefined) {
    throw new Error("The script requires one parameter with path to directory that will be processed!");
}

// this object has structure corresponding to the file structure relative to targetDir
// having it like this makes sure that all the replacements relevant to each file are in one place, thus preventing race conditions
const replacementDefinitions = {
    "package.json": [
        {
            regex: /\n.*@types\/.*/g, // match also previous new line to not have blank spaces between dependencies
            value: "",
        },
    ],
    "README.md": [
        {
            regex: /constants\.ts/g,
            value: "constants.js",
        },
        {
            regex: /full\.ts/g,
            value: "full.js",
        },
    ],
    "README--tiger.md": [
        {
            regex: /constants\.ts/g,
            value: "constants.js",
        },
        {
            regex: /full\.ts/g,
            value: "full.js",
        },
    ],
    src: {
        "setupProxy.js": [
            {
                regex: /constants\.ts/g,
                value: "constants",
            },
        ],
        contexts: {
            Auth: {
                "backend--tiger.js": [
                    {
                        regex: /constants\.ts/g,
                        value: "constants.js",
                    },
                ],
            },
        },
        routes: {
            "AppRouter.js": [
                {
                    // remove TypeScript syntax from commented example (Babel ignores it)
                    regex: /: React\.FC/g,
                    value: "",
                },
            ],
            "Welcome.js": [
                {
                    regex: /constants\.ts/g,
                    value: "constants.js",
                },
                {
                    regex: /full\.ts/g,
                    value: "full.js",
                },
                {
                    regex: /\.tsx/g,
                    value: ".js",
                },
            ],
            "Welcome--tiger.js": [
                {
                    regex: /constants\.ts/g,
                    value: "constants.js",
                },
                {
                    regex: /full\.ts/g,
                    value: "full.js",
                },
                {
                    regex: /\.tsx/g,
                    value: ".js",
                },
            ],
        },
    },
    scripts: {
        "refresh-ldm.js": [
            {
                regex: /constants\.ts/g,
                value: "constants",
            },
            {
                regex: /full\.ts/g,
                value: "full.js",
            },
        ],
        "run-testcafe.js": [
            {
                regex: /spec\.ts/g,
                value: "spec.js",
            },
        ],
    },
};

(async () => {
    await replaceInFiles(processedDirectoryPath, replacementDefinitions);
})();
