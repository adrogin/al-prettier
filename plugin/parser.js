import { CharStream, CommonTokenStream, ErrorListener, DFA, PredictionContextCache } from 'antlr4';
import ALLexer from "../parser/ALLexer.js";
import ALParser from "../parser/ALParser.js";

class BreakProcessErrorListener extends ErrorListener {
    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        const errorMessage = `Parsing error at line ${line}, column ${column}: ${msg}`;
        throw new Error(errorMessage);
    }
}

// ALLexer.js and ALParser.js hold their DFA/prediction-context caches in module-level
// singletons that are shared and never cleared across parser instances. Reused across a
// long-lived process formatting many distinct files, those caches grow without bound.
// Swapping in fresh instances per file keeps each parse isolated and memory bounded 
// at the cost of degrading performance of multiple invocations of the formatter on the same file (Ctrl+S during editing).
// But with the cache optimisation enabled, formatting of the whole LS Central repo fails with out of memory exception easily swallowing 64 GB.
function resetAtnCaches(recognizer) {
    recognizer._interp.decisionToDFA = recognizer.atn.decisionToState.map((ds, index) => new DFA(ds, index));
    recognizer._interp.sharedContextCache = new PredictionContextCache();
}

function parse(text, options) {
    const input = text;
    const chars = new CharStream(input);
    const lexer = new ALLexer(chars);
    resetAtnCaches(lexer);
    const tokens = new CommonTokenStream(lexer);
    const parser = new ALParser(tokens);
    resetAtnCaches(parser);

    parser.addErrorListener(new BreakProcessErrorListener());

    const compilationUnit = parser.compilationUnit();

    const comments = [];
    attachNodeComments(compilationUnit, tokens, comments);
    if (comments.length > 0) {
        compilationUnit.comments = comments;
    }

    return compilationUnit;
}

function attachNodeComments(node, tokenStream, comments) {
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
                    value: token.text,
                    printed: false
                })));
            }
        }

        attachNodeComments(child, tokenStream, comments);
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

export default {
    parse,
    astFormat: "al-ast",
    locStart,
    locEnd
};
