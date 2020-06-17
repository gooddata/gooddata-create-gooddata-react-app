// (C) 2019 GoodData Corporation
import { parseConfig } from "../configBootstrap";

describe("parseConfig", () => {
    it("should accept a valid config", () => {
        const input = { hostname: "foo.bar.com", appName: "Awesome app" };
        const expected = { hostname: "foo.bar.com", sanitizedAppName: "awesome-app" };
        const actual = parseConfig(input);
        expect(actual).toEqual(expected);
    });

    it("should accept a valid config without appName if one was provided via CLI", () => {
        const input = { hostname: "foo.bar.com" };
        const expected = { hostname: "foo.bar.com", sanitizedAppName: "awesome-app" };
        const actual = parseConfig(input, "Awesome app");
        expect(actual).toEqual(expected);
    });

    it("should throw if hostname is missing", () => {
        const input = { projectId: "ABCDEF", appName: "Awesome app" };
        expect(() => parseConfig(input)).toThrow();
    });

    it("should throw if appName is missing and no appName was provided via CLI", () => {
        const input = { hostname: "foo.bar.com", projectId: "ABCDEF" };
        expect(() => parseConfig(input)).toThrow();
    });
});
