// (C) 2019 GoodData Corporation
import { getDomainWithSchema, getDomainWithoutSchema } from "../stringUtils";

describe("stringUtils", () => {
    describe("getDomainWithSchema", () => {
        it("should not change domain with schema already present", () => {
            const expected = "https://foo.bar.com";
            const actual = getDomainWithSchema(expected);
            expect(actual).toEqual(expected);
        });

        it("should add schema to domain without schema", () => {
            const input = "foo.bar.com";
            const expected = "https://foo.bar.com";
            const actual = getDomainWithSchema(input);
            expect(actual).toEqual(expected);
        });

        it("should change http to https", () => {
            const input = "http://foo.bar.com";
            const expected = "https://foo.bar.com";
            const actual = getDomainWithSchema(input);
            expect(actual).toEqual(expected);
        });
    });

    describe("getDomainWithoutSchema", () => {
        it("should not change domain without schema", () => {
            const expected = "foo.bar.com";
            const actual = getDomainWithoutSchema(expected);
            expect(actual).toEqual(expected);
        });

        it("should remove schema from domain with schema", () => {
            const input = "https://foo.bar.com";
            const expected = "foo.bar.com";
            const actual = getDomainWithoutSchema(input);
            expect(actual).toEqual(expected);
        });
    });
});
