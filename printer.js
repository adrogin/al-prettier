import * as prettier from 'prettier';
import ALParser from '../algrammar/JS/ALParser.js';

const { hardline, join, indent, group, line, softline } = prettier.doc.builders;

function getVisitorKeys(node) {
    if (node && Array.isArray(node.children)) {
        return ['children'];
    }

    return [];
}

function print(path, options, print) {
    const node = path.node;

    if (!node) return "";

    // Terminal node (ANTLR token)
    if (node.symbol) {
        const text = node.symbol.text;
        if (text === "<EOF>") return "";
        return text;
    }

    // Non-terminal rule context
    switch (node.ruleIndex) {
        case ALParser.RULE_compilationUnit:
            return printCompilationUnit(path, options, print);

        case ALParser.RULE_objectDefinition:
            return printObjectDefinition(path, options, print);

        case ALParser.RULE_genericObjectProperty:
            return printGenericObjectProperty(path, options, print);

        //#region Table object
        case ALParser.RULE_tableObject:
            return printTableObject(path, options, print);

        case ALParser.RULE_tablePropertiesList:
            return printTablePropertiesList(path, options, print);

        case ALParser.RULE_tablePropertyItem:
            return printTablePropertyItem(path, options, print);

        case ALParser.RULE_tableProperty:
            return printTableProperty(path, options, print);

        case ALParser.RULE_tableFieldsList:
            return printTableFieldsList(path, options, print);

        case ALParser.RULE_tableFieldDefinition:
            return printTableFieldDefinition(path, options, print);

        case ALParser.RULE_tableFieldPropertiesList:
            return printTableFieldPropertiesList(path, options, print);

        case ALParser.RULE_tableFieldPropertyItem:
            return printTableFieldPropertyItem(path, options, print);

        case ALParser.RULE_tableFieldProperty:
            return printTableFieldProperty(path, options, print);

        case ALParser.RULE_tableRelationExpression:
            return printTableRelationExpression(path, options, print);

        case ALParser.RULE_tableRelationRelatedTableExpr:
            return printRelatedTableExpression(path, options, print);

        case ALParser.RULE_tableRelationWhereExpression:
            return printTableRelationWhereExpression(path, options, print);

        case ALParser.RULE_tableRelationFieldReference:
            return printTableRelationFieldReference(path, options, print);

        case ALParser.RULE_tableRelationFilter:
            return printTableRelationFilter(path, options, print);

        case ALParser.RULE_calcFormulaExpression:
            return printCalcFormulaExpression(path, options, print);

        case ALParser.RULE_tableKeysSection:
            return printTableKeysSection(path, options, print);

        case ALParser.RULE_keyList:
            return printKeyList(path, options, print);

        case ALParser.RULE_keyItem:
            return printKeyItem(path, options, print);

        case ALParser.RULE_keyPropertiesList:
            return printKeyPropertiesList(path, options, print);

        case ALParser.RULE_keyPropertyItem:
            return printKeyPropertyItem(path, options, print);

        case ALParser.RULE_fieldGroupsList:
            return printFieldGroupsList(path, options, print);

        case ALParser.RULE_fieldGroupItem:
            return printFieldGroupItem(path, options, print);

        case ALParser.RULE_fieldGroupDefinition:
            return printFieldGroupDefinition(path, options, print);

        case ALParser.RULE_fieldGroupFieldsList:
            return printFieldGroupFieldsList(path, options, print);

        //#endregion Table object

        //#region Table extension object

        case ALParser.RULE_tableExtensionObject:
            return printTableExtObject(path, options, print);

        //#endregion Table extension object

        //#region Page object

        case ALParser.RULE_pageObject:
            return printPageObject(path, options, print);

        case ALParser.RULE_pagePropertyList:
            return printPagePropertyList(path, options, print);

        case ALParser.RULE_pagePropertyItem:
            return printPagePropertyItem(path, options, print);

        case ALParser.RULE_pageProperty:
            return printPageProperty(path, options, print);

        case ALParser.RULE_layoutDefinition:
            return printLayoutDefinition(path, options, print);

        case ALParser.RULE_layoutElements:
            return printLayoutElements(path, options, print);

        case ALParser.RULE_areaDefinition:
            return printAreaDefinition(path, options, print);

        case ALParser.RULE_areaElements:
            return printAreaElements(path, options, print);

        case ALParser.RULE_groupDefinition:
            return printGroupDefinition(path, options, print);

        case ALParser.RULE_groupElements:
            return printGroupElements(path, options, print);

        case ALParser.RULE_groupProperty:
            return printGroupProperty(path, options, print);

        case ALParser.RULE_groupPropertyItem:
            return printGroupPropertyItem(path, options, print);

        case ALParser.RULE_partDefinition:
            return printPartDefinition(path, options, print);

        case ALParser.RULE_partPropertiesList:
            return printPartPropertiesList(path, options, print);

        case ALParser.RULE_partPropertyItem:
            return printPartPropertyItem(path, options, print);

        case ALParser.RULE_partProperty:
        case ALParser.RULE_subpageLinkProperty:
        case ALParser.RULE_subpageLinkExpression:
            return printPartProperty(path, options, print);

        case ALParser.RULE_repeaterDefinition:
            return printRepeaterDefinition(path, options, print);

        case ALParser.RULE_repeaterElements:
            return printRepeaterElements(path, options, print);

        case ALParser.RULE_pageFieldItem:
            return printPageFieldItem(path, options, print);

        case ALParser.RULE_pageFieldPropertiesList:
            return printPageFieldPropertiesList(path, options, print);

        case ALParser.RULE_pageFieldPropertyItem:
            return printPageFieldPropertyItem(path, options, print);

        case ALParser.RULE_pageFieldProperty:
            return printPageFieldProperty(path, options, print);

        case ALParser.RULE_actionsDefinition:
            return printActionsDefinition(path, options, print);

        case ALParser.RULE_actionElements:
            return printActionElements(path, options, print);

        case ALParser.RULE_actionDefinition:
            return printActionDefinition(path, options, print);

        case ALParser.RULE_actionPropertiesList:
            return printActionPropertiesList(path, options, print);

        case ALParser.RULE_actionPropertyItem:
            return printActionPropertyItem(path, options, print);

        case ALParser.RULE_actionProperty:
            return printActionProperty(path, options, print);

        case ALParser.RULE_actionAreaDefinition:
            return printActionAreaDefinition(path, options, print);

        case ALParser.RULE_actionAreaElements:
            return printActionAreaElements(path, options, print);

        case ALParser.RULE_actionGroupDefinition:
            return printActionGroupDefinition(path, options, print);

        //#endregion Page object

        //#region Codeunit object

        case ALParser.RULE_codeunitObject:
            return printCodeunitObject(path, options, print);

        //#endregion Codeunit object

        //#region Interface object

        case ALParser.RULE_interfaceObject:
            return printInterfaceObject(path, options, print);

        case ALParser.RULE_interfacePropertiesList:
            return printInterfacePropertiesList(path, options, print);

        case ALParser.RULE_procedureDeclaration:
            return printProcedureDeclaration(path, options, print);

        case ALParser.RULE_interfacePropertyItem:
            return printInterfacePropertyItem(path, options, print);

        case ALParser.RULE_interfaceProperty:
            return printInterfaceProperty(path, options, print);

        //#endregion Interface object

        //#region Code statements

        case ALParser.RULE_namespaceDeclaration:
            return printNamespaceDeclaration(path, options, print);

        case ALParser.RULE_usingRefList:
            return printUsingRefList(path, options, print);

        case ALParser.RULE_usingReference:
            return printUsingReference(path, options, print);

        case ALParser.RULE_variableDeclaration:
            return printVariableDeclaration(path, options, print);

        case ALParser.RULE_variablesList:
            return printVariablesList(path, options, print);

        case ALParser.RULE_triggersList:
            return printTriggersList(path, options, print);

        case ALParser.RULE_triggerDefinition:
            return printTriggerDefinition(path, options, print);

        case ALParser.RULE_proceduresList:
            return printProceduresList(path, options, print);

        case ALParser.RULE_procedureDefinition:
            return printProcedureDefinition(path, options, print);

        case ALParser.RULE_procedureReturnType:
            return printProcReturnType(path, options, print);

        case ALParser.RULE_procedureAttributesList:
            return printProcedureAttributes(path, options, print);

        case ALParser.RULE_procedureAttribute:
            return printProcedureAttribute(path, options, print);

        case ALParser.RULE_parameterList:
            return printParameterList(path, options, print);

        case ALParser.RULE_parameter:
            return printParameter(path, options, print);

        case ALParser.RULE_statement:
            return printStatement(path, options, print);

        case ALParser.RULE_statementWithSeparator:
            return printStatementWithSeparator(path, options, print);

        case ALParser.RULE_statementList:
            return printStatementList(path, options, print);

        case ALParser.RULE_ifStatement:
            return printIfStatement(path, options, print);

        case ALParser.RULE_forStatement:
            return printForLoopStatement(path, options, print);

        case ALParser.RULE_whileStatement:
            return printWhileLoopStatement(path, options, print);

        case ALParser.RULE_repeatStatement:
            return printRepeatStatement(path, options, print);

        case ALParser.RULE_forEachStatement:
            return printForEachStatement(path, options, print);

        case ALParser.RULE_simpleDataType:
            path.call(print, 'children', 0);

        // Multi-part type definition concatenate without spaces (e.g. Text[100], Code[20])
        case ALParser.RULE_codeDataType:
        case ALParser.RULE_textDataType:
            return path.map(print, 'children');

        // Two-token types (e.g. Record Customer) — join with space
        case ALParser.RULE_codeunitDataType:
        case ALParser.RULE_enumDataType:
        case ALParser.RULE_pageDataType:
        case ALParser.RULE_recordDataType:
        case ALParser.RULE_reportDataType:
        case ALParser.RULE_testPageDataType:
            return join(" ", path.map(print, 'children'));

        // Other data types that require special formatting
        case ALParser.RULE_arrayDataType:
            return printArrayDataType(path, options, print);
        case ALParser.RULE_dictionaryDataType:
            return printDictionaryDataType(path, options, print);
        case ALParser.RULE_labelDataType:
            return printLabelDataType(path, options, print);
        case ALParser.RULE_listDataType:
            return printListDataType(path, options, print);
        case ALParser.RULE_optionDataType:
            return printOptionDataType(path, options, print);

        case ALParser.RULE_identifiersList:
            return printIdentifiersList(path, options, print);

        case ALParser.RULE_procedureCall:
            return printProcedureCall(path, options, print);

        case ALParser.RULE_argumentList:
            return printArgumentList(path, options, print);

        case ALParser.RULE_unaryExpression:
        case ALParser.RULE_unaryPlusExpression:
        case ALParser.RULE_unaryMinusExpression:
            return printUnaryExpression(path, options, print);

        case ALParser.RULE_unaryNotExpression:
            return printUnaryNotExpression(path, options, print);

        case ALParser.RULE_compoundBlock:
            return printCompoundBlock(path, options, print);

        case ALParser.RULE_caseStatement:
            return printCaseStatement(path, options, print);

        case ALParser.RULE_caseBranch:
            return printCaseBranch(path, options, print);

        case ALParser.RULE_assignmentStatement:
        case ALParser.RULE_logicalOrExpression:
        case ALParser.RULE_logicalAndExpression:
        case ALParser.RULE_equalityExpression:
        case ALParser.RULE_relationalExpression:
        case ALParser.RULE_additiveExpression:
        case ALParser.RULE_tableRelationEqualityExpression:
            return printBinaryExpression(path, options, print);

        //#endregion Code statements

        default:
            if (Array.isArray(node.children)) {
                return join("", path.map(print, 'children'));
            }
            return "";
    }
}

