import ALParser from '../../algrammar/JS/ALParser.js';

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
        case ALParser.RULE_ifStatement:
        case ALParser.RULE_repeatStatement:
        case ALParser.RULE_forStatement:
        case ALParser.RULE_forEachStatement:
        case ALParser.RULE_whileStatement:
            return true;

        default:
            return false;
    }
}

export function isSingleCompundStatement(node) {
    if (node.ruleIndex === ALParser.RULE_compoundBlock)
        return true;

    if (!node.children || node.children.length === 0)
        return false;

    if (node.ruleIndex === ALParser.RULE_statementList && node.children.length > 1) {
        return false;
    }

    return isSingleCompundStatement(node.children[0]);
}
