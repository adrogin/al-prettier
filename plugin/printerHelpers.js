import ALParser from '../parser/ALParser.js';

export function isParagraphStatement(node) {
    if (!node || !node.ruleIndex) {
        return false;
    }

    switch (node.ruleIndex) {
        case ALParser.RULE_statementWithSeparator:
        case ALParser.RULE_statement: {
            if (!node.children || !node.children.length || node.children.length === 0) {
                return false;
            }

            return isParagraphStatement(node.children[0]);
        }
        case ALParser.RULE_caseStatement:
            return true;

        default:
            return false;
    }
}

export function isCompoundStatement(node) {
    if (node.ruleIndex === ALParser.RULE_compoundBlock) {
        return true;
    }

    if (!node.children || node.children.length === 0) {
        return false;
    }

    if (node.ruleIndex === ALParser.RULE_statementList && node.children.length > 1) {
        return false;
    }

    return isCompoundStatement(node.children[0]);
}

export function shouldAddBlankLineAfter(node) {
    if (node.ruleIndex === ALParser.RULE_compoundBlock) {
        return true;
    }

    if (!node.children || node.children.length === 0) {
        return false;
    }

    if (node.children.length === 1) {
        return shouldAddBlankLineAfter(node.children[0]);
    }

    if (node.ruleIndex === ALParser.RULE_statementWithSeparator) {
        return shouldAddBlankLineAfter(node.children[0]);
    }

    if (
        ![ALParser.RULE_forStatement,
        ALParser.RULE_forEachStatement,
        ALParser.RULE_whileStatement,
        ALParser.RULE_ifStatement,
        ALParser.RULE_ifElseStatement].includes(
            node.ruleIndex)) {
        return false;
    }

    return shouldAddBlankLineAfter(node.children[node.children.length - 1]);
}

export function isIfStatementContext(node) {
    if (node.ruleIndex === ALParser.RULE_ifStatement) {
        return true;
    }
    else if (node.parentCtx === undefined || node.parentCtx === null) {
        return false;
    }
    else {
        return isIfStatementContext(node.parentCtx);
    }
}