function printComment(path, options) {
    const comment = path.node;

    if (!comment?.symbol?.text) {
        return "";
    }

    const trimmed = comment.symbol.text.trim();

    // Line comment (// style)
    if (trimmed.startsWith("//")) {
        return trimmed;
    }

    // Block comment (/* */ style)
    if (trimmed.startsWith("/*")) {
        // For multi-line block comments, preserve the structure
        if (trimmed.includes("\n")) {
            // Return as-is, preserving multi-line block comment formatting
            return trimmed;
        }
        return trimmed;
    }

    return trimmed;
}

function canAttachComment(node) {
    if (!node) return false;

    // Comments cannot be attached to EOF or whitespace-like nodes
    if (node.symbol && node.symbol.text === "<EOF>") return false;
    if (node.hidden) return false;  // Skip hidden tokens themselves

    return true;
}

function isBlockComment(node) {
    if (!node || !node.symbol) return false;
    const text = node.symbol.text;
    return text && text.trim().startsWith("/*");
}

function getCommentType(node) {
    if (!node || !node.symbol) return "line";
    const text = node.symbol.text.trim();
    if (text.startsWith("//")) return "line";
    if (text.startsWith("/*")) return "block";
    return "line";
}

function printCompilationUnit(path, options, print) {
    // Grammar: namespaceDeclaration? usingRefList? objectDefinition* EOF
    const children = path.node.children;
    const namespaceDescIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_namespaceDeclaration);
    const usingRefListIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_usingRefList);
    const objectDefinitionIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_objectDefinition);

    const namespace = namespaceDescIdx > -1 ? path.call(print, 'children', namespaceDescIdx) : [];
    const usingRefList = usingRefListIdx > -1 ? path.call(print, 'children', usingRefListIdx) : [];

    const objectDef = path.call(print, 'children', objectDefinitionIdx);
    return [join([hardline, hardline], [namespace, usingRefList, objectDef]), hardline];
}

