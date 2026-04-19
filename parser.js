import { CharStream, CommonTokenStream } from 'antlr4';
import ALLexer from "../algrammar/JS/ALLexer.js";
import ALParser from "../algrammar/JS/ALParser.js";

function parse(text, options) {
    const input = text;
    const chars = new CharStream(input);
    const lexer = new ALLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new ALParser(tokens);

    return parser.compilationUnit();
}

function locStart(node) {
    if (!node) {
        return 0;
    }

    const token = node.start || node.symbol;
    return token && typeof token.start === "number" ? token.start : 0;
}

function locEnd(node) {
    if (!node) {
        return 0;
    }

    const token = node.stop || node.symbol;
    return token && typeof token.stop === "number" ? token.stop : 0;
}

function hasPragma(text) {
    return true;
}

function hasIgnorePragma(text) {
    return false;
}

export const parser =
{
    parse,
    astFormat: "al-ast",
    hasPragma,
    hasIgnorePragma,
    locStart,
    locEnd
};
