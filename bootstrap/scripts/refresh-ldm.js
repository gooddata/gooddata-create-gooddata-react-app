#!/usr/bin/env node

const { projectId, backend } = require("../src/constants");
const path = "./src/ldm/full.ts";
process.argv.push("--project-id", projectId, "--hostname", backend, "--output", path);
require("../node_modules/.bin/gdc-catalog-export");
