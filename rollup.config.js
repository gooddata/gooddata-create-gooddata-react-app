// (C) 2019 GoodData Corporation
import { terser } from "rollup-plugin-terser";

export default {
    input: "index.js",
    output: {
        file: "dist/index.js",
        format: "cjs",
    },
    plugins: [terser()],
    // suppress warnings about unresolved modules from node_modules
    // see https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
    external: [
        "chalk",
        "child_process",
        "commander",
        "execa",
        "fs-extra",
        "globby",
        "inquirer",
        "listr2",
        "lodash/flatMap",
        "lodash/kebabCase",
        "mkdirp",
        "path",
        "tar",
    ],
};