function printObjectDefinition(path, options, print) {
    return path.call(print, 'children', 0);
}

function printGenericObjectProperty(path, options, print) {
    return printProperty(path, options, print);
}

//#region Table functions

function printTableObject(path, options, print) {
    return printALObject(path, options, print, ALParser.TABLE);
}

function printTablePropertiesList(path, options, print) {
    // Grammar: tablePropertyItem+
    return join(hardline, path.map(print, 'children'));
}

function printTablePropertyItem(path, options, print) {
    // Grammar: tableProperty SEMICOLON
    return [path.call(print, 'children', 0), ";"];
}

function printTableProperty(path, options, print) {
    // All variants are keyword = value sequences; join tokens with spaces
    return printProperty(path, options, print);
}

function printTableFieldsList(path, options, print) {
    const children = path.node.children;
    // Grammar: FIELDS LBRACE tableFieldDefinition* RBRACE
    const fieldDocs = [];
    for (let i = 2; i < children.length - 1; i++) {
        fieldDocs.push(path.call(print, 'children', i));
    }
    return ["fields", hardline, "{", indent([hardline, join(hardline, fieldDocs)]), hardline, "}"];
}

function printTableFieldDefinition(path, options, print) {
    const children = path.node.children;
    // Grammar: FIELD LPAREN INTEGER_LITERAL SEMICOLON identifier SEMICOLON dataType RPAREN LBRACE tableFieldProperties* triggersList* RBRACE;
    const fieldId = path.call(print, 'children', 2);
    const fieldName = path.call(print, 'children', 4);  // identifier (non-terminal)
    const fieldType = path.call(print, 'children', 6);  // dataType (non-terminal)

    // Table field properties and triggers occupy children[9] through children[length-2]; children[length-1] is RBRACE
    const elementDocs = [];
    for (let i = 9; i < children.length - 1; i++) {
        elementDocs.push(path.call(print, 'children', i));
    }

    const signature = ["field(", fieldId, "; ", fieldName, "; ", fieldType, ")"];
    const body = elementDocs.length > 0
        ? [hardline, "{", indent([hardline, join([hardline, hardline], elementDocs)]), hardline, "}"]
        : [hardline, "{", hardline, "}"];

    return [...signature, ...body];
}

function printTableFieldPropertiesList(path, options, print) {
    // Grammar: tableFieldPropertyItem+
    return join(hardline, path.map(print, 'children'));
}

function printTableFieldPropertyItem(path, options, print) {
    // Grammar: tableFieldProperty SEMICOLON
    return [path.call(print, 'children', 0), ";"];
}

function printTableFieldProperty(path, options, print) {
    // All variants are keyword = value sequences; join tokens with spaces
    return printProperty(path, options, print);
}

function printTableKeysSection(path, options, print) {
    // Grammar: KEYS LBRACE keyList RBRACE
    const keyList = path.call(print, 'children', 2);
    return ["keys", hardline, "{", indent([hardline, keyList]), hardline, "}"];
}

function printKeyList(path, options, print) {
    // Grammar: (keyItem)*
    const children = path.node.children;
    if (!children || children.length === 0) return "";
    return join(hardline, path.map(print, 'children'));
}

function printKeyItem(path, options, print) {
    // Grammar: KEY LPAREN IDENTIFIER SEMICOLON IDENTIFIER (COMMA IDENTIFIER)* RPAREN LBRACE keyPropertiesList RBRACE
    const children = path.node.children;
    const rparenIdx = children.findIndex(c => c.symbol?.type === ALParser.RPAREN);

    const keyName = path.call(print, 'children', 2);

    // Field names at indices 4, 6, 8, ... (COMMA tokens at 5, 7, ... are skipped)
    const fieldDocs = [];
    for (let i = 4; i < rparenIdx; i += 2) {
        fieldDocs.push(path.call(print, 'children', i));
    }

    // LBRACE at rparenIdx+1, keyPropertiesList at rparenIdx+2, RBRACE at length-1
    const propsDoc = path.call(print, 'children', rparenIdx + 2);

    const signature = ["key(", keyName, "; ", join(", ", fieldDocs), ")"];
    const body = propsDoc
        ? [hardline, "{", indent([hardline, propsDoc]), hardline, "}"]
        : [hardline, "{", hardline, "}"];

    return [...signature, ...body];
}

function printKeyPropertiesList(path, options, print) {
    // Grammar: (keyPropertyItem SEMICOLON)* — children alternate between property and semicolon
    const children = path.node.children;
    if (!children || children.length === 0) return "";

    const docs = [];
    for (let i = 0; i < children.length; i += 2) {
        docs.push([path.call(print, 'children', i), ";"]);
    }
    return join(hardline, docs);
}

function printKeyPropertyItem(path, options, print) {
    // All variants are keyword = value sequences; join tokens with spaces
    return printProperty(path, options, print);
}

function printFieldGroupsList(path, options, print) {
    // Grammar: FIELDGROUPS LBRACE fieldGroupItem* RBRACE
    const rBraceIdx = path.node.children.findIndex(c => c.symbol?.type === ALParser.RBRACE);
    const items = [];

    for (let i = 2; i < rBraceIdx; i++) {
        items.push(path.call(print, 'children', 2));
    }

    return ["fieldgroups", hardline, "{", indent([hardline, join(hardline, items)]), hardline, "}"];
}

function printFieldGroupItem(path, options, print) {
    // Grammar: FIELDGROUP LPAREN fieldGroupDefinition RPAREN LBRACE RBRACE
    return ["fieldgroup(", path.call(print, 'children', 2), ")", hardline, "{", hardline, "}"];
}

