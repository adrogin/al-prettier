import { describe, it } from 'mocha';
import { expect } from 'chai';
import ALParser from '../parser/ALParser.js';
import { TokenFormatter } from '../plugin/tokenFormatter.js';

function createMockToken(text, type, ruleIndex) {
    return {
        symbol: {
            text: text,
            type: type
        },
        parentCtx: {
            ruleIndex: ruleIndex
        }
    };
}

describe('TokenFormatter', () => {
    describe('addAfterFormatter', () => {
        it('should lowercase token when in pageExtLayoutModKeyword context', () => {
            const token = createMockToken('ADDAFTER', ALParser.ADDAFTER, ALParser.RULE_pageExtLayoutModKeyword);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('addafter');
        });

        it('should return original text when not in pageExtLayoutModKeyword context', () => {
            const token = createMockToken('ADDAFTER', ALParser.ADDAFTER, ALParser.RULE_procedureDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('ADDAFTER');
        });
    });

    describe('addBeforeFormatter', () => {
        it('should lowercase token when in pageExtLayoutModKeyword context', () => {
            const token = createMockToken('ADDBEFORE', ALParser.ADDBEFORE, ALParser.RULE_pageExtLayoutModKeyword);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('addbefore');
        });

        it('should return original text when not in pageExtLayoutModKeyword context', () => {
            const token = createMockToken('ADDBEFORE', ALParser.ADDBEFORE, ALParser.RULE_procedureDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('ADDBEFORE');
        });
    });

    describe('addFirstFormatter', () => {
        it('should lowercase token when in pageExtLayoutModKeyword context', () => {
            const token = createMockToken('ADDFIRST', ALParser.ADDFIRST, ALParser.RULE_pageExtLayoutModKeyword);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('addfirst');
        });

        it('should return original text when not in pageExtLayoutModKeyword context', () => {
            const token = createMockToken('ADDFIRST', ALParser.ADDFIRST, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('ADDFIRST');
        });
    });

    describe('addLastFormatter', () => {
        it('should lowercase token when in pageExtLayoutModKeyword context', () => {
            const token = createMockToken('ADDLAST', ALParser.ADDLAST, ALParser.RULE_pageExtLayoutModKeyword);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('addlast');
        });

        it('should return original text when not in pageExtLayoutModKeyword context', () => {
            const token = createMockToken('ADDLAST', ALParser.ADDLAST, ALParser.RULE_procedureDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('ADDLAST');
        });
    });

    describe('actionFormatter', () => {
        it('should lowercase token when in actionDefinition context', () => {
            const token = createMockToken('ACTION', ALParser.ACTION, ALParser.RULE_actionDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('action');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('ACTION', ALParser.ACTION, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('ACTION');
        });
    });

    describe('actionRefFormatter', () => {
        it('should lowercase token when in actionRef context', () => {
            const token = createMockToken('ACTIONREF', ALParser.ACTIONREF, ALParser.RULE_actionRef);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('actionref');
        });

        it('should return original text when not in actionRef context', () => {
            const token = createMockToken('ACTIONREF', ALParser.ACTIONREF, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('ACTIONREF');
        });
    });

    describe('andFormatter', () => {
        it('should lowercase token when in logicalAndExpression context', () => {
            const token = createMockToken('AND', ALParser.AND, ALParser.RULE_logicalAndExpression);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('and');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('AND', ALParser.AND, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('AND');
        });
    });

    describe('arrayFormatter', () => {
        it('should lowercase token when in arrayDataType context', () => {
            const token = createMockToken('ARRAY', ALParser.ARRAY, ALParser.RULE_arrayDataType);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('array');
        });

        it('should return original text when not in arrayDataType context', () => {
            const token = createMockToken('ARRAY', ALParser.ARRAY, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('ARRAY');
        });
    });

    describe('assertErrorFormatter', () => {
        it('should lowercase token when in statement context', () => {
            const token = createMockToken('ASSERTERROR', ALParser.ASSERTERROR, ALParser.RULE_statement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('asserterror');
        });

        it('should return original text when not in statement context', () => {
            const token = createMockToken('ASSERTERROR', ALParser.ASSERTERROR, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('ASSERTERROR');
        });
    });

    describe('beginFormatter', () => {
        it('should lowercase token when in compoundBlock context', () => {
            const token = createMockToken('BEGIN', ALParser.BEGIN, ALParser.RULE_compoundBlock);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('begin');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('BEGIN', ALParser.BEGIN, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('BEGIN');
        });
    });

    describe('breakFormatter', () => {
        it('should lowercase token when in breakStatement context', () => {
            const token = createMockToken('BREAK', ALParser.BREAK, ALParser.RULE_breakStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('break');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('BREAK', ALParser.BREAK, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('BREAK');
        });
    });

    describe('caseFormatter', () => {
        it('should lowercase token when in caseStatement context', () => {
            const token = createMockToken('CASE', ALParser.CASE, ALParser.RULE_caseStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('case');
        });

        it('should return original text when not in caseStatement context', () => {
            const token = createMockToken('CASE', ALParser.CASE, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('CASE');
        });
    });

    describe('codeunitFormatter', () => {
        it('should lowercase token when in codeunitObject context', () => {
            const token = createMockToken('CODEUNIT', ALParser.CODEUNIT, ALParser.RULE_codeunitObject);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('codeunit');
        });

        it('should return original text when not in codeunitObject context', () => {
            const token = createMockToken('CODEUNIT', ALParser.CODEUNIT, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('CODEUNIT');
        });
    });

    describe('constFormatter', () => {
        it('should lowercase token when in tableRelationConstReference context', () => {
            const token = createMockToken('CONST', ALParser.CONST, ALParser.RULE_tableRelationConstReference);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('const');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('CONST', ALParser.CONST, ALParser.RULE_procedureDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('CONST');
        });
    });

    describe('continueFormatter', () => {
        it('should lowercase token when in continueStatement context', () => {
            const token = createMockToken('CONTINUE', ALParser.CONTINUE, ALParser.RULE_continueStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('continue');
        });

        it('should return original text when not in continueStatement context', () => {
            const token = createMockToken('CONTINUE', ALParser.CONTINUE, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('CONTINUE');
        });
    });

    describe('divFormatter', () => {
        it('should lowercase token when in multiplicativeExpression context', () => {
            const token = createMockToken('DIV', ALParser.DIV, ALParser.RULE_multiplicativeExpression);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('div');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('DIV', ALParser.DIV, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('DIV');
        });
    });

    describe('doFormatter', () => {
        it('should lowercase token when in whileStatement context', () => {
            const token = createMockToken('DO', ALParser.DO, ALParser.RULE_whileStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('do');
        });

        it('should return original text when not in statement context', () => {
            const token = createMockToken('DO', ALParser.DO, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('DO');
        });
    });

    describe('downtoFormatter', () => {
        it('should lowercase token when in forStatement context', () => {
            const token = createMockToken('DOWNTO', ALParser.DOWNTO, ALParser.RULE_forStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('downto');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('DOWNTO', ALParser.DOWNTO, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('DOWNTO');
        });
    });

    describe('elseFormatter', () => {
        it('should lowercase token when in ifElseStatement context', () => {
            const token = createMockToken('ELSE', ALParser.ELSE, ALParser.RULE_ifElseStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('else');
        });

        it('should lowercase token when in caseElseStatement context', () => {
            const token = createMockToken('ELSE', ALParser.ELSE, ALParser.RULE_caseElseStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('else');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('ELSE', ALParser.ELSE, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('ELSE');
        });
    });

    describe('endFormatter', () => {
        it('should lowercase token when in procedureDefinition context', () => {
            const token = createMockToken('END', ALParser.END, ALParser.RULE_procedureDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('end');
        });

        it('should lowercase token when in compoundBlock context', () => {
            const token = createMockToken('END', ALParser.END, ALParser.RULE_compoundBlock);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('end');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('END', ALParser.END, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('END');
        });
    });

    describe('enumFormatter', () => {
        it('should lowercase token when in enumObject context', () => {
            const token = createMockToken('ENUM', ALParser.ENUM, ALParser.RULE_enumObject);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('enum');
        });

        it('should return original text when not in enumObject context', () => {
            const token = createMockToken('ENUM', ALParser.ENUM, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('ENUM');
        });
    });

    describe('exitFormatter', () => {
        it('should lowercase token when in exitStatement context', () => {
            const token = createMockToken('EXIT', ALParser.EXIT, ALParser.RULE_exitStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('exit');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('EXIT', ALParser.EXIT, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('EXIT');
        });
    });

    describe('extendsFormatter', () => {
        it('should lowercase token when in interfaceObject context', () => {
            const token = createMockToken('EXTENDS', ALParser.EXTENDS, ALParser.RULE_interfaceObject);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('extends');
        });

        it('should lowercase token when in tableExtensionObject context', () => {
            const token = createMockToken('EXTENDS', ALParser.EXTENDS, ALParser.RULE_tableExtensionObject);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('extends');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('EXTENDS', ALParser.EXTENDS, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('EXTENDS');
        });
    });

    describe('fieldFormatter', () => {
        it('should lowercase token when in tableFieldDefinition context', () => {
            const token = createMockToken('FIELD', ALParser.FIELD, ALParser.RULE_tableFieldDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('field');
        });

        it('should lowercase token when in pageFieldItem context', () => {
            const token = createMockToken('FIELD', ALParser.FIELD, ALParser.RULE_pageFieldItem);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('field');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('FIELD', ALParser.FIELD, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('FIELD');
        });
    });

    describe('fieldGroupFormatter', () => {
        it('should lowercase token when in fieldGroupItem context', () => {
            const token = createMockToken('FIELDGROUP', ALParser.FIELDGROUP, ALParser.RULE_fieldGroupItem);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('fieldgroup');
        });

        it('should return original text when not in fieldGroupItem context', () => {
            const token = createMockToken('FIELDGROUP', ALParser.FIELDGROUP, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('FIELDGROUP');
        });
    });

    describe('fieldGroupsFormatter', () => {
        it('should lowercase token when in fieldGroupsList context', () => {
            const token = createMockToken('FIELDGROUPS', ALParser.FIELDGROUPS, ALParser.RULE_fieldGroupsList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('fieldgroups');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('FIELDGROUPS', ALParser.FIELDGROUPS, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('FIELDGROUPS');
        });
    });

    describe('filterFormatter', () => {
        it('should lowercase token when in tableRelationFilter context', () => {
            const token = createMockToken('FILTER', ALParser.FILTER, ALParser.RULE_tableRelationFilter);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('filter');
        });

        it('should lowercase token when in queryFilterDefinition context', () => {
            const token = createMockToken('FILTER', ALParser.FILTER, ALParser.RULE_queryFilterDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('filter');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('FILTER', ALParser.FILTER, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('FILTER');
        });
    });

    describe('forFormatter', () => {
        it('should lowercase token when in forStatement context', () => {
            const token = createMockToken('FOR', ALParser.FOR, ALParser.RULE_forStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('for');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('FOR', ALParser.FOR, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('FOR');
        });
    });

    describe('foreachFormatter', () => {
        it('should lowercase token when in forEachStatement context', () => {
            const token = createMockToken('FOREACH', ALParser.FOREACH, ALParser.RULE_forEachStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('foreach');
        });

        it('should return original text when not in forEachStatement context', () => {
            const token = createMockToken('FOREACH', ALParser.FOREACH, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('FOREACH');
        });
    });

    describe('ifFormatter', () => {
        it('should lowercase token when in ifStatement context', () => {
            const token = createMockToken('IF', ALParser.IF, ALParser.RULE_ifStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('if');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('IF', ALParser.IF, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('IF');
        });
    });

    describe('inFormatter', () => {
        it('should lowercase token when in logicalInExpression context', () => {
            const token = createMockToken('IN', ALParser.IN, ALParser.RULE_logicalInExpression);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('in');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('IN', ALParser.IN, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('IN');
        });
    });

    describe('interfaceFormatter', () => {
        it('should lowercase token when in interfaceObject context', () => {
            const token = createMockToken('INTERFACE', ALParser.INTERFACE, ALParser.RULE_interfaceObject);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('interface');
        });

        it('should return original text when not in interfaceObject context', () => {
            const token = createMockToken('INTERFACE', ALParser.INTERFACE, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('INTERFACE');
        });
    });

    describe('layoutFormatter', () => {
        it('should lowercase token when in layoutDefinition context', () => {
            const token = createMockToken('LAYOUT', ALParser.LAYOUT, ALParser.RULE_layoutDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('layout');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('LAYOUT', ALParser.LAYOUT, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('LAYOUT');
        });
    });

    describe('modFormatter', () => {
        it('should lowercase token when in multiplicativeExpression context', () => {
            const token = createMockToken('MOD', ALParser.MOD, ALParser.RULE_multiplicativeExpression);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('mod');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('MOD', ALParser.MOD, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('MOD');
        });
    });

    describe('moveAfterFormatter', () => {
        it('should lowercase token when in pageExtElementRelocationKeyword context', () => {
            const token = createMockToken('MOVEAFTER', ALParser.MOVEAFTER, ALParser.RULE_pageExtElementRelocationKeyword);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('moveafter');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('MOVEAFTER', ALParser.MOVEAFTER, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('MOVEAFTER');
        });
    });

    describe('moveBeforeFormatter', () => {
        it('should lowercase token when in pageExtElementRelocationKeyword context', () => {
            const token = createMockToken('MOVEBEFORE', ALParser.MOVEBEFORE, ALParser.RULE_pageExtElementRelocationKeyword);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('movebefore');
        });

        it('should return original text when not in pageExtElementRelocationKeyword context', () => {
            const token = createMockToken('MOVEBEFORE', ALParser.MOVEBEFORE, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('MOVEBEFORE');
        });
    });

    describe('moveFirstFormatter', () => {
        it('should lowercase token when in pageExtElementRelocationKeyword context', () => {
            const token = createMockToken('MOVEFIRST', ALParser.MOVEFIRST, ALParser.RULE_pageExtElementRelocationKeyword);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('movefirst');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('MOVEFIRST', ALParser.MOVEFIRST, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('MOVEFIRST');
        });
    });

    describe('moveLastFormatter', () => {
        it('should lowercase token when in pageExtElementRelocationKeyword context', () => {
            const token = createMockToken('MOVELAST', ALParser.MOVELAST, ALParser.RULE_pageExtElementRelocationKeyword);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('movelast');
        });

        it('should return original text when not in pageExtElementRelocationKeyword context', () => {
            const token = createMockToken('MOVELAST', ALParser.MOVELAST, ALParser.RULE_procedureDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('MOVELAST');
        });
    });

    describe('namespaceFormatter', () => {
        it('should lowercase token when in namespaceDeclaration context', () => {
            const token = createMockToken('NAMESPACE', ALParser.NAMESPACE, ALParser.RULE_namespaceDeclaration);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('namespace');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('NAMESPACE', ALParser.NAMESPACE, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('NAMESPACE');
        });
    });

    describe('notFormatter', () => {
        it('should lowercase token when in unaryNotExpression context', () => {
            const token = createMockToken('NOT', ALParser.NOT, ALParser.RULE_unaryNotExpression);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('not');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('NOT', ALParser.NOT, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('NOT');
        });
    });

    describe('ofFormatter', () => {
        it('should lowercase token when in arrayDataType context', () => {
            const token = createMockToken('OF', ALParser.OF, ALParser.RULE_arrayDataType);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('of');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('OF', ALParser.OF, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('OF');
        });
    });

    describe('orFormatter', () => {
        it('should lowercase token when in logicalOrExpression context', () => {
            const token = createMockToken('OR', ALParser.OR, ALParser.RULE_logicalOrExpression);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('or');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('OR', ALParser.OR, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('OR');
        });
    });

    describe('pageFormatter', () => {
        it('should lowercase token when in pageObject context', () => {
            const token = createMockToken('PAGE', ALParser.PAGE, ALParser.RULE_pageObject);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('page');
        });

        it('should uppercase the first "P" and lowercase the rest when in variable declaration context', () => {
            const token = createMockToken('PAGE', ALParser.PAGE, ALParser.RULE_pageDataType);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('Page');
        });

        it('should return original text when not in pageObject context', () => {
            const token = createMockToken('PAGE', ALParser.PAGE, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('PAGE');
        });
    });

    describe('procedureFormatter', () => {
        it('should lowercase token when in procedureDefinition context', () => {
            const token = createMockToken('PROCEDURE', ALParser.PROCEDURE, ALParser.RULE_procedureDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('procedure');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('PROCEDURE', ALParser.PROCEDURE, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('PROCEDURE');
        });
    });

    describe('recordFormatter', () => {
        it('should return "Record" when in recordDataType context', () => {
            const token = createMockToken('RECORD', ALParser.RECORD, ALParser.RULE_recordDataType);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('Record');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('RECORD', ALParser.RECORD, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('RECORD');
        });
    });

    describe('repeatFormatter', () => {
        it('should lowercase token when in repeatStatement context', () => {
            const token = createMockToken('REPEAT', ALParser.REPEAT, ALParser.RULE_repeatStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('repeat');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('REPEAT', ALParser.REPEAT, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('REPEAT');
        });
    });

    describe('sortingFormatter', () => {
        it('should lowercase token when in sourceTableSortingExpr context', () => {
            const token = createMockToken('SORTING', ALParser.SORTING, ALParser.RULE_sourceTableSortingExpr);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('sorting');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('SORTING', ALParser.SORTING, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('SORTING');
        });
    });

    describe('tableFormatter', () => {
        it('should lowercase token when in tableObject context', () => {
            const token = createMockToken('TABLE', ALParser.TABLE, ALParser.RULE_tableObject);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('table');
        });

        it('should return original text when not in tableObject context', () => {
            const token = createMockToken('TABLE', ALParser.TABLE, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('TABLE');
        });
    });

    describe('thenFormatter', () => {
        it('should lowercase token when in ifStatement context', () => {
            const token = createMockToken('THEN', ALParser.THEN, ALParser.RULE_ifStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('then');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('THEN', ALParser.THEN, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('THEN');
        });
    });

    describe('thisFormatter', () => {
        it('should lowercase token when in primaryExpression context', () => {
            const token = createMockToken('THIS', ALParser.THIS, ALParser.RULE_primaryExpression);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('this');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('THIS', ALParser.THIS, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('THIS');
        });
    });

    describe('toFormatter', () => {
        it('should lowercase token when in forStatement context', () => {
            const token = createMockToken('TO', ALParser.TO, ALParser.RULE_forStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('to');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('TO', ALParser.TO, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('TO');
        });
    });

    describe('triggerFormatter', () => {
        it('should lowercase token when in triggerDefinition context', () => {
            const token = createMockToken('TRIGGER', ALParser.TRIGGER, ALParser.RULE_triggerDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('trigger');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('TRIGGER', ALParser.TRIGGER, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('TRIGGER');
        });
    });

    describe('untilFormatter', () => {
        it('should lowercase token when in repeatStatement context', () => {
            const token = createMockToken('UNTIL', ALParser.UNTIL, ALParser.RULE_repeatStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('until');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('UNTIL', ALParser.UNTIL, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('UNTIL');
        });
    });

    describe('upperlimitFormatter', () => {
        it('should lowercase token when in filterFieldReference context', () => {
            const token = createMockToken('UPPERLIMIT', ALParser.UPPERLIMIT, ALParser.RULE_filterFieldReference);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('upperlimit');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('UpperLimit', ALParser.UPPERLIMIT, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('UpperLimit');
        });
    });

    describe('usingFormatter', () => {
        it('should lowercase token when in usingReference context', () => {
            const token = createMockToken('USING', ALParser.USING, ALParser.RULE_usingReference);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('using');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('USING', ALParser.USING, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('USING');
        });
    });

    describe('varFormatter', () => {
        it('should lowercase token when in variablesList context', () => {
            const token = createMockToken('VAR', ALParser.VAR, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('var');
        });

        it('should return original text when used as procedure name', () => {
            const token = createMockToken('VAR', ALParser.VAR, ALParser.RULE_procedureDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('VAR');
        });
    });

    describe('whileFormatter', () => {
        it('should lowercase token when in whileStatement context', () => {
            const token = createMockToken('WHILE', ALParser.WHILE, ALParser.RULE_whileStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('while');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('WHILE', ALParser.WHILE, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('WHILE');
        });
    });

    describe('withFormatter', () => {
        it('should lowercase token when in withStatement context', () => {
            const token = createMockToken('WITH', ALParser.WITH, ALParser.RULE_withStatement);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('with');
        });

        it('should return original text when used as identifier', () => {
            const token = createMockToken('WITH', ALParser.WITH, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('WITH');
        });
    });

    describe('xorFormatter', () => {
        it('should lowercase token when in logicalOrExpression context', () => {
            const token = createMockToken('XOR', ALParser.XOR, ALParser.RULE_logicalOrExpression);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('xor');
        });

        it('should return original text when used as variable name', () => {
            const token = createMockToken('XOR', ALParser.XOR, ALParser.RULE_variablesList);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('XOR');
        });
    });

    describe('TokenFormatter.format edge cases', () => {
        it('should return token text when formatter function does not exist', () => {
            const token = createMockToken('UNKNOWN', 99999, ALParser.RULE_procedureDefinition);
            const result = TokenFormatter.format(token);
            expect(result).to.equal('UNKNOWN');
        });

        it('should return token text when parentCtx is null', () => {
            const token = createMockToken('VAR', ALParser.VAR, null);
            token.parentCtx = null;
            const result = TokenFormatter.format(token);
            expect(result).to.equal('VAR');
        });

        it('should return token text when symbol.type is null', () => {
            const token = createMockToken('VAR', null, ALParser.RULE_variablesList);
            token.symbol.type = null;
            const result = TokenFormatter.format(token);
            expect(result).to.equal('VAR');
        });
    });
});
