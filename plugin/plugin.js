import parser from "./parser.js";
import printer from "./printer.js";

const alPrettier = {
    languages: [
        {
            name: "al",
            parsers: ["al-parse"]
        }
    ],
    parsers: {
        "al-parse": parser
    },
    printers: {
        "al-ast": printer
    },
    options: {
        groupGlobalVars: {
            type: "string",
            category: "AL",
            default: "none",
            description: "Enables grouping of global variables in table objects. Available options are: none, top, bottom, beforeCode"
        },
        noLineBreaksInAttributes: {
            type: "boolean",
            category: "AL",
            default: false,
            description: "If set to true, procedure attributes are always printed in a single line, ignoring the max line width"
        },
        removeEmptyElements: {
            type: "boolean",
            category: "AL",
            default: false,
            description: "Remove empty element blocks from AL objects"
        },
        collapseEmptyBraces: {
            type: "boolean",
            category: "AL",
            default: true,
            description: "Place curly braces without content between them on one line"
        }
    }
};

export default alPrettier;