function printFieldGroupDefinition(path, options, print) {
    // Grammar: identifier SEMICOLON fieldGroupFieldsList
    return [path.call(print, 'children', 0), "; ", path.call(print, 'children', 2)];
}

function printFieldGroupFieldsList(path, options, print) {
    // Grammar: identifier (COMMA identifier)*
    const fieldNames = [];
    for (let i = 0; i < path.node.children.length; i += 2) {
        fieldNames.push(path.call(print, 'children', i));
    }

    return join(", ", fieldNames);
}

//#endregion Table functions

//#region Table extension functions

function printTableExtObject(path, options, print) {
    // Grammar: TABLEEXTENSION INTEGER_LITERAL IDENTIFIER EXTENDS IDENTIFIER LBRACE tableExtPropertiesList? tableExtFieldsList? tableKeysSection? (variablesList | triggersList | proceduresList)* RBRACE;
    const children = path.node.children;

    const objectIdx = children.findIndex(c => c.symbol?.type === ALParser.TABLEEXTENSION);
    if (objectIdx === -1) return "";

    const objectId = path.call(print, 'children', objectIdx + 1);
    const objectName = path.call(print, 'children', objectIdx + 2);
    const extendedObjectName = path.call(print, 'children', objectIdx + 4);

    const elementStart = objectIdx + 6;
    const elementEnd = children.length - 1;
    const elementDocs = [];
    for (let i = elementStart; i < elementEnd; i++) {
        elementDocs.push(path.call(print, 'children', i));
    }

    const body = elementDocs.length > 0
        ? [indent([hardline, join([hardline, hardline], elementDocs)]), hardline]
        : [hardline];

    return ["tableextension ", objectId, " ", objectName, " extends ", extendedObjectName, hardline, "{", ...body, "}"];
}
//#endregion Table extension functions

//#region Page functions

function printPageObject(path, options, print) {
    return printALObject(path, options, print, ALParser.PAGE);
}

function printPagePropertyList(path, options, print) {
    // Grammar: pagePropertyItem+
    return join(hardline, path.map(print, 'children'));
}

function printPagePropertyItem(path, options, print) {
    // Grammar: pageProperty SEMICOLON
    return [path.call(print, 'children', 0), ";"];
}

function printPageProperty(path, options, print) {
    // All variants are keyword = value sequences; join tokens with spaces
    return printProperty(path, options, print);
}

function printLayoutDefinition(path, options, print) {
    // Grammar: LAYOUT LBRACE layoutElements RBRACE
    const elements = path.call(print, 'children', 2);
    return ["layout", hardline, "{", indent([hardline, elements]), hardline, "}"];
}

function printLayoutElements(path, options, print) {
    // Grammar: (areaDefinition | groupDefinition | pageFieldItem | partDefinition | repeaterDefinition)*
    const children = path.node.children;
    if (!children || children.length === 0) return "";
    return join(hardline, path.map(print, 'children'));
}

function printAreaDefinition(path, options, print) {
    // Grammar: AREA LPAREN IDENTIFIER RPAREN LBRACE areaElements RBRACE
    const name = path.call(print, 'children', 2);
    const elements = path.call(print, 'children', 5);
    return ["area(", name, ")", hardline, "{", indent([hardline, elements]), hardline, "}"];
}

function printAreaElements(path, options, print) {
    // Grammar: (groupDefinition | pageFieldItem | partDefinition | repeaterDefinition)*
    const children = path.node.children;
    if (!children || children.length === 0) return "";
    return join(hardline, path.map(print, 'children'));
}

function printGroupDefinition(path, options, print) {
    // Grammar: GROUP LPAREN identifier RPAREN LBRACE groupElements RBRACE
    const name = path.call(print, 'children', 2);
    const elements = path.call(print, 'children', 5);
    return ["group(", name, ")", hardline, "{", indent([hardline, elements]), hardline, "}"];
}

function printGroupElements(path, options, print) {
    // Grammar: groupPropertiesList? (pageFieldItem | groupDefinition | partDefinition)*
    const children = path.node.children;
    if (!children || children.length === 0)
        return "";

    const docs = [];
    let layoutElementsStartIndex = 0;

    // Inserting an empty line after the properties block if there is one
    if (children[0].ruleIndex === ALParser.RULE_groupPropertiesList) {
        layoutElementsStartIndex = 1;
        docs.push([path.call(print, 'children', 0), hardline]);
    }

    for (let i = layoutElementsStartIndex; i < children.length; i++) {
        docs.push([path.call(print, 'children', i)]);
    }

    return join(hardline, docs);
}

function printGroupProperty(path, options, print) {
    return printProperty(path, options, print);
}

function printGroupPropertyItem(path, options, print) {
    return [path.call(print, 'children', 0), ";"];
}

function printPartDefinition(path, options, print) {
    // Grammar: PART LPAREN IDENTIFIER SEMICOLON IDENTIFIER RPAREN LBRACE partPropertiesList RBRACE
    const partName = path.call(print, 'children', 2);
    const pageName = path.call(print, 'children', 4);
    const props = path.call(print, 'children', 7);
    const body = props
        ? [hardline, "{", indent([hardline, props]), hardline, "}"]
        : [hardline, "{", hardline, "}"];
    return ["part(", partName, "; ", pageName, ")", ...body];
}

function printPartPropertiesList(path, options, print) {
    // Grammar: partPropertyItem+
    return join(hardline, path.map(print, 'children'));
}

function printPartPropertyItem(path, options, print) {
    // Grammar: partProperty SEMICOLON
    return [path.call(print, 'children', 0), ";"];
}

function printPartProperty(path, options, print) {
    return printProperty(path, options, print);
}

function printRepeaterDefinition(path, options, print) {
    // Grammar: REPEATER LPAREN IDENTIFIER SEMICOLON IDENTIFIER RPAREN LBRACE repeaterElements RBRACE
    const repeaterName = path.call(print, 'children', 2);
    const sourceName = path.call(print, 'children', 4);
    const elements = path.call(print, 'children', 7);
    return ["repeater(", repeaterName, "; ", sourceName, ")", hardline, "{", indent([hardline, elements]), hardline, "}"];
}

function printRepeaterElements(path, options, print) {
    // Grammar: (pageFieldItem | groupDefinition)*
    const children = path.node.children;
    if (!children || children.length === 0) return "";
    return join(hardline, path.map(print, 'children'));
}

