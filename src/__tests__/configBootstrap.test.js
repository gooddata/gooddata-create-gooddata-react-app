// (C) 2019 GoodData Corporation
import { parseConfig } from "../configBootstrap";

describe("parseConfig", () => {
    it("should accept a valid config", () => {
        const input = { domain: "foo.bar.com", projectId: "ABCDEF", appName: "Awesome app" };
        const expected = { domain: "foo.bar.com", projectId: "ABCDEF", sanitizedAppName: "awesome-app" };
        const actual = parseConfig(input);
        expect(actual).toEqual(expected);
    });

    it("should accept a valid config without appName if one was provided via CLI", () => {
        const input = { domain: "foo.bar.com", projectId: "ABCDEF" };
        const expected = { domain: "foo.bar.com", projectId: "ABCDEF", sanitizedAppName: "awesome-app" };
        const actual = parseConfig(input, "Awesome app");
        expect(actual).toEqual(expected);
    });

    it("should throw if domain is missing", () => {
        const input = { projectId: "ABCDEF", appName: "Awesome app" };
        expect(() => parseConfig(input)).toThrow();
    });

    it("should throw if projectId is missing", () => {
        const input = { domain: "foo.bar.com", appName: "Awesome app" };
        expect(() => parseConfig(input)).toThrow();
    });

    it("should throw if appName is missing and no appName was provided via CLI", () => {
        const input = { domain: "foo.bar.com", projectId: "ABCDEF" };
        expect(() => parseConfig(input)).toThrow();
    });
});
