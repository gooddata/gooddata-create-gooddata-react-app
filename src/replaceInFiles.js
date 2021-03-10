// (C) 2019 GoodData Corporation
import fs from "fs-extra";
import path from "path";
import flatMap from "lodash/flatMap";

export const parseReplacementSpecTree = (currentPath, specTreeOrReplacements) =>
    Array.isArray(specTreeOrReplacements)
        ? { file: currentPath, replacements: specTreeOrReplacements }
        : flatMap(Object.entries(specTreeOrReplacements), ([key, value]) =>
              parseReplacementSpecTree(path.join(currentPath, key), value),
          );

const processFile = (readFile, writeFile) => async ({ file, replacements }) => {
    const contents = await readFile(file, { encoding: "utf8", flag: "r" });
    const replaced = replacements.reduce(
        (acc, { regex, value, apply }) => (apply || apply === undefined ? acc.replace(regex, value) : acc),
        contents,
    );
    return writeFile(file, replaced, { encoding: "utf8", flag: "w" });
};

const replaceInFiles = async (
    initialPath,
    replacementSpec,
    readFile = fs.readFile,
    writeFile = fs.writeFile,
) =>
    Promise.all(parseReplacementSpecTree(initialPath, replacementSpec).map(processFile(readFile, writeFile)));

export default replaceInFiles;
