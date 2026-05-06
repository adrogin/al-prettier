import * as prettier from "prettier";

export async function alFormat(code) {
    return prettier.format(code, {
        parser: "al-parse",
        plugins: ["./plugin/plugin.js"],
    });
}

export function compareIndentedList(expected, actual) {
    if (expected.length !== actual.length) {
        throw new Error("Arrays have different lengths.");
    }

    for (let i = 0; i < expected.length; i++) {
        if (expected[i].type === "indent") {
            const newExpected = expected[i].contents.flat(Infinity);
            const newActual = actual[i].contents.flat(Infinity);
            compareIndentedList(newExpected, newActual);
        }
        else if (expected[i] !== actual[i]) {
            throw new Error(`Elements in position ${i} are not equal.`);
        }
    }
}
