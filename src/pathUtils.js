// (C) 2021 GoodData Corporation
import path from "path";

/**
 * Safely joins two path parts together.
 *
 * Path on windows will contain backslashes which can cause problems with Globby. This function makes sure
 * only forward slashes are used so that Globby and node fs works properly on all platforms.
 *
 * @param {string} initialPath - the first part
 * @param {string} relativePath - the second part
 * @returns joined path
 */
export const safeJoin = (initialPath, relativePath) =>
    path.posix.join(initialPath, relativePath).replace(/\\/g, "/");