function printPageFieldItem(path, options, print) {
    // Grammar: FIELD LPAREN IDENTIFIER SEMICOLON tableFieldReference RPAREN LBRACE pageFieldPropertiesList* triggersList* RBRACE
    const children = path.node.children;
    const fieldName = path.call(print, 'children', 2);
    const fieldRef = path.call(print, 'children', 4);

    // pageFieldPropertiesList* and triggersList* occupy children[7..length-2]
    const elementDocs = [];
    for (let i = 7; i < children.length - 1; i++) {
        elementDocs.push(path.call(print, 'children', i));
    }

    const signature = ["field(", fieldName, "; ", fieldRef, ")"];
    const nonEmpty = elementDocs.filter(Boolean);
    const body = nonEmpty.length > 0
        ? [hardline, "{", indent([hardline, join([hardline, hardline], nonEmpty)]), hardline, "}"]
        : [hardline, "{", hardline, "}"];

    return [...signature, ...body];
}

function printPageFieldPropertiesList(path, options, print) {
    // Grammar: pageFieldPropertyDefinition+
    return join(hardline, path.map(print, 'children'));
}

function printPageFieldPropertyItem(path, options, print) {
    // Grammar: pageFieldProperty SEMICOLON
    return [path.call(print, 'children', 0), ";"];
}

function printPageFieldProperty(path, options, print) {
    // All variants are keyword = value sequences; join tokens with spaces
    return printProperty(path, options, print);
}

function printActionsDefinition(path, options, print) {
    // Grammar: ACTIONS LBRACE actionElements RBRACE
    const elements = path.call(print, 'children', 2);
    return ["actions", hardline, "{", indent([hardline, elements]), hardline, "}"];
}

function printActionElements(path, options, print) {
    // Grammar: (actionDefinition | actionGroupDefinition | actionAreaDefinition)*
    const children = path.node.children;
    if (!children || children.length === 0)
        return "";
    return join(hardline, path.map(print, 'children'));
}

function printActionDefinition(path, options, print) {
    // Grammar: ACTION LPAREN IDENTIFIER RPAREN LBRACE actionPropertiesList? triggersList? RBRACE
    const children = path.node.children;
    const name = path.call(print, 'children', 2);

    // actionPropertiesList? and triggersList? are collected between LBRACE (index 4) and RBRACE (last)
    const elementDocs = [];
    for (let i = 5; i < children.length - 1; i++) {
        elementDocs.push(path.call(print, 'children', i));
    }

    const nonEmpty = elementDocs.filter(Boolean);
    const body = nonEmpty.length > 0
        ? [hardline, "{", indent([hardline, join([hardline, hardline], nonEmpty)]), hardline, "}"]
        : [hardline, "{", hardline, "}"];

    return ["action(", name, ")", ...body];
}

function printActionPropertiesList(path, options, print) {
    // Grammar: actionPropertyItem+
    return join(hardline, path.map(print, 'children'));
}

function printActionPropertyItem(path, options, print) {
    // Grammar: actionProperty SEMICOLON
    return [path.call(print, 'children', 0), ";"];
}

function printActionProperty(path, options, print) {
    // All variants are keyword = value sequences; join tokens with spaces
    return printProperty(path, options, print);
}

function printActionAreaDefinition(path, options, print) {
    // Grammar: AREA LPAREN IDENTIFIER RPAREN LBRACE actionAreaElements RBRACE
    const name = path.call(print, 'children', 2);
    const elements = path.call(print, 'children', 5);
    return ["area(", name, ")", hardline, "{", indent([hardline, elements]), hardline, "}"];
}

function printActionAreaElements(path, options, print) {
    // Grammar: (actionDefinition | actionGroupDefinition)*
    const children = path.node.children;
    if (!children || children.length === 0) return "";
    return join(hardline, path.map(print, 'children'));
}

function printActionGroupDefinition(path, options, print) {
    // Grammar: GROUP LPAREN IDENTIFIER RPAREN LBRACE actionElements RBRACE
    const name = path.call(print, 'children', 2);
    const elements = path.call(print, 'children', 5);
    return ["group(", name, ")", hardline, "{", indent([hardline, elements]), hardline, "}"];
}

function printTableRelationExpression(path, options, print) {
    return group(indent(join(line, path.map(print, 'children'))));
}

function printRelatedTableExpression(path, options, print) {
    return path.map(print, 'children');
}

function printTableRelationWhereExpression(path, options, print) {
    // Grammar: WHERE LPAREN tableRelationEqualityExpression (COMMA tableRelationEqualityExpression)* RPAREN
    const children = path.node.children;
    const filters = [];
    for (let i = 2; i < children.length; i += 2) {
        filters.push(path.call(print, 'children', i));
    }

    return ["where(", indent(join([",", line], filters)), ")"];
}

function printTableRelationFieldReference(path, options, print) {
    // Grammar: FIELD LPAREN tableFieldReference RPAREN
    return ["field(", ...path.call(print, 'children', 2), ")"];
}

function printTableRelationFilter(path, options, print) {
    // Grammar: FILTER LPAREN relationFilterExpression RPAREN
    return ["filter(", ...path.call(print, 'children', 2), ")"];
}

function printCalcFormulaExpression(path, options, print) {
    // Grammar: identifier LPAREN tableFieldReference (tableRelationWhereExpression)? RPAREN;
    const children = path.node.children;
    const whereExprIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_tableRelationWhereExpression);
    const rparenIdx = children.findIndex(c => c.symbol?.type === ALParser.RPAREN);
    const tableRefIdx = whereExprIdx > 0 ? whereExprIdx - 1 : rparenIdx - 1;

    const calcFormulaFunction = path.call(print, 'children', 0);

    let whereExpr = [];
    if (whereExprIdx > 0) {
        whereExpr = path.call(print, 'children', whereExprIdx);
    }

    const tableRef = path.call(print, 'children', tableRefIdx);
    return group([...calcFormulaFunction, "(", indent([...tableRef, line, ...whereExpr]), ")"]);
}

//#endregion Page functions

//#region Interface functions

