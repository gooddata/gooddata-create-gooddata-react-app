#!/usr/bin/env node

const { workspace, backend } = require("../src/constants");
const path = "./src/ldm/full.js";
process.argv.push("--project-id", workspace, "--hostname", backend, "--output", path);
require("../node_modules/@gooddata/catalog-export");
