// (C) 2020 GoodData Corporation
import fs from "fs-extra";
import path from "path";
import globby from "globby";

/**
 * If isTigerBackend is true, replaces the original file by the tiger version,
 * otherwise, removes the tiger version.
 *
 * @param {string} tigerVersion - path to the tiger version of the file
 * @param {boolean} isTigerBackend - flag indicating if the backend to use is tiger
 */
const processTigerFile = async (tigerVersion, isTigerBackend) => {
    if (isTigerBackend) {
        const originalVersion = tigerVersion.replace(/--tiger(\..+)$/, "$1");
        await fs.remove(originalVersion);
        await fs.rename(tigerVersion, originalVersion);
    } else {
        await fs.remove(tigerVersion);
    }
};

/**
 * Goes through the bootstrapped application and handles tiger specific files:
 * deleting them if not on tiger, or using them instead of the originals instead.
 * The tiger-specific versions of files are identified by the "--tiger" name suffix,
 * for example Welcome--tiger.tsx is a tiger version of Welcome.tsx.
 *
 * @param {string} initialPath - path where to start looking for tiger files
 * @param {boolean} isTigerBackend - flag indicating if the backend to use is tiger
 */
const processTigerFiles = async (initialPath, isTigerBackend) => {
    // The initial path on windows will contain backslash. Globby does not work with those and
    // will find no tiger files on windows. Using normal slashes for globby and then node fs calls
    // is no problem on windows.
    const pattern = path.posix.join(initialPath, "./**/*--tiger.*").replace(/\\/g, "/");
    const tigerFiles = await globby(pattern);

    return Promise.all(tigerFiles.map(file => processTigerFile(file, isTigerBackend)));
};

export default processTigerFiles;