function printInterfaceObject(path, options, print) {
    const children = path.node.children;
    // Grammar: INTERFACE intentifier LBRACE interfacePropertiesList? procedureDeclaration* RBRACE
    const objectIdx = children.findIndex(c => c.symbol?.type === ALParser.INTERFACE);
    if (objectIdx === -1) return "";

    const keyword = path.call(print, 'children', objectIdx);
    const objectName = path.call(print, 'children', objectIdx + 1);

    let properties = [];
    if (children[objectIdx + 3].ruleIndex === ALParser.RULE_interfacePropertiesList) {
        properties = path.call(print, 'children', objectIdx + 3);
    }

    const procListStart =
        children[objectIdx + 3].ruleIndex === ALParser.RULE_interfacePropertiesList
            ? objectIdx + 4
            : objectIdx + 3;

    const procListEnd = children.length - 1;
    const procDeclDocs = [];
    for (let i = procListStart; i < procListEnd; i++) {
        procDeclDocs.push(path.call(print, 'children', i));
    }

    const body = procDeclDocs.length > 0 || properties.length > 0
        ? [indent([hardline, join([hardline], properties), hardline, hardline, join([hardline], procDeclDocs)]), hardline]
        : [hardline];

    return [keyword, " ", objectName, hardline, "{", ...body, "}"];
}

function printInterfacePropertiesList(path, options, print) {
    return join(hardline, path.map(print, 'children'));
}

function printProcedureDeclaration(path, options, print) {
    // Grammar: PROCEDURE identifier LPAREN parameterList? RPAREN procedureReturnType? SEMICOLON?

    const children = path.node.children;
    const rparenIdx = children.findIndex(c => c.symbol?.type === ALParser.RPAREN);
    const returnTypeIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_procedureReturnType);

    const name = path.call(print, 'children', 1);
    const paramDoc = rparenIdx > 3 ? path.call(print, 'children', 3) : "";

    let signature = ["procedure ", name, "(", paramDoc, ")"];

    if (returnTypeIdx) {
        signature = [...signature, path.call(print, 'children', returnTypeIdx)];
    }
    signature = group(indent([...signature, ";"]));

    return signature;
}

function printInterfacePropertyItem(path, options, print) {
    // Grammar: interfaceProperty SEMICOLON
    return [path.call(print, 'children', 0), ";"];
}

function printInterfaceProperty(path, options, print) {
    return printProperty(path, options, print);
}

//#endregion Interface functions

//#region Codeunit functions

function printCodeunitObject(path, options, print) {
    return printALObject(path, options, print, ALParser.CODEUNIT);
}

//#endregion Codeunit functions

//#region Code statements

function printNamespaceDeclaration(path, options, print) {
    // Grammar: NAMESPACE namespaceName SEMICOLON;
    return ["namespace ", ...path.call(print, 'children', 1), ";"];
}

function printUsingRefList(path, options, print) {
    return join(hardline, path.map(print, 'children'));
}

function printUsingReference(path, options, print) {
    // Grammar: USING namespaceName SEMICOLON;
    return ["using ", ...path.call(print, 'children', 1), ";"];
}

function printVariableDeclaration(path, options, print) {
    // Grammar: identifier (COMMA identifier)* COLON dataType SEMICOLON
    const children = path.node.children;
    const colonIdx = children.findIndex(c => c.symbol?.type === ALParser.COLON);

    const varNames = [];
    for (let varIdx = 0; varIdx < colonIdx; varIdx += 2)
        varNames.push(path.call(print, 'children', varIdx));

    const type = path.call(print, 'children', colonIdx + 1);
    return [join(", ", varNames), ": ", type, ";"];
}

function printVariablesList(path, options, print) {
    // Grammar: VAR variableDeclaration+
    const children = path.node.children;
    const varDocs = [];
    for (let i = 1; i < children.length; i++) {
        varDocs.push(path.call(print, 'children', i));
    }
    return ["var", indent([hardline, join(hardline, varDocs)])];
}

function printTriggersList(path, options, print) {
    // Grammar: triggerDefinition+
    return join([hardline, hardline], path.map(print, 'children'));
}

function printTriggerDefinition(path, options, print) {
    // Grammar: TRIGGER IDENTIFIER LPAREN parameterList? RPAREN variablesList? BEGIN statementList? END SEMICOLON
    const children = path.node.children;
    const rparenIdx = children.findIndex(c => c.symbol?.type === ALParser.RPAREN);
    const beginIdx = children.findIndex(c => c.symbol?.type === ALParser.BEGIN);
    const endIdx = children.findIndex(c => c.symbol?.type === ALParser.END);
    const statementListId = endIdx > beginIdx + 1 ? beginIdx + 1 : -1;

    const name = path.call(print, 'children', 1);

    // parameterList is at index 3 only when RPAREN is not immediately after LPAREN (index 2)
    const paramDoc = rparenIdx > 3 ? path.call(print, 'children', 3) : "";

    // variablesList: any rule context between RPAREN and BEGIN
    const varDocs = [];
    for (let i = rparenIdx + 1; i < beginIdx; i++) {
        varDocs.push(path.call(print, 'children', i));
    }

    const signature = ["trigger ", name, "(", paramDoc, ")"];
    const vars = varDocs.length > 0 ? [hardline, join(hardline, varDocs)] : [];
    const body = statementListId > 0
        ? [hardline, "begin", indent([hardline, path.call(print, 'children', statementListId)]), hardline, "end;"]
        : [hardline, "begin", hardline, "end;"];

    return [...signature, ...vars, ...body];
}

function printProceduresList(path, options, print) {
    // Grammar: procedureDefinition+
    return join([hardline, hardline], path.map(print, 'children'));
}

function printProcedureDefinition(path, options, print) {
    // Grammar: procedureAttributesList? (LOCAL | INTERNAL)? PROCEDURE IDENTIFIER LPAREN parameterList? RPAREN procedureReturnType? variablesList? BEGIN statementList? END SEMICOLON
    const children = path.node.children;

    const accessModifierIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_procedureAccessModifier);
    const procKeywordIdx = children.findIndex(c => c.symbol?.type === ALParser.PROCEDURE);
    const varStartIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_variablesList);
    const rparenIdx = children.findIndex(c => c.symbol?.type === ALParser.RPAREN);
    const returnTypeIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_procedureReturnType);
    const beginIdx = children.findIndex(c => c.symbol?.type === ALParser.BEGIN);
    const endIdx = children.findIndex(c => c.symbol?.type === ALParser.END);
    const statementListId = endIdx > beginIdx + 1 ? beginIdx + 1 : -1;

    let attributes = [];
    if (children[0].ruleIndex === ALParser.RULE_procedureAttributesList) {
        attributes = [...path.call(print, "children", 0), hardline];
    }

    const name = path.call(print, 'children', procKeywordIdx + 1);

    // parameterList is at index procKeywordIdx + 3 only when RPAREN is not immediately after LPAREN (index procKeywordIdx + 2)
    const paramDoc = rparenIdx > procKeywordIdx + 3 ? path.call(print, 'children', procKeywordIdx + 3) : "";

    // variablesList: any rule context between RPAREN and BEGIN
    const varDocs = [];

    if (varStartIdx > 0)
        for (let i = varStartIdx; i < beginIdx; i++) {
            varDocs.push(path.call(print, 'children', i));
        }

    let signature = ["procedure ", name, "(", group(indent(paramDoc)), ")"];

    // If the procedure return type is not defined, returnTypeIdx = -1
    let returnType = [];
    if (returnTypeIdx > 0) {
        returnType = path.call(print, 'children', returnTypeIdx);
    }

    let accessModifier = [];
    if (accessModifierIdx >= 0) {
        accessModifier = [path.call(print, 'children', accessModifierIdx), " "];
    }

    const vars = varDocs.length > 0 ? [hardline, join(hardline, varDocs)] : [];
    const body = statementListId > 0
        ? [hardline, "begin", indent([hardline, path.call(print, 'children', statementListId)]), hardline, "end;"]
        : [hardline, "begin", hardline, "end;"];

    return [...attributes, ...accessModifier, ...signature, ...returnType, ...vars, ...body];
}

