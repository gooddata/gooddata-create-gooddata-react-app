// (C) 2019 GoodData Corporation
import kebabCase from "lodash/kebabCase";

const replaceSchemaWith = replacement => domain => domain.replace(/^(\w+:\/\/|)/, replacement);
export const getDomainWithSchema = replaceSchemaWith("https://");
export const getDomainWithoutSchema = replaceSchemaWith("");
export const sanitizeAppName = kebabCase;
