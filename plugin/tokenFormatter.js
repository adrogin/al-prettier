import ALParser from '../parser/ALParser.js';

function addAfterFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_pageExtLayoutModKeyword) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function addBeforeFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_pageExtLayoutModKeyword) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function addFirstFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_pageExtLayoutModKeyword) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function addLastFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_pageExtLayoutModKeyword) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function actionFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_actionDefinition) {
        return token.symbol.text.toLowerCase();
    }
    if (token.parentCtx.ruleIndex === ALParser.RULE_simpleDataType) {
        return "Action";
    }

    return token.symbol.text;
}

function actionRefFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_actionRef) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function andFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_logicalAndExpression) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function arrayFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_arrayDataType) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function assertErrorFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_statement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function beginFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_procedureDefinition ||
        token.parentCtx.ruleIndex === ALParser.RULE_triggerDefinition ||
        token.parentCtx.ruleIndex === ALParser.RULE_compoundBlock
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function breakFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_breakStatement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function caseFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_caseStatement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function codeunitFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_codeunitObject) {
        return token.symbol.text.toLowerCase();
    }
    if (token.parentCtx.ruleIndex === ALParser.RULE_codeunitDataType) {
        return "Codeunit";
    }

    return token.symbol.text;
}

function tableFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_tableObject) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function recordFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_recordDataType) {
        return "Record";
    }

    return token.symbol.text;
}

function pageFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_pageObject) {
        return token.symbol.text.toLowerCase();
    }
    if (token.parentCtx.ruleIndex === ALParser.RULE_pageDataType) {
        return "Page";
    }

    return token.symbol.text;
}

function interfaceFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_interfaceObject) {
        return token.symbol.text.toLowerCase();
    }
    if (token.parentCtx.ruleIndex === ALParser.RULE_interfaceDataType) {
        return "Interface";
    }

    return token.symbol.text;
}

function enumFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_enumObject) {
        return token.symbol.text.toLowerCase();
    }
    if (token.parentCtx.ruleIndex === ALParser.RULE_enumDataType) {
        return "Enum";
    }

    return token.symbol.text;
}

function constFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_tableRelationConstReference ||
        token.parentCtx.ruleIndex === ALParser.RULE_subpageLinkConstExpression
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function continueFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_continueStatement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function divFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_multiplicativeExpression) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function doFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_whileStatement ||
        token.parentCtx.ruleIndex === ALParser.RULE_forStatement ||
        token.parentCtx.ruleIndex === ALParser.RULE_forEachStatement ||
        token.parentCtx.ruleIndex === ALParser.RULE_withStatement
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;

}

function downtoFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_forStatement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function elseFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_ifElseStatement ||
        token.parentCtx.ruleIndex === ALParser.RULE_caseElseStatement ||
        token.parentCtx.ruleIndex === ALParser.RULE_tableRelationElseExpression
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function endFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_procedureDefinition ||
        token.parentCtx.ruleIndex === ALParser.RULE_triggerDefinition ||
        token.parentCtx.ruleIndex === ALParser.RULE_compoundBlock
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function exitFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_exitStatement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function extendsFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_interfaceObject ||
        token.parentCtx.ruleIndex === ALParser.RULE_tableExtensionObject ||
        token.parentCtx.ruleIndex === ALParser.RULE_pageExtensionObject ||
        token.parentCtx.ruleIndex === ALParser.RULE_enumExtensionObject
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function fieldFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_tableFieldDefinition ||
        token.parentCtx.ruleIndex === ALParser.RULE_pageFieldItem ||
        token.parentCtx.ruleIndex === ALParser.RULE_tableRelationFieldReference ||
        token.parentCtx.ruleIndex === ALParser.RULE_subpageLinkFieldExpression
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function fieldsFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_tableFieldsList ||
        token.parentCtx.ruleIndex === ALParser.RULE_tableExtFieldsList
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function fieldGroupFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_fieldGroupItem) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function fieldGroupsFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_fieldGroupsList) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function filterFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_tableRelationFilter ||
        token.parentCtx.ruleIndex === ALParser.RULE_subpageLinkFilterExpression ||
        token.parentCtx.ruleIndex === ALParser.RULE_queryFilterDefinition
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function forFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_forStatement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function foreachFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_forEachStatement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function ifFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_ifStatement ||
        token.parentCtx.ruleIndex === ALParser.RULE_tableRelationIfExpression
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function inFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_forEachStatement ||
        token.parentCtx.ruleIndex === ALParser.RULE_logicalInExpression
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function layoutFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_layoutDefinition ||
        token.parentCtx.ruleIndex === ALParser.RULE_renderingLayout ||
        token.parentCtx.ruleIndex === ALParser.RULE_pageExtLayoutDefinition
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function modFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_multiplicativeExpression) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function moveAfterFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_pageExtElementRelocationKeyword) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function moveBeforeFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_pageExtElementRelocationKeyword) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function moveFirstFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_pageExtElementRelocationKeyword) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function moveLastFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_pageExtElementRelocationKeyword) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function namespaceFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_namespaceDeclaration) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function notFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_unaryNotExpression) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function ofFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_arrayDataType ||
        token.parentCtx.ruleIndex === ALParser.RULE_dictionaryDataType||
        token.parentCtx.ruleIndex === ALParser.RULE_listDataType ||
        token.parentCtx.ruleIndex === ALParser.RULE_caseStatement
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function orFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_logicalOrExpression) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function procedureFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_procedureDeclaration ||
        token.parentCtx.ruleIndex === ALParser.RULE_procedureDefinition
    ) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function repeatFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_repeatStatement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function sortingFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_sourceTableSortingExpr) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function thenFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_ifStatement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function thisFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_primaryExpression) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function toFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_forStatement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function triggerFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_triggerDefinition) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function untilFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_repeatStatement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function usingFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_usingReference) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function varFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_variablesList) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function whileFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_whileStatement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function withFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_withStatement) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

