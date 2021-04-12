// (C) 2020 GoodData Corporation
import fs from "fs-extra";

import { safeJoin } from "./pathUtils";

const filesToRemoveInTiger = ["./Dockerfile", "./docker"];
const filesToRemoveInBear = [];

/**
 * Removes all files irrelevant for a given backend.
 *
 * @param {string} initialPath - path where to start looking for tiger files
 * @param {boolean} isTigerBackend - flag indicating if the backend to use is tiger
 */
const removeBackendInvalidFiles = async (initialPath, isTigerBackend) => {
    const filesToRemove = isTigerBackend ? filesToRemoveInTiger : filesToRemoveInBear;

    // The initial path on windows will contain backslash. To avoid problems, we use normal slashes.
    const absolutePaths = filesToRemove.map((relativePath) => safeJoin(initialPath, relativePath));

    return Promise.all(absolutePaths.map((absolutePath) => fs.remove(absolutePath)));
};

export default removeBackendInvalidFiles;
