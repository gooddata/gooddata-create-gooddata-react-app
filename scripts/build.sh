#!/usr/bin/env bash

set -e

SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

function npm-do { (PATH=$(npm bin):$PATH; eval "$@";) }

# cleanup & dir setup
rm -rf dist
rm -rf build

mkdir dist
mkdir build
mkdir build/babel-source
mkdir build/tar-source

# build dist/index.js
npm-do rollup -c

# copy bootstrap files without node_modules and build to babel staging area because babel "ignore" option does not work
rm -rf bootstrap/build
rm -rf bootstrap/node_modules

cp -rv bootstrap/. build/babel-source
rm -f build/babel-source/src/react-app-env.d.ts

# transpile TypeScript files to JavaScript
npm-do babel --no-babelrc \
  --config-file "${SCRIPT_PATH}/../.babelrc-js" \
  --extensions .ts,.tsx build/babel-source -d build/tar-source

# format transpiled files as format was broken during transpile process
npm-do prettier --write "build/tar-source/**/*" \
  --parser typescript \
  --print-width 110 \
  --tab-width 4 \
  --trailing-comma all

# copy rest of the files that will be packed to JavaScript tar
cp -rv bootstrap/. build/tar-source
# remove the TypeScript specific files
find build/tar-source -type f \( -name '*.ts' -o -name '*.tsx' \) -exec rm -f {} +
rm -f build/tar-source/tsconfig.json

# replace TypeScript related content in JavaScript files
node -r esm "./src/processJavaScriptFiles.js" "${SCRIPT_PATH}/../build/tar-source"

# build tar with JavaScript bootstrap files
tar -czf ./dist/bootstrap.js.tgz -C build/tar-source .

# build tar with TypeScript bootstrap files
tar --exclude='node_modules' \
  --exclude='build' \
  --exclude='jsconfig.json' \
  -czf ./dist/bootstrap.ts.tgz \
  -C bootstrap .