function xorFormatter(token) {
    if (token.parentCtx.ruleIndex === ALParser.RULE_logicalOrExpression) {
        return token.symbol.text.toLowerCase();
    }

    return token.symbol.text;
}

export class TokenFormatter {
    static #tokenFormatters = new Map([
        [ALParser.ADDAFTER, addAfterFormatter],
        [ALParser.ADDBEFORE, addBeforeFormatter],
        [ALParser.ADDFIRST, addFirstFormatter],
        [ALParser.ADDLAST, addLastFormatter],
        [ALParser.ACTION, actionFormatter],
        [ALParser.ACTIONREF, actionRefFormatter],
        [ALParser.AND, andFormatter],
        [ALParser.ARRAY, arrayFormatter],
        [ALParser.ASSERTERROR, assertErrorFormatter],
        [ALParser.BEGIN, beginFormatter],
        [ALParser.BREAK, breakFormatter],
        [ALParser.CASE, caseFormatter],
        [ALParser.CODEUNIT, codeunitFormatter],
        [ALParser.CONST, constFormatter],
        [ALParser.CONTINUE, continueFormatter],
        [ALParser.DIV, divFormatter],
        [ALParser.DO, doFormatter],
        [ALParser.DOWNTO, downtoFormatter],
        [ALParser.ELSE, elseFormatter],
        [ALParser.END, endFormatter],
        [ALParser.ENUM, enumFormatter],
        [ALParser.EXIT, exitFormatter],
        [ALParser.EXTENDS, extendsFormatter],
        [ALParser.FIELD, fieldFormatter],
        [ALParser.FIELDGROUP, fieldGroupFormatter],
        [ALParser.FIELDGROUPS, fieldGroupsFormatter],
        [ALParser.FIELDS, fieldsFormatter],
        [ALParser.FILTER, filterFormatter],
        [ALParser.FOR, forFormatter],
        [ALParser.FOREACH, foreachFormatter],
        [ALParser.IF, ifFormatter],
        [ALParser.IN, inFormatter],
        [ALParser.INTERFACE, interfaceFormatter],
        [ALParser.LAYOUT, layoutFormatter],
        [ALParser.MOD, modFormatter],
        [ALParser.MOVEAFTER, moveAfterFormatter],
        [ALParser.MOVEBEFORE, moveBeforeFormatter],
        [ALParser.MOVEFIRST, moveFirstFormatter],
        [ALParser.MOVELAST, moveLastFormatter],
        [ALParser.NAMESPACE, namespaceFormatter],
        [ALParser.NOT, notFormatter],
        [ALParser.OF, ofFormatter],
        [ALParser.OR, orFormatter],
        [ALParser.PAGE, pageFormatter],
        [ALParser.PROCEDURE, procedureFormatter],
        [ALParser.RECORD, recordFormatter],
        [ALParser.REPEAT, repeatFormatter],
        [ALParser.SORTING, sortingFormatter],
        [ALParser.TABLE, tableFormatter],
        [ALParser.THEN, thenFormatter],
        [ALParser.THIS, thisFormatter],
        [ALParser.TO, toFormatter],
        [ALParser.TRIGGER, triggerFormatter],
        [ALParser.UNTIL, untilFormatter],
        [ALParser.USING, usingFormatter],
        [ALParser.VAR, varFormatter],
        [ALParser.WHILE, whileFormatter],
        [ALParser.WITH, withFormatter],
        [ALParser.XOR, xorFormatter],
    ]);

    static format(token) {
        if (typeof(this.#tokenFormatters.get(token.symbol.type)) !== "function" ||
            !token?.symbol?.type ||
            !token.parentCtx
        ) {
            return token.symbol.text;
        }

        return this.#tokenFormatters.get(token.symbol.type)(token);
    }
}
