// (C) 2019 GoodData Corporation
import path from "path";
import replaceInFiles, { parseReplacementSpecTree } from "../replaceInFiles";

describe("replaceInFiles", () => {
    describe("parseReplacementSpecTree", () => {
        it("should parse an empty tree", () => {
            const expected = [];
            const input = {};
            const actual = parseReplacementSpecTree("", input);
            expect(actual).toEqual(expected);
        });
        it("should parse a simple tree", () => {
            const expected = [
                {
                    file: "a.js",
                    replacements: [{ regex: /foo/, value: "bar" }],
                },
                {
                    file: path.join("directory", "b.js"),
                    replacements: [{ regex: /bar/g, value: "baz" }],
                },
            ];
            const input = {
                "a.js": [{ regex: /foo/, value: "bar" }],
                directory: {
                    "b.js": [{ regex: /bar/g, value: "baz" }],
                },
            };
            const actual = parseReplacementSpecTree("", input);
            expect(actual).toEqual(expected);
        });
    });

    describe("replaceInFiles", () => {
        it("should replace values according to the spec", async () => {
            const readFileMock = async () => "foo bar baz buz";
            const writeFileMock = jest.fn();

            const spec = {
                directory: {
                    "b.js": [
                        { regex: /bar/g, value: "replaced", apply: true },
                        { regex: /baz/g, value: "not replaced", apply: false },
                        { regex: /buz/g, value: "buf" },
                    ],
                },
            };

            await replaceInFiles(".", spec, readFileMock, writeFileMock);

            expect(writeFileMock).toHaveBeenLastCalledWith(
                path.join(".", "directory", "b.js"),
                "foo replaced baz buf",
                { encoding: "utf8", flag: "w" },
            );
        });
    });
});