function printProcedureAttributes(path, options, print) {
    return join(hardline, path.map(print, 'children'));
}

function printProcedureAttribute(path, options, print) {
    // Grammar: LBRACKET expression RBRACKET
    const attribute = path.call(print, "children", 1);
    return ["[", attribute, "]"];
}

function printParameterList(path, options, print) {
    // Grammar: parameter (SEMICOLON parameter)* — SEMICOLON tokens at indices 1, 3, 5, ... are skipped
    const children = path.node.children;
    const paramDocs = [];
    for (let i = 0; i < children.length; i += 2) {
        paramDocs.push(path.call(print, 'children', i));
    }
    return join([";", line], paramDocs);
}

function printProcReturnType(path, options, print) {
    return join(" ", path.map(print, 'children'));
}

function printStatementList(path, options, print) {
    const stmtDocs = [];
    for (let i = 0; i < path.node.children.length; i++) {
        stmtDocs.push(path.call(print, 'children', i));
    }

    return stmtDocs.length > 0
        ? [join(hardline, stmtDocs)]
        : "";
}

function printStatementWithSeparator(path, options, print) {
    return path.map(print, 'children');
}

function printStatement(path, options, print) {
    return path.map(print, 'children');
}

function printParameter(path, options, print) {
    // Grammar: VAR? IDENTIFIER COLON dataType
    const children = path.node.children;
    const hasVar = children[0]?.symbol?.type === ALParser.VAR;
    if (hasVar) {
        const name = path.call(print, 'children', 1);
        const type = path.call(print, 'children', 3);
        return ["var ", name, ": ", type];
    }
    const name = path.call(print, 'children', 0);
    const type = path.call(print, 'children', 2);
    return [name, ": ", type];
}

function printIfStatement(path, options, print) {
    // Grammar: IF expression THEN statement (ELSE statement)?
    const children = path.node.children;
    const condition = path.call(print, 'children', 1);  // expression
    let thenStmt = path.call(print, 'children', 3);   // statement

    // Statement following "then". If it's a compond statement "begin..end", do not insert a hardline before the statement.
    if (children[3]?.children[0]?.ruleIndex === ALParser.RULE_compoundBlock) {
        thenStmt = [" ", thenStmt];
    }
    else {
        thenStmt = indent([hardline, thenStmt]);
    }

    const ifPart = [group(["if ", condition, line, "then"]), thenStmt];

    // ELSE and its statement are optional — present when children.length > 4
    if (children.length > 4) {
        const elseStmt = path.call(print, 'children', 5);
        return [ifPart, hardline, "else", indent([hardline, elseStmt])];
    }

    return ifPart;
}

function printForLoopStatement(path, options, print) {
    // Grammar: FOR identifier ASSIGN expression TO expression DO statement
    //        | FOR identifier ASSIGN expression DOWNTO expression DO statement;

    const children = path.node.children;
    const iterator = path.call(print, 'children', 1);
    const initialization = path.call(print, 'children', 3);
    const increment = path.call(print, 'children', 4);  // "to" or "downto" keyword
    const condition = path.call(print, 'children', 5);
    let statement = path.call(print, 'children', 6);

    // Statement executed inside the loop. If it's a compond statement "begin..end", do not insert a hardline before the statement.
    if (children[6]?.children[0]?.ruleIndex === ALParser.RULE_compoundBlock) {
        statement = [" ", statement];
    }
    else {
        statement = indent([hardline, statement]);
    }

    return ["for ", iterator, " := ", initialization, ` ${increment} `, condition, " do", statement];
}

function printForEachStatement(path, options, print) {
    // Grammar: FOREACH identifier IN expression DO statement

    const children = path.node.children;
    const iterator = path.call(print, 'children', 1);
    const condition = path.call(print, 'children', 3);
    let statement = path.call(print, 'children', 5);

    // Statement executed inside the loop. If it's a compond statement "begin..end", do not insert a hardline before the statement.
    if (children[5]?.children[0]?.ruleIndex === ALParser.RULE_compoundBlock) {
        statement = [" ", statement];
    }
    else {
        statement = indent([hardline, statement]);
    }

    return ["foreach ", iterator, " in ", condition, " do", statement];
}

function printRepeatStatement(path, options, print) {
    // Grammar: REPEAT statementList UNTIL expression;

    const statementList = path.call(print, 'children', 1);
    const condition = path.call(print, 'children', 3);

    return ["repeat", indent([hardline, join(hardline, statementList)]), [hardline, "until ", condition]];
}

function printWhileLoopStatement(path, options, print) {
    // Grammar: WHILE expression DO statement

    const children = path.node.children;
    const condition = path.call(print, 'children', 1);
    let statement = path.call(print, 'children', 3);

    // Statement executed inside the loop. If it's a compond statement "begin..end", do not insert a hardline before the statement.
    if (children[3]?.children[0]?.ruleIndex === ALParser.RULE_compoundBlock) {
        statement = [" ", statement];
    }
    else {
        statement = indent([hardline, statement]);
    }

    return ["while ", condition, " do", statement];
}

function printCaseStatement(path, options, print) {
    // Grammar: CASE expression OF caseBranch+ END;

    const switchExpr = path.call(print, 'children', 1);
    const branches = [];

    for (let i = 3; i < path.node.children.length - 1; i++) {
        branches.push(path.call(print, 'children', i));
    }

    return ["case ", switchExpr, " of", indent([hardline, join(hardline, branches)]), hardline, "end"];
}

