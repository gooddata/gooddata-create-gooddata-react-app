// (C) 2019 GoodData Corporation
import { getHostnameWithSchema, getSchema } from "../stringUtils";

describe("stringUtils", () => {
    describe("getHostnameWithSchema", () => {
        it("should not change hostname with schema already present", () => {
            const expected = "https://foo.bar.com";
            const actual = getHostnameWithSchema(expected);
            expect(actual).toEqual(expected);
        });

        it("should add schema to hostname without schema", () => {
            const input = "foo.bar.com";
            const expected = "https://foo.bar.com";
            const actual = getHostnameWithSchema(input);
            expect(actual).toEqual(expected);
        });

        it("should not change existing non-https schema", () => {
            const input = "http://foo.bar.com";
            const actual = getHostnameWithSchema(input);
            expect(actual).toEqual(input);
        });
    });

    describe("getSchema", () => {
        it("should return http schema", () => {
            const input = "http://foo.bar.com";
            const expected = "http";
            const actual = getSchema(input);
            expect(actual).toEqual(expected);
        });

        it("should return https schema", () => {
            const input = "https://foo.bar.com";
            const expected = "https";
            const actual = getSchema(input);
            expect(actual).toEqual(expected);
        });

        it("should return empty string when no schema is detected", () => {
            const input = "foo.bar.com";
            const expected = "";
            const actual = getSchema(input);
            expect(actual).toEqual(expected);
        });
    });
});
