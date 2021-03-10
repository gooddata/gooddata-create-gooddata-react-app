// (C) 2019 GoodData Corporation
import { parseConfig } from "../configBootstrap";

describe("parseConfig", () => {
    it("should accept a valid config", () => {
        const input = { hostname: "foo.bar.com", appName: "Awesome app" };
        const expected = { hostname: "foo.bar.com", sanitizedAppName: "awesome-app", flavor: "js" };
        const actual = parseConfig(undefined, input);
        expect(actual).toEqual(expected);
    });

    it("should accept a valid config without appName if one was provided via CLI", () => {
        const input = { hostname: "foo.bar.com" };
        const expected = { hostname: "foo.bar.com", sanitizedAppName: "awesome-app", flavor: "js" };
        const actual = parseConfig("Awesome app", input);
        expect(actual).toEqual(expected);
    });

    it("should throw if hostname is missing", () => {
        const input = { projectId: "ABCDEF", appName: "Awesome app" };
        expect(() => parseConfig("Awesome app", input)).toThrow();
    });

    it("should throw if appName is missing and no appName was provided via CLI", () => {
        const input = { hostname: "foo.bar.com", projectId: "ABCDEF" };
        expect(() => parseConfig(undefined, input)).toThrow();
    });

    it("should set flavor to 'js' if flavor is missing in the config", () => {
        const input = { hostname: "foo.bar.com", appName: "Awesome app" };
        const expected = { hostname: "foo.bar.com", sanitizedAppName: "awesome-app", flavor: "js" };
        const actual = parseConfig(undefined, input);
        expect(actual).toEqual(expected);
    });

    it.each(["ts", "js"])("should set flavor from the config if input value is '%s'", flavor => {
        const input = { hostname: "foo.bar.com", appName: "Awesome app", flavor };
        const expected = { hostname: "foo.bar.com", sanitizedAppName: "awesome-app", flavor };
        const actual = parseConfig(undefined, input);
        expect(actual).toEqual(expected);
    });

    it("should throw if flavor is set to invalid value", () => {
        const input = { hostname: "foo.bar.com", appName: "Awesome app", flavor: "coffee" };
        expect(() => parseConfig(undefined, input)).toThrow();
    });
});