function printCaseBranch(path, options, print) {
    // Grammar: expression COLON statement SEMICOLON;

    const condition = path.call(print, 'children', 0);
    const statement = path.call(print, 'children', 2);
    return [condition, ":", indent([hardline, statement])];
}

function printProcedureCall(path, options, print) {
    // Grammar: identifier (DOT identifier)* LPAREN argumentList? RPAREN
    const children = path.node.children;
    const lparenIdx = children.findIndex(c => c.symbol?.type === ALParser.LPAREN);
    const rparenIdx = children.findIndex(c => c.symbol?.type === ALParser.RPAREN);

    // Name chain before LPAREN: joined without spaces to produce e.g. "Foo.Bar.Baz"
    const nameDocs = [];
    for (let i = 0; i < lparenIdx; i++) {
        nameDocs.push(path.call(print, 'children', i));
    }

    // argumentList is present when there is a child between LPAREN and RPAREN
    const argDoc = rparenIdx > lparenIdx + 1 ? path.call(print, 'children', lparenIdx + 1) : "";

    return group(indent([...nameDocs, "(", softline, argDoc, ")"]));
}

function printArgumentList(path, options, print) {
    // Grammar: expression (COMMA expression)* — COMMA tokens at odd indices are skipped
    const children = path.node.children;
    const argDocs = [];
    for (let i = 0; i < children.length; i += 2) {
        argDocs.push(path.call(print, 'children', i));
    }

    return join([",", line], argDocs);
}

function printUnaryExpression(path, options, print) {
    return path.map(print, 'children');
}

function printUnaryNotExpression(path, options, print) {
    return join(" ", path.map(print, 'children'));
}

function printBinaryExpression(path, options, print) {
    // All binary expression follow the structure: "operand operator operand".
    // If the line does not fit in the print width, the second operand will be moved to the next line with indent.

    return path.node?.children?.length > 1
        ? group(indent([path.call(print, 'children', 0), " ", path.call(print, 'children', 1), line, path.call(print, 'children', 2)]))
        : join(" ", path.map(print, 'children'));
}

function printCompoundBlock(path, options, print) {
    // Grammar: BEGIN statementList END
    const statementList = path.call(print, 'children', 1);
    return ["begin", indent([hardline, join(hardline, statementList)]), [hardline, "end"]];
}

function printALObject(path, options, print, objectType) {
    const children = path.node.children;
    // Grammar is similar for most objects.
    // For example, table grammar: TABLE INTEGER_LITERAL identifier LBRACE
    //              tablePropertyList? variablesList? tableFieldsList? tableKeysSection?
    //              variablesList? triggersList? variablesList? proceduresList? variablesList?
    //          RBRACE
    // Optional prefix rules are omitted from children when absent, so find the object type token (TABLE, PAGE, CODEUNIT, etc) dynamically
    const objectIdx = children.findIndex(c => c.symbol?.type === objectType);
    if (objectIdx === -1) return "";

    const keyword = path.call(print, 'children', objectIdx);
    const objectId = path.call(print, 'children', objectIdx + 1);
    const objectName = path.call(print, 'children', objectIdx + 2);
    // objectIdx + 3 is LBRACE, objectIdx + 4 .. length-2 are named sections, length-1 is RBRACE

    const elementStart = objectIdx + 4;
    const elementEnd = children.length - 1;
    const elementDocs = [];
    for (let i = elementStart; i < elementEnd; i++) {
        elementDocs.push(path.call(print, 'children', i));
    }

    const body = elementDocs.length > 0
        ? [indent([hardline, join([hardline, hardline], elementDocs)]), hardline]
        : [hardline];

    return [keyword, " ", objectId, " ", objectName, hardline, "{", ...body, "}"];
}

function printArrayDataType(path, options, print) {
    // Grammar: ARRAY LBRACKET INTEGER_LITERAL RBRACKET OF dataType
    const len = path.call(print, 'children', 2);
    const type = path.call(print, 'children', 5);
    return ["array[", len, "] of ", type];
}

function printDictionaryDataType(path, options, print) {
    // Grammar: DICTIONARY OF LBRACKET dataType COMMA dataType RBRACKET;
    const type1 = path.call(print, 'children', 3);
    const type2 = path.call(print, 'children', 5);
    return ["Dictionary of [", type1, ",  ", type2, "]"];
}

function printLabelDataType(path, options, print) {
    // Grammar: LABEL STRING_LITERAL ((COMMA COMMENT EQUAL STRING_LITERAL)? | (COMMA LOCKED EQUAL BOOLEAN_LITERAL)? )*
    // Flat:    Label 'text', Comment = 'value', Locked = true
    // Broken:  Label 'text',
    //              Comment = 'value',
    //              Locked = true
    const children = path.node.children;
    const labelText = path.call(print, 'children', 1);
    const properties = [];

    for (let index = 3; index < children.length; index += 4) {
        const name = path.call(print, 'children', index);
        const value = path.call(print, 'children', index + 2);
        properties.push([name, " = ", value]);
    }

    if (properties.length === 0) {
        return ["Label ", labelText];
    }

    // group() tries to fit everything on one line first. When it doesn't fit,
    // each `line` expands to a newline and the `indent` shifts continuations in.
    return group([
        "Label ", labelText,
        indent(properties.map(prop => [",", line, prop]))
    ]);
}

function printListDataType(path, options, print) {
    // Grammar: LIST OF LBRACKET dataType RBRACKET
    const type = path.call(print, 'children', 3);
    return ["List of [", type, "]"];
}

function printOptionDataType(path, options, print) {
    // Grammar: OPTION optionMembersList?
    const optionValues = path.call(print, 'children', 1);

    const TypeName = "Option";
    return optionValues.length > 0
        ? [TypeName, " ", optionValues]
        : [TypeName];
}

function printIdentifiersList(path, options, print) {
    // Grammar: identifier (COMMA identifier)*
    const optionValues = [];
    for (let i = 0; i < path.node.children.length; i += 2) {
        optionValues.push(path.call(print, 'children', i));
    }

    return join(", ", optionValues);
}

function printProperty(path, options, print) {
    return join(" ", path.map(print, 'children'));
}

//#endregion Code statements

export const printer = {
    print,
    getVisitorKeys,
    printComment,
    canAttachComment,
    isBlockComment,
    getCommentType
}
