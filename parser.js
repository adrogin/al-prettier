import { CharStream, CommonTokenStream } from 'antlr4';
import ALLexer from "../algrammar/JS/ALLexer.js";
import ALParser from "../algrammar/JS/ALParser.js";

function parse(text, options) {
    const input = text;
    const chars = new CharStream(input);
    const lexer = new ALLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new ALParser(tokens);

    const compilationUnit = parser.compilationUnit();

    const comments = [];
    findNodeComments(compilationUnit, tokens, comments);
    if (comments.length > 0) {
        compilationUnit.comments = comments;
    }

    return compilationUnit;
}

function findNodeComments(node, tokenStream, comments) {
    if (!node || !Array.isArray(node.children)) {
        return;
    }

    let index = 0;
    while (index < node.children.length) {
        const child = node.children[index];

        if (child && !child.hidden && child.symbol && typeof child.symbol.tokenIndex === "number") {
            const commentTokens = tokenStream.getHiddenTokensToLeft(child.symbol.tokenIndex, ALLexer.COMMENTS_CHANNEL);
            if (commentTokens && commentTokens.length > 0) {
                comments.push(...commentTokens.map(token => ({
                    symbol: {
                        text: token.text,
                        start: token.start,
                        stop: token.stop,
                        startLine: token.line,
                        startColumn: token.column,
                        stopLine: token.line,
                        stopColumn: token.column + token.text.length,
                    },
                    printed: false
                })));
                index += 1;
                continue;
            }
        }

        findNodeComments(child, tokenStream, comments);
        index += 1;
    }
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
