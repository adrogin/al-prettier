import * as prettier from 'prettier';
import ALParser from '../parser/JS/ALParser.js';
import { isParagraphStatement, isSingleCompundStatement } from "./printerHelpers.js";

const { hardline, join, indent, group, line, softline } = prettier.doc.builders;

function getVisitorKeys(node) {
    if (node && Array.isArray(node.children)) {
        return ['children'];
    }

    return [];
}

function print(path, options, print, args) {
    const node = path.node;

    if (!node) return "";

    // Terminal node (ANTLR token)
    if (node.symbol) {
        const text = node.symbol.text;
        if (text === "<EOF>") return "";
        return printToken(node);
    }

    switch (node.ruleIndex) {
        case ALParser.RULE_compilationUnit:
            return printCompilationUnit(path, options, print);

        //#region Common object elements

        case ALParser.RULE_objectDefinition:
            return printObjectDefinition(path, options, print);

        case ALParser.RULE_genericObjectProperty:
        case ALParser.RULE_accessProperty:
            return printGenericObjectProperty(path, options, print);

        case ALParser.RULE_tablePropertiesList:
        case ALParser.RULE_pagePropertiesList:
        case ALParser.RULE_codeunitPropertiesList:
        case ALParser.RULE_enumPropertiesList:
        case ALParser.RULE_keyPropertiesList:
        case ALParser.RULE_enumPropertiesList:
        case ALParser.RULE_enumValuePropertiesList:
        case ALParser.RULE_groupPropertiesList:
        case ALParser.RULE_queryPropertiesList:
        case ALParser.RULE_queryColumnPropertiesList:
        case ALParser.RULE_reportPropertiesList:
        case ALParser.RULE_reportDataItemPropertiesList:
            return printObjectPropertiesList(path, options, print);

        case ALParser.RULE_tablePropertyItem:
        case ALParser.RULE_codeunitPropertyItem:
        case ALParser.RULE_pagePropertyItem:
        case ALParser.RULE_tableFieldPropertyItem:
        case ALParser.RULE_keyPropertyItem:
        case ALParser.RULE_enumPropertyItem:
        case ALParser.RULE_enumValuePropertyItem:
        case ALParser.RULE_queryPropertyItem:
        case ALParser.RULE_queryColumnPropertyItem:
            return printObjectPropertyItem(path, options, print);

        case ALParser.RULE_tableProperty:
        case ALParser.RULE_pageProperty:
        case ALParser.RULE_pageFieldProperty:
        case ALParser.RULE_actionProperty:
        case ALParser.RULE_codeunitProperty:
        case ALParser.RULE_tableFieldProperty:
        case ALParser.RULE_keyProperty:
        case ALParser.RULE_groupProperty:
        case ALParser.RULE_partProperty:
        case ALParser.RULE_enumProperty:
        case ALParser.RULE_enumValueProperty:
        case ALParser.RULE_interfaceProperty:
        case ALParser.RULE_queryProperty:
        case ALParser.RULE_queryColumnProperty:
        case ALParser.RULE_reportProperty:
        case ALParser.RULE_reportDataItemProperty:
            return printObjectProperty(path, options, print);

        case ALParser.RULE_objectReference:
            return printObjectReference(path, options, print);

        case ALParser.RULE_subpageLinkProperty:
        case ALParser.RULE_runPageLinkProperty:
            return printSubPageLinkProperty(path, options, print);

        case ALParser.RULE_pageLinkExpression:
            return printPageLinkExpression(path, options, print);

        case ALParser.RULE_objectPermissionsList:
            return printObjectPermissionsList(path, options, print);

        case ALParser.RULE_permissionsPropertyValue:
            return printPermissionsPropertyValue(path, options, print);

        case ALParser.RULE_decimalPlacesPropValue:
            return printDecimalPlacesPropertyValue(path, options, print);

        case ALParser.RULE_accessByPermissionProperty:
            return printAccessByPermissionPropertyValue(path, options, print);

        //#endregion Common object elements

        //#region Table object
        case ALParser.RULE_tableObject:
            return printTableObject(path, options, print);

        case ALParser.RULE_tableFieldsList:
        case ALParser.RULE_tableExtFieldsList:
            return printTableFieldsList(path, options, print);

        case ALParser.RULE_tableFieldDefinition:
            return printTableFieldDefinition(path, options, print);

        case ALParser.RULE_tableFieldPropertiesList:
            return printTableFieldPropertiesList(path, options, print);

        case ALParser.RULE_tableRelationExpression:
            return printTableRelationExpression(path, options, print);

        case ALParser.RULE_tableFieldReference:
            return printTableFieldReference(path, options, print);

        case ALParser.RULE_tableRelationWhereExpression:
            return printTableRelationWhereExpression(path, options, print);

        case ALParser.RULE_tableRelationFieldReference:
        case ALParser.RULE_tableRelationConstReference:
        case ALParser.RULE_tableRelationFilter:
            return printTableRelationFilterRef(path, options, print);

        case ALParser.RULE_relationFilterExpression:
            return printRelationFilterExpression(path, options, print);

        case ALParser.RULE_calcFormulaExpression:
            return printCalcFormulaExpression(path, options, print);

        case ALParser.RULE_tableKeysSection:
            return printTableKeysSection(path, options, print);

        case ALParser.RULE_keyList:
            return printKeyList(path, options, print);

        case ALParser.RULE_keyItem:
            return printKeyItem(path, options, print);

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

        case ALParser.RULE_tableExtFieldModification:
            return printTableExtFieldModification(path, node, print);

        //#endregion Table extension object

        //#region Page object

        case ALParser.RULE_pageObject:
            return printPageObject(path, options, print);

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

        case ALParser.RULE_groupPropertyItem:
            return printGroupPropertyItem(path, options, print);

        case ALParser.RULE_partDefinition:
            return printPartDefinition(path, options, print);

        case ALParser.RULE_partPropertiesList:
            return printPartPropertiesList(path, options, print);

        case ALParser.RULE_partPropertyItem:
            return printPartPropertyItem(path, options, print);

        case ALParser.RULE_repeaterDefinition:
            return printRepeaterDefinition(path, options, print);

        case ALParser.RULE_repeaterElements:
            return printRepeaterElements(path, options, print);

        case ALParser.RULE_pageFieldItem:
        case ALParser.RULE_userControlItem:
            return printPageFieldItem(path, options, print);

        case ALParser.RULE_pageLabelItem:
            return printPageLabelItem(path, options, print);

        case ALParser.RULE_pageFieldPropertiesList:
            return printPageFieldPropertiesList(path, options, print);

        case ALParser.RULE_pageFieldPropertyItem:
            return printPageFieldPropertyItem(path, options, print);

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

        case ALParser.RULE_actionAreaDefinition:
            return printActionAreaDefinition(path, options, print);

        case ALParser.RULE_actionAreaElements:
            return printActionAreaElements(path, options, print);

        case ALParser.RULE_actionGroupDefinition:
            return printActionGroupDefinition(path, options, print);

        case ALParser.RULE_actionRefsList:
            return printActionRefsList(path, options, print);

        case ALParser.RULE_actionRef:
            return printActionRef(path, options, print);

        case ALParser.RULE_tableViewExpression:
            return pintTableViewExpression(path, options, print);

        //#endregion Page object

        //#region Codeunit object

        case ALParser.RULE_codeunitObject:
            return printCodeunitObject(path, options, print);

        case ALParser.RULE_implementsInterfacesList:
            return printImplementsInterfacesList(path, options, print);

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

        //#endregion Interface object

        //#region Enum object

        case ALParser.RULE_enumObject:
            return printEnumObject(path, options, print);

        case ALParser.RULE_enumValuesList:
            return printEnumValuesList(path, options, print);

        case ALParser.RULE_enumValueDefinition:
            return printEnumValueDefinition(path, options, print);

        case ALParser.RULE_implementationProperty:
            return printImplementationProperty(path, options, print);

        //#endregion Enum object

        //#region Page extension

        case ALParser.RULE_pageExtensionObject:
            return printPageExtensionObject(path, options, print);

        case ALParser.RULE_pageExtLayoutDefinition:
            return printPageExtLayoutDefinition(path, options, print);

        case ALParser.RULE_pageExtLayoutModification:
        case ALParser.RULE_pageExtActionModification:
        case ALParser.RULE_pageExtActionPropModification:
            return printPageExtLayoutModificationBlock(path, options, print);

        case ALParser.RULE_pageExtElementModification:
            return printPageExtElementModificationBlock(path, options, print);

        case ALParser.RULE_pageExtActionsBlock:
            return printPageExtensionActions(path, options, print);

        case ALParser.RULE_pageExtElementRelocation:
            return printPageExtElementRelocation(path, options, print);

        //#endregion Page extension

        //#region Enum extension

        case ALParser.RULE_enumExtensionObject:
            return printEnumExtensionObject(path, options, print);

        //#endregion Enum extension

        //#region Query object

        case ALParser.RULE_queryObject:
            return printQueryObject(path, options, print);

        case ALParser.RULE_queryElements:
            return printQueryElements(path, options, print);

        case ALParser.RULE_queryDataItemElementsList:
            return printQueryDataItemElementsList(path, options, print);

        case ALParser.RULE_queryDataItemDefinition:
            return printQueryDataItemDefinition(path, options, print);

        case ALParser.RULE_queryDataItemLinkProperty:
        case ALParser.RULE_dataItemTableFilterProp:
        case ALParser.RULE_columnFilterProp:
            return printDataItemLinkProperty(path, options, print);

        case ALParser.RULE_queryColumnDefinition:
        case ALParser.RULE_queryFilterDefinition:
            return printQueryColumnDefinition(path, options, print);

        case ALParser.RULE_orderByProperty:
            return printOrderByProperty(path, options, print);

        //#endregion Query object

        //#region Report object

        case ALParser.RULE_reportObject:
            return printReportObject(path, options, print);

        case ALParser.RULE_reportDatasetDefinition:
            return printReportDatasetDefinition(path, options, print);

        case ALParser.RULE_reportDataItemDefinition:
        case ALParser.RULE_reportColumnDefinition:
            return printReportDataItemDefinition(path, options, print);

        case ALParser.RULE_reportDataItemElementsList:
            return printReportDataItemElementsList(path, options, print);

        case ALParser.RULE_reportDataItemLinkProperty:
            return printDataItemLinkProperty(path, options, print);

        case ALParser.RULE_requestpageDefinition:
            return printReportRequestPage(path, options, print);

        case ALParser.RULE_renderingOptions:
            return printRenderingOptions(path, options, print);

        case ALParser.RULE_renderingLayout:
            return printRenderingLayout(path, options, print);

        case ALParser.RULE_labelsDefinition:
            return printLabelsDefinition(path, options, print);

        case ALParser.RULE_labelDefinition:
            return printLabelDefinition(path, options, print);

        //#endregion Report object

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

        case ALParser.RULE_ifElseStatement:
        case ALParser.RULE_caseElseStatement:
            return printElseStatement(path, options, print);

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
        case ALParser.RULE_interfaceDataType:
        case ALParser.RULE_pageDataType:
        case ALParser.RULE_queryDataType:
        case ALParser.RULE_recordDataType:
        case ALParser.RULE_reportDataType:
        case ALParser.RULE_testPageDataType:
        case ALParser.RULE_xmlPortDataType:
        case ALParser.RULE_dotNetDataType:
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
            return printProcedureCall(path, options, print, args);

        case ALParser.RULE_argumentList:
            return printArgumentList(path, options, print, args);

        case ALParser.RULE_unaryExpression:
        case ALParser.RULE_unaryPlusExpression:
        case ALParser.RULE_unaryMinusExpression:
            return printUnaryExpression(path, options, print, args);

        case ALParser.RULE_unaryNotExpression:
            return printUnaryNotExpression(path, options, print);

        case ALParser.RULE_compoundBlock:
            return printCompoundBlock(path, options, print);

        case ALParser.RULE_caseStatement:
            return printCaseStatement(path, options, print);

        case ALParser.RULE_caseBranch:
            return printCaseBranch(path, options, print);

        case ALParser.RULE_assignmentStatement:
        case ALParser.RULE_equalityExpression:
        case ALParser.RULE_relationalExpression:
        case ALParser.RULE_tableRelationEqualityExpression:
        case ALParser.RULE_subpageLinkFilter:
            return printBinaryExpression(path, options, print, args);

        case ALParser.RULE_logicalInExpression:
            return printLogicalInExpression(path, options, print);

        case ALParser.RULE_logicalOrExpression:
        case ALParser.RULE_logicalAndExpression:
        case ALParser.RULE_additiveExpression:
        case ALParser.RULE_multiplicativeExpression:
            return printMultipartExpression(path, options, print, args);

        //#endregion Code statements

        default:
            if (Array.isArray(node.children)) {
                return path.map(() => print(path, args), 'children');
            }
            return "";
    }
}

function printComment(path, options) {
    const comment = path.node;

    if (!comment?.symbol?.text) {
        return "";
    }

    return comment.symbol.text.trim();
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

    const result = [];
    if (namespace.length > 0) {
        result.push(...namespace, hardline, hardline);
    }
    if (usingRefList.length > 0) {
        result.push(...usingRefList, hardline, hardline);
    }

    if (objectDef.length > 0) {
        result.push(...objectDef, hardline);
    }

    return result;
}

function printObjectDefinition(path, options, print) {
    return path.call(print, 'children', 0);
}

function printGenericObjectProperty(path, options, print) {
    return printObjectProperty(path, options, print);
}

function printObjectPropertiesList(path, options, print) {
    return join(hardline, path.map(print, 'children'));
}

function printObjectPropertyItem(path, options, print) {
    // Grammar: tableProperty SEMICOLON (For table. Other object follow the same grammar, only with the respective object type.)
    return [path.call(print, 'children', 0), path.call(print, 'children', 1)];
}

function printObjectProperty(path, options, print) {
    // Grammar: identifier EQUAL expression (COMMA identifier EQUAL literal)*;
    const children = path.node.children;
    if (children.length === 1)
        return path.call(print, 'children', 0);

    const definition = [];
    definition.push(path.call(print, 'children', 0));  // Property name
    definition.push(path.call(print, 'children', 1));  // Equal sign
    definition.push(path.call(print, 'children', 2));  // Property value

    // Comma-separated list of property modifiers (e.g. Caption = 'Caption text', Locked = true)
    const modifiers = [];
    for (let i = 3; i < children.length; i += 4) {
        modifiers.push(
            join(" ", [
                path.call(print, 'children', i),  // Comma
                path.call(print, 'children', i + 1),  // Name
                path.call(print, 'children', i + 2),  // Equal sign
                path.call(print, 'children', i + 3)   // Value
            ]));
    }

    const property = [];
    property.push(join(" ", definition));
    if (modifiers.length > 0)
        property.push(modifiers);

    return property;
}

function printObjectReference(path, options, print) {
    // Grammar: objectTypeName identifier;
    return join(" ", path.map(print, 'children'));
}

//#region Table functions

function printTableObject(path, options, print) {
    return printALObject(path, options, print, ALParser.TABLE);
}

function printTableFieldsList(path, options, print) {
    const children = path.node.children;
    // Invoked for table fields and table extension fields
    // Table fields grammar: FIELDS LBRACE tableFieldDefinition* RBRACE
    // Table extension fields grammar: FIELDS LBRACE (tableFieldDefinition | tableExtFieldModification)* RBRACE;
    const fieldDocs = [];
    for (let i = 2; i < children.length - 1; i++) {
        fieldDocs.push(path.call(print, 'children', i));
    }
    return ["fields", hardline, "{", indent([hardline, join(hardline, fieldDocs)]), hardline, "}"];
}

function printTableFieldDefinition(path, options, print) {
    const children = path.node.children;
    // Grammar: FIELD LPAREN INTEGER_LITERAL SEMICOLON identifier SEMICOLON dataType RPAREN LBRACE tableFieldProperties* triggersList* RBRACE;
    const fieldKeyword = path.call(print, 'children', 0);
    const lparen = path.call(print, 'children', 1);
    const fieldId = path.call(print, 'children', 2);
    const semicolon1 = path.call(print, 'children', 3);
    const fieldName = path.call(print, 'children', 4);  // identifier (non-terminal)
    const semicolon2 = path.call(print, 'children', 5);
    const fieldType = path.call(print, 'children', 6);  // dataType (non-terminal)
    const rparen = path.call(print, 'children', 7);
    const lbrace = path.call(print, 'children', 8);
    const rbrace = path.call(print, 'children', children.length - 1);

    // Table field properties and triggers occupy children[9] through children[length-2]; children[length-1] is RBRACE
    const elementDocs = [];
    for (let i = 9; i < children.length - 1; i++) {
        elementDocs.push(path.call(print, 'children', i));
    }

    const signature = [fieldKeyword, lparen, fieldId, semicolon1, " ", fieldName, semicolon2, " ", fieldType, rparen];
    const body = elementDocs.length > 0
        ? [hardline, lbrace, indent([hardline, join([hardline, hardline], elementDocs)]), hardline, rbrace]
        : [hardline, lbrace, hardline, rbrace];

    return [...signature, ...body];
}

function printTableFieldPropertiesList(path, options, print) {
    // Grammar: tableFieldPropertyItem+
    return join(hardline, path.map(print, 'children'));
}

function printTableKeysSection(path, options, print) {
    // Grammar: KEYS LBRACE keyList RBRACE
    const keysKeyword = path.call(print, 'children', 0);
    const lbrace = path.call(print, 'children', 1);
    const keyList = path.call(print, 'children', 2);
    const rbrace = path.call(print, 'children', 3);
    return [keysKeyword, hardline, lbrace, indent([hardline, keyList]), hardline, rbrace];
}

function printKeyList(path, options, print) {
    // Grammar: (keyItem)*
    const children = path.node.children;
    if (!children || children.length === 0) return "";
    return join(hardline, path.map(print, 'children'));
}

function printKeyItem(path, options, print) {
    // Grammar: KEY LPAREN identifier SEMICOLON identifier (COMMA identifier)* RPAREN LBRACE keyPropertiesList? RBRACE
    const children = path.node.children;
    const rparenIdx = children.findIndex(c => c.symbol?.type === ALParser.RPAREN);

    const keyName = path.call(print, 'children', 2);

    // Field names at indices 4, 6, 8, ... (COMMA tokens at 5, 7, ... are skipped)
    const fieldDocs = [];
    for (let i = 4; i < rparenIdx; i += 2) {
        fieldDocs.push(path.call(print, 'children', i));
    }

    const propsListIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_keyPropertiesList);
    let propsList = [];
    if (propsListIdx > -1) {
        propsList = path.call(print, 'children', propsListIdx);
    }

    const signature = ["key(", keyName, "; ", join(", ", fieldDocs), ")"];
    const body = propsListIdx > -1
        ? [hardline, "{", indent([hardline, propsList]), hardline, "}"]
        : [hardline, "{", hardline, "}"];

    return [...signature, ...body];
}

function printFieldGroupsList(path, options, print) {
    // Grammar: FIELDGROUPS LBRACE fieldGroupItem* RBRACE
    const rBraceIdx = path.node.children.findIndex(c => c.symbol?.type === ALParser.RBRACE);
    const keyword = path.call(print, 'children', 0);
    const lbrace = path.call(print, 'children', 1);
    const rbrace = path.call(print, 'children', rBraceIdx);
    const items = [];

    for (let i = 2; i < rBraceIdx; i++) {
        items.push(path.call(print, 'children', 2));
    }

    if (options.removeEmptyElements && items.length === 0)
        return "";

    const res = [];
    res.push(keyword, hardline, lbrace);
    if (items.length > 0) {
        res.push(indent([hardline, join(hardline, items)]));
    }
    res.push(hardline, rbrace);

    return res;
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

function printTableExtFieldModification(path, node, print) {
    // Grammar: MODIFY LPAREN identifier RPAREN LBRACE tableFieldPropertiesList? triggersList? RBRACE;
    const children = path.node.children;
    const modifyKeyword = path.call(print, 'children', 0);
    const lparen = path.call(print, 'children', 1);
    const fieldName = path.call(print, 'children', 2);
    const rparen = path.call(print, 'children', 3);
    const lbrace = path.call(print, 'children', 4);
    const rbrace = path.call(print, 'children', children.length - 1);

    const elementDocs = [];
    for (let i = 5; i < children.length - 1; i++) {
        elementDocs.push(path.call(print, 'children', i));
    }

    const signature = [modifyKeyword, lparen, fieldName, rparen];
    const body = elementDocs.length > 0
        ? [hardline, lbrace, indent([hardline, join([hardline, hardline], elementDocs)]), hardline, rbrace]
        : [hardline, lbrace, hardline, rbrace];

    return [...signature, ...body];
}

//#endregion Table extension functions

//#region Page functions

function printPageObject(path, options, print) {
    return printALObject(path, options, print, ALParser.PAGE);
}

function printLayoutDefinition(path, options, print) {
    // Grammar: LAYOUT LBRACE layoutElements RBRACE
    const elements = path.call(print, 'children', 2);
    if (options.removeEmptyElements && (!Array.isArray(elements) || elements.length === 0))
        return "";

    const pageLayout = [path.call(print, 'children', 0), hardline, path.call(print, 'children', 1)];

    if (Array.isArray(elements) && elements.length > 0) {
        pageLayout.push(indent([hardline, elements]));
    }

    pageLayout.push(hardline, path.call(print, 'children', 3));
    return pageLayout;
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

function printRepeaterDefinition(path, options, print) {
    // Grammar: REPEATER LPAREN identifier RPAREN LBRACE repeaterElements RBRACE
    const repeaterKeyword = path.call(print, 'children', 0);
    const lparen = path.call(print, 'children', 1);
    const repeaterName = path.call(print, 'children', 2);
    const rparen = path.call(print, 'children', 3);
    const lbrace = path.call(print, 'children', 4);
    const elements = path.call(print, 'children', 5);
    const rbrace = path.call(print, 'children', 6);

    return [repeaterKeyword, lparen, repeaterName, rparen, hardline, lbrace, indent([hardline, elements]), hardline, rbrace];
}

function printRepeaterElements(path, options, print) {
    // Grammar: pageFieldPropertiesList? (pageFieldItem | groupDefinition)*
    const children = path.node.children;
    if (!children || children.length === 0)
        return "";

    let firstElementIdx = 0;
    const elements = [];
    if (children[0].ruleIndex === ALParser.RULE_pageFieldPropertiesList) {
        const properties = path.call(print, 'children', 0);
        if (children.length === 1)
            return properties;

        elements.push([properties, hardline]);
        firstElementIdx += 1;
    }

    for (let i = firstElementIdx; i < children.length; i++) {
        elements.push([path.call(print, 'children', i)]);
    }

    return join(hardline, elements);
}

function printPageFieldItem(path, options, print) {
    // Grammar: FIELD LPAREN identifier SEMICOLON expression RPAREN LBRACE pageFieldPropertiesList? triggersList? RBRACE;
    const children = path.node.children;
    const keyword = path.call(print, 'children', 0);
    const lparen = path.call(print, 'children', 1);
    const fieldName = path.call(print, 'children', 2);
    const semicolon = path.call(print, 'children', 3);
    const expression = path.call(print, 'children', 4);
    const rparen = path.call(print, 'children', 5);
    const lbrace = path.call(print, 'children', 6);
    const rbrace = path.call(print, 'children', children.length - 1);

    const elementDocs = [];
    for (let i = 7; i < children.length - 1; i++) {
        elementDocs.push(path.call(print, 'children', i));
    }

    const signature = [keyword, lparen, fieldName, semicolon, " ", expression, rparen];
    const nonEmpty = elementDocs.filter(Boolean);
    const body = nonEmpty.length > 0
        ? [hardline, lbrace, indent([hardline, join([hardline, hardline], nonEmpty)]), hardline, rbrace]
        : [hardline, lbrace, hardline, rbrace];

    return [...signature, ...body];
}

function printPageLabelItem(path, options, print) {
    // Grammar: LABEL LPAREN identifier RPAREN LBRACE pageFieldPropertiesList? RBRACE;
    const children = path.node.children;

    const signature = [];
    for (let i = 0; i < 4; i++) {
        signature.push(path.call(print, 'children', i));
    }

    const lbrace = path.call(print, 'children', 4);
    const rbrace = path.call(print, 'children', children.length - 1);
    const properties = children[5].ruleIndex === ALParser.RULE_pageFieldPropertiesList ? path.call(print, 'children', 5) : [];
    const body = properties.length > 0
        ? [hardline, lbrace, indent([hardline, properties]), hardline, rbrace]
        : [hardline, lbrace, hardline, rbrace];

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

function printActionsDefinition(path, options, print) {
    // Grammar: ACTIONS LBRACE actionElements RBRACE
    const elements = path.call(print, 'children', 2);
    if (options.removeEmptyElements && (!Array.isArray(elements) || elements.length === 0))
        return "";

    const keyword = path.call(print, 'children', 0);
    const lbrace = path.call(print, 'children', 1);
    const rbrace = path.call(print, 'children', 3);

    const actionsDef = [keyword, hardline, lbrace];
    if (Array.isArray(elements) && elements.length > 0) {
        actionsDef.push(indent([hardline, elements]));
    }
    actionsDef.push(hardline, rbrace);

    return actionsDef;
}

function printActionElements(path, options, print) {
    // Grammar: actionPropertiesList? (actionDefinition | actionRefsList | actionGroupDefinition | actionAreaDefinition)*;
    const children = path.node.children;
    if (!children || children.length === 0)
        return "";

    let actionStartIdx = 0;
    const elements = [];
    if (children[0].ruleIndex === ALParser.RULE_actionPropertiesList) {
        elements.push(path.call(print, 'children', 0));
        actionStartIdx = 1;
    }

    const actions = [];
    for (let i = actionStartIdx; i < children.length; i++) {
        actions.push(path.call(print, 'children', i));
    }

    if (actions.length > 0) {
        if (elements.length > 0)
            elements.push(hardline, hardline);

        elements.push(join(hardline, actions));
    }

    return elements;
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

function printActionAreaDefinition(path, options, print) {
    // Grammar: AREA LPAREN IDENTIFIER RPAREN LBRACE actionAreaElements RBRACE
    const name = path.call(print, 'children', 2);
    const elements = path.call(print, 'children', 5);
    return ["area(", name, ")", hardline, "{", indent([hardline, elements]), hardline, "}"];
}

function printActionAreaElements(path, options, print) {
    // Grammar: actionPropertiesList? (actionDefinition | actionGroupDefinition | actionRefsList)*;
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

function printActionRefsList(path, options, print) {
    // Grammar: actionRef+
    return join(hardline, path.map(print, 'children'));
}

function printActionRef(path, options, print) {
    // Grammar: ACTIONREF LPAREN identifier SEMICOLON identifier RPAREN LBRACE actionPropertiesList? RBRACE
    const actionRefKeyword = path.call(print, 'children', 0);
    const lparen = path.call(print, 'children', 1);
    const name = path.call(print, 'children', 2);
    const semicolon = path.call(print, 'children', 3);
    const actionName = path.call(print, 'children', 4);
    const rparen = path.call(print, 'children', 5);
    const lbrace = path.call(print, 'children', 6);
    const rbrace = path.call(print, 'children', path.node.children.length - 1);

    const actionPropsIdx = path.node.children.findIndex(c => c.ruleIndex === ALParser.RULE_actionPropertiesList);
    const properties = [];
    if (actionPropsIdx > -1) {
        properties.push(indent([hardline, path.call(print, 'children', actionPropsIdx)]));
    }

    return [actionRefKeyword, lparen, name, semicolon, " ", actionName, rparen, hardline, lbrace, properties, hardline, rbrace];
}

function printTableRelationExpression(path, options, print) {
    return group(indent(join(line, path.map(print, 'children'))));
}

function printTableFieldReference(path, options, print) {
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

function printTableRelationFilterRef(path, options, print) {
    const rparenIdx = path.node.children.findIndex(c => c.symbol?.type === ALParser.RPAREN);

    const func = path.call(print, 'children', 0);
    const lParen = path.call(print, 'children', 1);
    const rParen = path.call(print, 'children', rparenIdx);
    const expression = [];

    for (let i = 2; i < rparenIdx; i++)
        expression.push(path.call(print, 'children', i));

    return [func, lParen, ...expression, rParen];
}

function printRelationFilterExpression(path, options, print) {
    return join(" ", path.map(print, 'children'));
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

function printSubPageLinkProperty(path, options, print) {
    // Grammar: SUBPAGELINK EQUAL subpageLinkExpression
    const keyword = path.call(print, 'children', 0);
    const equalSign = path.call(print, 'children', 1);
    const expression = path.call(print, 'children', 2);

    return [keyword, " ", equalSign, group(indent([line, expression]))];
}

function printPageLinkExpression(path, options, print) {
    // Grammar: subpageLinkFilter (COMMA subpageLinkFilter)*;
    const children = path.node.children;
    const filters = [];
    for (let i = 0; i < children.length; i += 2) {
        const filter = [];
        filter.push(path.call(print, 'children', i));

        if (children.length > i + 1 && children[i + 1].symbol?.type === ALParser.COMMA) {
            filter.push([path.call(print, 'children', i + 1), line]);
        }
        filters.push(filter);
    }

    return filters;
}

function pintTableViewExpression(path, options, print) {
    // Grammar: sourceTableSortingExpr? sourceTableOrderExpr? tableRelationWhereExpression?;
    return group(indent(join(line, path.map(print, 'children'))));
}

//#endregion Page functions

//#region  Page extension functions

function printPageExtensionObject(path, options, print) {
    return printALObject(path, options, print, ALParser.PAGEEXTENSION);
}

function printPageExtLayoutDefinition(path, options, print) {
    // Grammar: LAYOUT LBRACE (pageExtLayoutModification | pageExtElementModification)* RBRACE
    const children = path.node.children;
    const lBraceIdx = children.findIndex(c => c.symbol?.type === ALParser.LBRACE);
    const rBraceIdx = children.findIndex(c => c.symbol?.type === ALParser.RBRACE);

    const layoutElements = [];
    for (let i = lBraceIdx + 1; i < rBraceIdx; i++) {
        layoutElements.push(path.call(print, "children", i));
    }

    const layout = [];
    layout.push(path.call(print, "children", 0), hardline, path.call(print, "children", lBraceIdx));

    if (layoutElements.length > 0) {
        layout.push(indent([hardline, join(hardline, layoutElements)]));
    }
    layout.push(hardline, path.call(print, "children", rBraceIdx));

    return layout;
}

function printPageExtLayoutModificationBlock(path, options, print) {
    // Grammar: pageExtLayoutMod LPAREN identifier RPAREN LBRACE layoutElements RBRACE
    const children = path.node.children;
    const lBraceIdx = children.findIndex(c => c.symbol?.type === ALParser.LBRACE);

    const anchor = [];
    for (let i = 0; i < lBraceIdx; i++) {
        anchor.push(path.call(print, 'children', i));
    }

    const layoutElements = path.call(print, 'children', lBraceIdx + 1);
    const lBrace = path.call(print, 'children', lBraceIdx);
    const rBrace = path.call(print, 'children', children.length - 1);

    return [anchor, hardline, lBrace, indent([hardline, layoutElements]), hardline, rBrace];
}

function printPageExtElementModificationBlock(path, options, print) {
    // Grammar: MODIFY LPAREN identifier RPAREN LBRACE (pageFieldPropertiesList | actionPropertiesList | triggersList)* RBRACE
    const children = path.node.children;
    const lBraceIdx = children.findIndex(c => c.symbol?.type === ALParser.LBRACE);

    const anchor = [];
    for (let i = 0; i < lBraceIdx; i++) {
        anchor.push(path.call(print, 'children', i));
    }

    const layoutElements = [];
    for (let i = lBraceIdx + 1; i < children.length - 1; i++) {
        layoutElements.push(path.call(print, 'children', i));
    }
    path.call(print, 'children', lBraceIdx + 1);
    const lBrace = path.call(print, 'children', lBraceIdx);
    const rBrace = path.call(print, 'children', children.length - 1);

    return [...anchor, hardline, lBrace, indent([hardline, join(hardline, layoutElements)]), hardline, rBrace];
}

function printPageExtensionActions(path, options, print) {
    // Grammar: ACTIONS LBRACE (pageExtActionModification | pageExtActionPropModification)* RBRACE
    const children = path.node.children;
    const lBraceIdx = children.findIndex(c => c.symbol?.type === ALParser.LBRACE);
    const rBraceIdx = children.findIndex(c => c.symbol?.type === ALParser.RBRACE);
    const mods = [];

    for (let i = lBraceIdx + 1; i < rBraceIdx; i++)
        mods.push(path.call(print, "children", i));

    const result = [];
    result.push(path.call(print, "children", 0), hardline, path.call(print, "children", lBraceIdx));

    if (mods.length > 0) {
        result.push(indent([hardline, join(hardline, mods)]));
    }
    result.push(hardline, path.call(print, "children", rBraceIdx));

    return result;
}

function printPageExtElementRelocation(path, options, print) {
    // Grammar: pageExtElementRelocationKeyword LPAREN identifier SEMICOLON identifiersList RPAREN;
    const keyword = path.call(print, 'children', 0);
    const lparen = path.call(print, 'children', 1);
    const identifier = path.call(print, 'children', 2);
    const semicolon = path.call(print, 'children', 3);
    const idList = path.call(print, 'children', 4);
    const rparen = path.call(print, 'children', 5);
    return [keyword, lparen, identifier, semicolon, " ", idList, rparen];
}

//#endregion Page extension functions

//#region Interface functions

function printInterfaceObject(path, options, print) {
    const children = path.node.children;
    // Grammar: INTERFACE identifier (EXTENDS identifierWithNamespace)? LBRACE interfacePropertiesList? procedureDeclaration* RBRACE
    const keyword = path.call(print, 'children', 0);
    const objectName = path.call(print, 'children', 1);

    let properties = [];
    const propsListIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_interfacePropertiesList);
    if (propsListIdx > -1) {
        properties = path.call(print, 'children', propsListIdx);
    }

    const procListStart = children.findIndex(c => c.ruleIndex === ALParser.RULE_procedureDeclaration);
    const procListEnd = children.length - 1;
    const procDeclDocs = [];
    if (procListStart > -1) {
        for (let i = procListStart; i < procListEnd; i++) {
            procDeclDocs.push(path.call(print, 'children', i));
        }
    }

    const declaration = [keyword, " ", objectName];
    const extendsIdx = children.findIndex(c => c.symbol?.type === ALParser.EXTENDS);
    if (extendsIdx > -1) {
        declaration.push([" ", path.call(print, 'children', extendsIdx)]);
        declaration.push([" ", path.call(print, 'children', extendsIdx + 1)]);
    }

    const body = [];
    if (properties.length > 0) {
        body.push(hardline, ...properties);
    }
    if (procDeclDocs.length > 0) {
        if (body.length > 0) {
            body.push(hardline);
        }
        body.push(hardline, join([hardline], procDeclDocs));
    }

    return [...declaration, hardline, "{", indent([...body]), hardline, "}"];
}

function printInterfacePropertiesList(path, options, print) {
    return join(hardline, path.map(print, 'children'));
}

function printProcedureDeclaration(path, options, print) {
    // Grammar: PROCEDURE identifier LPAREN parameterList? RPAREN procedureReturnType? SEMICOLON?

    const children = path.node.children;
    const rParenIdx = children.findIndex(c => c.symbol?.type === ALParser.RPAREN);
    const returnTypeIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_procedureReturnType);

    const name = path.call(print, 'children', 1);
    const paramDoc = rParenIdx > 3 ? path.call(print, 'children', 3) : "";

    let signature =
        [path.call(print, 'children', 0), " ", name, path.call(print, 'children', 2), softline, paramDoc, path.call(print, 'children', rParenIdx)];

    if (returnTypeIdx) {
        signature = [...signature, path.call(print, 'children', returnTypeIdx)];
    }

    const semicolon =
        children[children.length - 1].symbol?.type === ALParser.SEMICOLON
            ? path.call(print, 'children', children.length - 1)
            : ";";
    signature = group(indent([...signature, semicolon]));

    return signature;
}

function printInterfacePropertyItem(path, options, print) {
    // Grammar: interfaceProperty SEMICOLON
    return path.map(print, 'children');
}

//#endregion Interface functions

//#region Codeunit functions

function printCodeunitObject(path, options, print) {
    return printALObject(path, options, print, ALParser.CODEUNIT);
}

function printImplementsInterfacesList(path, options, print) {
    // Grammar: IMPLEMENTS identifierWithNamespace (COMMA identifierWithNamespace)*
    const children = path.node.children;
    const implementsKeyword = path.call(print, 'children', 0);
    const interfaces = [];
    for (let i = 1; i < children.length; i += 2) {
        interfaces.push(path.call(print, 'children', i));  // Name of the implemented interface

        if (i < children.length - 1) {
            interfaces.push([path.call(print, 'children', i + 1), " "]);  // Comma
        }
    }

    return [implementsKeyword, " ", interfaces];
}

//#endregion Codeunit functions

//#region Enum functions

function printEnumObject(path, options, print) {
    return printALObject(path, options, print, ALParser.ENUM);
}

function printEnumValuesList(path, options, print) {
    return join(hardline, path.map(print, 'children'));
}

function printEnumValueDefinition(path, options, print) {
    // Grammar: VALUE LPAREN INTEGER_LITERAL SEMICOLON identifier RPAREN LBRACE enumValuePropertiesList? RBRACE
    const children = path.node.children;
    const semicolonIdx = children.findIndex(c => c.symbol?.type === ALParser.SEMICOLON);
    const lBraceIdx = children.findIndex(c => c.symbol?.type === ALParser.LBRACE);
    const rBraceIdx = children.findIndex(c => c.symbol?.type === ALParser.RBRACE);

    const decl = [];
    for (let i = 0; i < semicolonIdx; i++) {
        decl.push(path.call(print, 'children', i));
    }

    decl.push(path.call(print, 'children', semicolonIdx));
    decl.push(" ");

    for (let i = semicolonIdx + 1; i < lBraceIdx; i++) {
        decl.push(path.call(print, 'children', i));
    }

    const props = [];
    if (rBraceIdx > lBraceIdx + 1) {
        props.push(path.call(print, 'children', lBraceIdx + 1));
    }

    const result = [];
    result.push(
        decl,
        hardline,
        path.call(print, 'children', lBraceIdx));

    if (props.length > 0) {
        result.push(indent([hardline, props]));
    }

    result.push(
        hardline,
        path.call(print, 'children', rBraceIdx)
    );

    return result;
}

function printImplementationProperty(path, options, print) {
    // Grammar: IMPLEMENTATION EQUAL identifierWithNamespace EQUAL identifierWithNamespace
    return join(" ", path.map(print, 'children'));
}

//#endregion Enum functions

//#region Enum extension functions

function printEnumExtensionObject(path, options, print) {
    return printALObject(path, options, print, ALParser.ENUMEXTENSION);
}

//#endregion Enum extension functions

//#region  Query functions

function printQueryObject(path, options, print) {
    return printALObject(path, options, print, ALParser.QUERY);
}

function printQueryDataItemElementsList(path, options, print) {
    return join(hardline, path.map(print, 'children'));
}

function printQueryElements(path, options, print) {
    // Grammar: ELEMENTS LBRACE queryDataItemDefinition* RBRACE;
    const keyword = path.call(print, 'children', 0);
    const lbrace = path.call(print, 'children', 1);
    const rbrace = path.call(print, 'children', path.node.children.length - 1);

    const dataItems = [];
    for (let i = 2; i < path.node.children.length - 1; i++) {
        dataItems.push(path.call(print, 'children', i));
    }

    return [keyword, hardline, lbrace, indent([hardline, join(hardline, dataItems)]), hardline, rbrace];
}

function printQueryDataItemDefinition(path, options, print) {
    // Grammar: DATAITEM LPAREN identifier SEMICOLON expression RPAREN LBRACE queryPropertiesList? queryDataItemElementsList? RBRACE;
    const children = path.node.children;
    const keyword = path.call(print, 'children', 0);
    const lparen = path.call(print, 'children', 1);
    const dataItemId = path.call(print, 'children', 2);
    const semicolon = path.call(print, 'children', 3);
    const refExpression = path.call(print, 'children', 4);
    const rparen = path.call(print, 'children', 5);
    const lbrace = path.call(print, 'children', 6);
    const rbrace = path.call(print, 'children', children.length - 1);

    const content = [];
    const propsIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_queryPropertiesList);
    if (propsIdx > -1)
        content.push(path.call(print, 'children', propsIdx));

    const elementsIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_queryDataItemElementsList);
    if (elementsIdx > -1) {
        if (content.length > 0)
            content.push(hardline, hardline);
        content.push(path.call(print, 'children', elementsIdx));
    }

    const dataItem = [keyword, lparen, dataItemId, semicolon, " ", refExpression, rparen, hardline, lbrace];
    if (content.length > 0)
        dataItem.push(indent([hardline, ...content]));

    dataItem.push(hardline, rbrace);
    return dataItem;
}

function printDataItemLinkProperty(path, options, print) {
    // Grammar: DATAITEMLINK EQUAL identifier EQUAL tableFieldReference (COMMA identifier EQUAL tableFieldReference)*;

    const propertyName = path.call(print, 'children', 0);
    const equalSign = path.call(print, 'children', 1);

    const colRefs = [];
    for (let i = 2; i <= path.node.children.length - 3; i += 4) {
        const colName = path.call(print, 'children', i);
        const refEqualSign = path.call(print, 'children', i + 1);
        const referencedColumn = path.call(print, 'children', i + 2);
        colRefs.push(colName, " ", refEqualSign, " ", referencedColumn);

        if (i < path.node.children.length - 3) {
            colRefs.push(path.call(print, 'children', i + 3), line);  // Comma
        }
    }

    return [propertyName, " ", equalSign, group(indent([line, ...colRefs]))];
}

function printQueryColumnDefinition(path, options, print) {
    // Grammar: COLUMN LPAREN identifier (SEMICOLON expression)? RPAREN LBRACE queryColumnPropertiesList? RBRACE;
    const children = path.node.children;
    const keyword = path.call(print, 'children', 0);
    const lparen = path.call(print, 'children', 1);
    const colId = path.call(print, 'children', 2);

    const semicolonIdx = children.findIndex(c => c.symbol?.type === ALParser.SEMICOLON);
    const refExpIdx = semicolonIdx > -1 ? semicolonIdx + 1 : -1;
    const rparenIdx = semicolonIdx > -1 ? 5 : 3;
    const lbraceIdx = rparenIdx + 1;
    const propsListIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_queryColumnPropertiesList);
    const rbraceIdx = children.length - 1;

    const semicolon = semicolonIdx > -1 ? path.call(print, 'children', semicolonIdx) : [];
    const refExpression = refExpIdx > -1 ? path.call(print, 'children', refExpIdx) : [];
    const rparen = path.call(print, 'children', rparenIdx);
    const lbrace = path.call(print, 'children', lbraceIdx);
    const rbrace = path.call(print, 'children', rbraceIdx);
    const properties =
        propsListIdx > -1
            ? path.call(print, 'children', propsListIdx)
            : [];

    const content = [keyword, lparen, colId];
    if (semicolonIdx > -1)
        content.push(semicolon, " ", refExpression);

    content.push(rparen, hardline, lbrace);
    if (properties.length > 0)
        content.push(indent([hardline, ...properties]));

    content.push(hardline, rbrace);
    return content;
}

function printOrderByProperty(path, options, print) {
    // Grammar: ORDERBY EQUAL IDENTIFIER LPAREN identifier RPAREN (COMMA IDENTIFIER LPAREN identifier RPAREN)*;
    const keyword = path.call(print, 'children', 0);
    const equalSign = path.call(print, 'children', 1);
    const expression = [];

    for (let i = 2; i < path.node.children.length; i += 5) {
        expression.push(path.call(print, 'children', i));  // Order direction: ascending / descending
        expression.push(path.call(print, 'children', i + 1));  // Left parenthesis
        expression.push(path.call(print, 'children', i + 2)); // Ordergin column name
        expression.push(path.call(print, 'children', i + 3));  // Right parenthesis

        if (i < path.node.children.length - 4) {
            expression.push([path.call(print, 'children', i + 4), " "]);  // Comma separating the next ordering clause
        }
    }

    return [keyword, " ", equalSign, " ", ...expression];
}

//#endregion Query functions

//#region Report functions

function printReportObject(path, options, print) {
    return printALObject(path, options, print, ALParser.REPORT);
}

function printReportDatasetDefinition(path, options, print) {
    // Grammar: DATASET LBRACE reportDataItemDefinition* RBRACE;
    const children = path.node.children;
    const keyword = path.call(print, 'children', 0);
    const lbrace = path.call(print, 'children', 1);
    const rbrace = path.call(print, 'children', children.length - 1);

    const dataItems = [];
    for (let i = 2; i < children.length - 1; i++) {
        dataItems.push(path.call(print, 'children', i));
    }

    const dataset = [keyword, hardline, lbrace];
    if (dataItems.length > 0)
        dataset.push(indent([hardline, ...dataItems]));

    dataset.push(hardline, rbrace);
    return dataset;
}

function printReportDataItemDefinition(path, options, print) {
    // Grammar: DATAITEM LPAREN identifier SEMICOLON expression RPAREN LBRACE reportDataItemPropertiesList? reportDataItemElementsList? triggersList? RBRACE;
    const children = path.node.children;
    const keyword = path.call(print, 'children', 0);
    const lparen = path.call(print, 'children', 1);
    const dataItemName = path.call(print, 'children', 2);
    const semicolon = path.call(print, 'children', 3);
    const sourceExpression = path.call(print, 'children', 4);
    const rparen = path.call(print, 'children', 5);
    const lbrace = path.call(print, 'children', 6);
    const rbrace = path.call(print, 'children', children.length - 1);

    const elements = [];
    for (let i = 7; i < children.length - 1; i++) {  // All elements between lbrace and rbrace
        elements.push(path.call(print, 'children', i));
    }

    const dataItem = [keyword, lparen, dataItemName, semicolon, " ", sourceExpression, rparen, hardline, lbrace];
    if (elements.length > 0) {
        dataItem.push(indent([hardline, join([hardline, hardline], elements)]));
    }

    dataItem.push(hardline, rbrace);
    return dataItem;
}

function printReportDataItemElementsList(path, options, print) {
    return join(hardline, path.map(print, 'children'));
}

function printReportRequestPage(path, options, print) {
    // Grammar: REQUESTPAGE LBRACE pagePropertiesList? layoutDefinition? (triggersList | variablesList | proceduresList | actionsDefinition)* RBRACE;

    const children = path.node.children;

    const elements = [];
    for (let i = 2; i < children.length - 1; i++) {
        const el = path.call(print, 'children', i);
        if (el !== "")
            elements.push(el);
    }
    if (options.removeEmptyElements && elements.length === 0)
        return "";

    const keyword = path.call(print, 'children', 0);
    const lbrace = path.call(print, 'children', 1);
    const rbrace = path.call(print, 'children', children.length - 1);

    const pageDocs = [keyword, hardline, lbrace];
    if (elements.length > 0) {
        pageDocs.push(indent([hardline, join([hardline, hardline], elements)]));
    }

    pageDocs.push(hardline, rbrace);
    return pageDocs;
}

function printRenderingOptions(path, options, print) {
    // Grammar: RENDERING LBRACE renderingLayout* RBRACE
    const children = path.node.children;
    const keyword = path.call(print, 'children', 0);
    const lbrace = path.call(print, 'children', 1);
    const rbrace = path.call(print, 'children', children.length - 1);

    const layouts = [];
    for (let i = 2; i < children.length - 1; i++) {
        layouts.push(path.call(print, 'children', i));
    }

    const renderingDocs = [keyword, hardline, lbrace];
    if (layouts.length > 0) {
        renderingDocs.push(indent([hardline, join(hardline, layouts)]));
    }

    renderingDocs.push(hardline, rbrace);
    return renderingDocs;
}

function printRenderingLayout(path, options, print) {
    // Grammar: LAYOUT LPAREN identifier RPAREN LBRACE reportDataItemPropertiesList RBRACE
    const keyword = path.call(print, 'children', 0);
    const lparen = path.call(print, 'children', 1);
    const layoutName = path.call(print, 'children', 2);
    const rparen = path.call(print, 'children', 3);
    const lbrace = path.call(print, 'children', 4);
    const props = path.call(print, 'children', 5);
    const rbrace = path.call(print, 'children', 6);

    const body = props
        ? [hardline, lbrace, indent([hardline, props]), hardline, rbrace]
        : [hardline, lbrace, hardline, rbrace];

    return [keyword, lparen, layoutName, rparen, ...body];
}

function printLabelsDefinition(path, options, print) {
    // Grammar: LABELS LBRACE labelDefinition* RBRACE
    const children = path.node.children;
    const keyword = path.call(print, 'children', 0);
    const lbrace = path.call(print, 'children', 1);
    const rbrace = path.call(print, 'children', children.length - 1);

    const labels = [];
    for (let i = 2; i < children.length - 1; i++) {
        labels.push(path.call(print, 'children', i));
    }

    const labelsDocs = [keyword, hardline, lbrace];
    if (labels.length > 0) {
        labelsDocs.push(indent([hardline, join(hardline, labels)]));
    }

    labelsDocs.push(hardline, rbrace);
    return labelsDocs;
}

function printLabelDefinition(path, options, print) {
    // Grammar: identifier EQUAL STRING_LITERAL (COMMA identifier EQUAL literal)* SEMICOLON
    const children = path.node.children;
    const labelName = path.call(print, 'children', 0);
    const equal = path.call(print, 'children', 1);
    const labelValue = path.call(print, 'children', 2);

    const parts = [labelName, " ", equal, " ", labelValue];

    // Add additional identifier = value pairs if present
    for (let i = 3; i < children.length - 1; i += 4) {
        if (children[i].symbol?.type === ALParser.COMMA) {
            parts.push(path.call(print, 'children', i)); // comma
            parts.push(line);
            parts.push(path.call(print, 'children', i + 1)); // identifier
            parts.push(" ");
            parts.push(path.call(print, 'children', i + 2)); // equal
            parts.push(" ");
            parts.push(path.call(print, 'children', i + 3)); // value
        }
    }

    parts.push(path.call(print, 'children', children.length - 1)); // semicolon
    return group(indent(parts));
}

//#endregion Report functions

//#region Code statements

function printNamespaceDeclaration(path, options, print) {
    // Grammar: NAMESPACE namespaceName SEMICOLON;
    return [path.call(print, 'children', 0), " ", ...path.call(print, 'children', 1), path.call(print, 'children', 2)];
}

function printUsingRefList(path, options, print) {
    return join(hardline, path.map(print, 'children'));
}

function printUsingReference(path, options, print) {
    // Grammar: USING namespaceName SEMICOLON;
    return [path.call(print, 'children', 0), " ", ...path.call(print, 'children', 1), path.call(print, 'children', 2)];
}

function printVariableDeclaration(path, options, print) {
    // Grammar: variableAttributesList? identifier (COMMA identifier)* COLON dataType SEMICOLON
    const children = path.node.children;
    const colonIdx = children.findIndex(c => c.symbol?.type === ALParser.COLON);
    const attrListIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_variableAttributesList);
    const attributes = attrListIdx > -1 ? [path.call(print, 'children', attrListIdx), hardline] : [];

    const varNames = [];
    for (let varIdx = attrListIdx + 1; varIdx < colonIdx; varIdx += 2)
        varNames.push(path.call(print, 'children', varIdx));

    const type = path.call(print, 'children', colonIdx + 1);
    return [
        ...attributes,
        join(", ", varNames),
        path.call(print, 'children', colonIdx),
        " ",
        type,
        path.call(print, 'children', children.length - 1)
    ];
}

function printVariablesList(path, options, print) {
    // Grammar: PROTECTED? VAR variableDeclaration+;
    const children = path.node.children;
    const varIdx = children.findIndex(c => c.symbol?.type === ALParser.VAR);

    const keywords = [];
    for (let i = 0; i <= varIdx; i++) {
        keywords.push(path.call(print, 'children', i));
    }

    const varDocs = [];
    for (let i = varIdx + 1; i < children.length; i++) {
        varDocs.push(path.call(print, 'children', i));
    }

    return varDocs.length > 0
        ? [join(" ", keywords), indent([hardline, join(hardline, varDocs)])]
        : [];
}

function printTriggersList(path, options, print) {
    // Grammar: triggerDefinition+
    return join([hardline, hardline], path.map(print, 'children'));
}

function printTriggerDefinition(path, options, print) {
    // Grammar: TRIGGER IDENTIFIER LPAREN parameterList? RPAREN procedureReturnType? variablesList? BEGIN statementList? END SEMICOLON
    const children = path.node.children;
    const paramsListIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_parameterList);
    const beginIdx = children.findIndex(c => c.symbol?.type === ALParser.BEGIN);
    const endIdx = children.findIndex(c => c.symbol?.type === ALParser.END);
    const returnTypeIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_procedureReturnType);
    const varsIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_variablesList);
    const statementListId = endIdx > beginIdx + 1 ? beginIdx + 1 : -1;

    const name = path.call(print, 'children', 1);

    const paramDoc = paramsListIdx > -1 ? path.call(print, 'children', paramsListIdx) : "";
    const returnType = returnTypeIdx > -1 ? path.call(print, 'children', returnTypeIdx) : [];

    // variablesList: any rule context between RPAREN and BEGIN
    const varDocs = path.call(print, 'children', varsIdx);

    const signature = ["trigger ", name, "(", paramDoc, ")"];
    if (returnType.length > 0) {
        signature.push(...returnType);
    }

    const vars = varDocs.length > 0 ? [hardline, ...varDocs] : [];
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
    const varListIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_variablesList);
    const lParenIdx = children.findIndex(c => c.symbol?.type === ALParser.LPAREN);
    const rParenIdx = children.findIndex(c => c.symbol?.type === ALParser.RPAREN);
    const returnTypeIdx = children.findIndex(c => c.ruleIndex === ALParser.RULE_procedureReturnType);
    const beginIdx = children.findIndex(c => c.symbol?.type === ALParser.BEGIN);
    const endIdx = children.findIndex(c => c.symbol?.type === ALParser.END);
    const statementListId = endIdx > beginIdx + 1 ? beginIdx + 1 : -1;

    const proc = path.call(print, 'children', procKeywordIdx);
    const begin = path.call(print, 'children', beginIdx);
    const end = path.call(print, 'children', endIdx);

    let attributes = [];
    if (children[0].ruleIndex === ALParser.RULE_procedureAttributesList) {
        attributes = [...path.call(print, "children", 0), hardline];
    }

    const name = path.call(print, 'children', procKeywordIdx + 1);

    // parameterList is at index procKeywordIdx + 3 only when RPAREN is not immediately after LPAREN (index procKeywordIdx + 2)
    const paramDoc = rParenIdx > procKeywordIdx + 3 ? path.call(print, 'children', procKeywordIdx + 3) : "";

    // variablesList: any rule context between RPAREN and BEGIN
    const varDocs = varListIdx > 0 ? path.call(print, 'children', varListIdx) : [];

    let signature = [proc, " ", name, path.call(print, 'children', lParenIdx), group(indent([softline, paramDoc])), path.call(print, 'children', rParenIdx)];

    // If the procedure return type is not defined, returnTypeIdx = -1
    let returnType = [];
    if (returnTypeIdx > 0) {
        returnType = path.call(print, 'children', returnTypeIdx);
    }

    let accessModifier = [];
    if (accessModifierIdx >= 0) {
        accessModifier = [path.call(print, 'children', accessModifierIdx), " "];
    }

    const vars = varDocs.length > 0 ? [hardline, varDocs] : [];
    const body = statementListId > 0
        ? [hardline, begin, indent([hardline, path.call(print, 'children', statementListId)]), hardline, end, ";"]
        : [hardline, begin, hardline, end, ";"];

    return [...attributes, ...accessModifier, ...signature, ...returnType, ...vars, ...body];
}

function printProcedureAttributes(path, options, print) {
    return join(hardline, path.map(print, 'children'));
}

function printProcedureAttribute(path, options, print) {
    // Grammar: LBRACKET expression RBRACKET
    return path.map(() => print(path, { suppressLineBreaks: options.noLineBreaksInAttributes || false }), 'children');
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
    // Grammar: identifier? COLON dataType;
    const elements = [];
    let nextElNo = 0;

    if (path.node.children[0].symbol?.type !== ALParser.COLON) {
        elements.push(" ", path.call(print, 'children', 0));
        nextElNo += 1;
    }

    elements.push(path.call(print, 'children', nextElNo), " ");  // Colon
    elements.push(path.call(print, 'children', nextElNo + 1));

    return elements;
}

function printStatementList(path, options, print) {
    const children = path.node.children;
    const stmtDocs = [];
    const paragraphs = [];
    for (let i = 0; i < children.length; i++) {
        let doc = path.call(print, 'children', i);
        if (i === children.length - 1 && children[i].ruleIndex === ALParser.RULE_statement) {
            // The last statement in the list can end without the terminating semicolon. Printer will add it.
            // To determine whether the semicolon is present or not, we check the parser rule for the node.
            // Elements of the statement list can be either "statment" or "statementWithSeparator".
            doc = [doc, ";"];
        }
        paragraphs.push(isParagraphStatement(path.node.children[i]));

        i > 0 && (paragraphs[i] || paragraphs[i - 1])
            ? stmtDocs.push([hardline, doc])
            : stmtDocs.push(doc);
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
    // Grammar: IF expression THEN statement elseStatement?
    const children = path.node.children;
    const ifKeyword = path.call(print, 'children', 0);
    const condition = path.call(print, 'children', 1);  // expression
    const thenKeyword = path.call(print, 'children', 2);
    let thenStmt = path.call(print, 'children', 3);   // statement

    // Statement following "then". If it's a compound statement "begin..end", do not insert a hardline before the statement.
    if (children[3]?.children[0]?.ruleIndex === ALParser.RULE_compoundBlock) {
        thenStmt = [" ", thenStmt];
    }
    else if (thenStmt.length > 0) {
        // If the statement body is missing ("if condition then;"), do not insert the line break: the terminating semicolon sticks to the "then" keyword.
        thenStmt = indent([hardline, thenStmt]);
    }

    const ifPart = [group([ifKeyword, " ", condition, line, thenKeyword]), thenStmt];

    // ELSE and its statement are optional — present when children.length > 4
    if (children.length > 4) {
        let elseStmt = path.call(print, 'children', 4);
        return [ifPart, hardline, elseStmt];
    }

    return ifPart;
}

function printElseStatement(path, options, print) {
    // Grammar: ELSE statementWithSeparator;
    // Similar to "then begin" in the if statement above, "else begin" must not break the line.
    const elseKeyword = path.call(print, 'children', 0);
    let elseStmt = path.call(print, 'children', 1);
    if (isSingleCompundStatement(path.node.children[1]?.children[0])) {
        elseStmt = [" ", elseStmt];
    }
    else {
        elseStmt = indent([hardline, elseStmt]);
    }

    return [elseKeyword, elseStmt];
}

function printForLoopStatement(path, options, print) {
    // Grammar: FOR identifier ASSIGN expression TO expression DO statement
    //        | FOR identifier ASSIGN expression DOWNTO expression DO statement;

    const children = path.node.children;
    const iterator = path.call(print, 'children', 1);
    const initialization = path.call(print, 'children', 3);
    const increment = path.call(print, 'children', 4);  // "to" or "downto" keyword
    const condition = path.call(print, 'children', 5);
    let statement = path.call(print, 'children', 7);

    // Statement executed inside the loop. If it's a compond statement "begin..end", do not insert a hardline before the statement.
    if (children[7].children && children[7].children[0].ruleIndex === ALParser.RULE_compoundBlock) {
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

    return ["repeat", indent([hardline, statementList]), [hardline, "until ", condition]];
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
    // Grammar: CASE expression OF caseBranch+ (elseStatement SEMICOLON?)? END
    const children = path.node.children;
    const caseKeyword = path.call(print, 'children', 0);
    const ofKeyword = path.call(print, 'children', 2);
    const endKeyword = path.call(print, 'children', path.node.children.length - 1);

    const elseIdx = path.node.children.findIndex(c => c.ruleIndex === ALParser.RULE_caseElseStatement);
    let elseBranch = elseIdx > -1 ? path.call(print, 'children', elseIdx) : [];

    const switchExpr = path.call(print, 'children', 1);
    const branches = [];

    const lastBranchIdx = elseIdx > -1 ? elseIdx - 1 : children.length - 2;
    for (let i = 3; i <= lastBranchIdx; i++) {
        branches.push(path.call(print, 'children', i));
    }
    if (elseIdx > -1) {
        branches.push(elseBranch);
    }

    return [caseKeyword, " ", switchExpr, " ", ofKeyword, indent([hardline, join(hardline, branches)]), hardline, endKeyword];
}

function printCaseBranch(path, options, print) {
    // Grammar: expression ((COMMA | RANGE_OP) expression)* COLON (statementWithSeparator | SEMICOLON);

    const colonIdx = path.node.children.findIndex(c => c.symbol?.type === ALParser.COLON);

    const conditions = [];
    let i = 0;
    while (i < colonIdx) {
        // for (let i = 0; i < colonIdx; i += 2) {
        let condition = path.call(print, 'children', i);
        if (i < colonIdx - 1) {
            condition = [condition, path.call(print, 'children', i + 1)];  // Print the comma or range operator separating the conditions
        }

        if (path.node.children[i + 1].symbol.type === ALParser.RANGE_OP) {
            i += 2;
            condition.push(path.call(print, 'children', i));
            if (i < colonIdx - 1) {
                condition = [condition, path.call(print, 'children', i + 1)];
            }
        }
        i += 2;

        conditions.push(condition);
    }

    const colon = path.call(print, 'children', colonIdx);
    const statement = path.call(print, 'children', colonIdx + 1);
    return [join(hardline, conditions), colon, indent([hardline, statement])];
}

function printProcedureCall(path, options, print, args) {
    // Grammar: identifier (DOT identifier)* LPAREN argumentList? RPAREN
    const children = path.node.children;
    const lParenIdx = children.findIndex(c => c.symbol?.type === ALParser.LPAREN);
    const rParenIdx = children.findIndex(c => c.symbol?.type === ALParser.RPAREN);

    // Name chain before LPAREN: joined without spaces to produce e.g. "Foo.Bar.Baz"
    const nameDocs = [];
    for (let i = 0; i < lParenIdx; i++) {
        nameDocs.push(path.call(print, 'children', i));
    }

    // argumentList is present when there is a child between LPAREN and RPAREN
    const argDoc = rParenIdx > lParenIdx + 1 ? path.call(() => print(path, args), 'children', lParenIdx + 1) : "";

    const result = [...nameDocs, path.call(print, 'children', lParenIdx)];
    if (argDoc.length > 0 && !args?.suppressLineBreaks)
        result.push(softline);

    result.push(argDoc, path.call(print, 'children', rParenIdx));
    return group(indent(result));
}

function printArgumentList(path, options, print, args) {
    // Grammar: expression (COMMA expression)*
    const children = path.node.children;
    const argDocs = [];
    for (let i = 0; i < children.length; i += 2) {
        const argument = path.call(print, 'children', i);
        const comma = i < children.length - 2 ? [path.call(print, 'children', i + 1), args?.suppressLineBreaks ? " " : line] : [];
        argDocs.push([...argument, ...comma]);
    }

    return argDocs;
}

function printUnaryExpression(path, options, print, args) {
    return path.map(() => print(path, args), 'children');
}

function printUnaryNotExpression(path, options, print) {
    return join(" ", path.map(print, 'children'));
}

function printBinaryExpression(path, options, print, args) {
    // All binary expressions follow the structure: "operand operator operand".
    // If the line does not fit in the print width, the second operand will be moved to the next line with indent.
    const printWithArguments = () => print(path, args);

    return path.node?.children?.length > 1
        ? group(indent([path.call(printWithArguments, 'children', 0), " ", path.call(printWithArguments, 'children', 1), line, path.call(printWithArguments, 'children', 2)]))
        : join(" ", path.map(printWithArguments, 'children'));
}

function printMultipartExpression(path, options, print, args) {
    // Grammar: unaryExpression ((MULTIPLY | DIVIDE | DIV | MOD) unaryExpression)*;
    const children = path.node.children;

    const parts = [];
    for (let i = 0; i < children.length; i += 2) {
        const operand = path.call(() => print(path, args), 'children', i);
        parts.length === 0 ? parts.push(operand) : parts.push([line, operand]);
        if (i + 1 < children.length) {
            parts.push([" ", path.call(() => print(path, args), 'children', i + 1)]);
        }
    }

    return children.length > 1 ? group(indent(parts)) : parts;
}

function printLogicalInExpression(path, options, print) {
    // Grammar: logicalAndExpression IN LBRACKET logicalAndExpression ((COMMA|RANGE_OP) logicalAndExpression)* RBRACKET;
    const children = path.node.children;
    const components = [];
    components.push(path.call(print, 'children', 0));  // Left expression
    components.push([" ", path.call(print, 'children', 1), " "]);  // "in" keyword
    components.push(path.call(print, 'children', 2));  // Left bracket
    components.push(path.call(print, 'children', 3));  // First condition - always present

    for (let i = 4; i < children.length - 1; i += 2) {
        components.push(path.call(print, 'children', i));  // Operator - comma or range
        if (children[i].symbol.type === ALParser.COMMA) {
            components.push(" ");
        }
        components.push(path.call(print, 'children', i + 1));  // Condition following the operator
    }

    components.push(path.call(print, 'children', children.length - 1));  // Right bracket
    return components;
}

function printCompoundBlock(path, options, print) {
    // Grammar: BEGIN statementList? END
    const statementListIdx = path.node.children.findIndex(c => c.ruleIndex === ALParser.RULE_statementList);
    const endIdx = path.node.children.findIndex(c => c.symbol?.type === ALParser.END);

    const beginKeyword = path.call(print, 'children', 0);
    const statementList = statementListIdx > -1
        ? path.call(print, 'children', 1)
        : [];
    const endKeyword = path.call(print, 'children', endIdx);

    const compoundBlock = [];
    compoundBlock.push(beginKeyword);
    if (statementListIdx > -1) {
        compoundBlock.push(indent([hardline, statementList]));
    }
    compoundBlock.push([hardline, endKeyword]);
    return compoundBlock;
}

function printALObject(path, options, print, objectType) {
    const children = path.node.children;
    // Grammar is similar for most objects.
    // For example, table grammar: TABLE INTEGER_LITERAL identifier LBRACE
    //              tablePropertyList? variablesList? tableFieldsList? tableKeysSection?
    //              variablesList? triggersList? variablesList? proceduresList? variablesList?
    //          RBRACE

    // Codeunit and Enum objects can implement interfaces and therefore additonally have an optional IMPLEMENTS block
    // ENUM INTEGER_LITERAL IDENTIFIER (IMPLEMENTS identifierWithNamespace)? LBRACE enumPropertiesList? enumValuesList? RBRACE

    // Optional prefix rules are omitted from children when absent, so find the object type token (TABLE, PAGE, CODEUNIT, etc) dynamically
    const objectIdx = children.findIndex(c => c.symbol?.type === objectType);
    if (objectIdx === -1) return "";

    const lBraceIdx = children.findIndex(c => c.symbol?.type === ALParser.LBRACE);
    const rBraceIdx = children.findIndex(c => c.symbol?.type === ALParser.RBRACE);

    const objectDeclaration = [];
    for (let i = 0; i < lBraceIdx; i++) {
        objectDeclaration.push(path.call(print, 'children', i));
    }

    const elementStart = lBraceIdx + 1;
    const elementEnd = children.length - 1;
    let elementDocs = [];

    if (!options || options.groupGlobalVars === "none") {
        elementDocs = printAllElements(path, options, print, elementStart, elementEnd);
    }
    else {
        elementDocs = printElementsInGroups(path, options, print, elementStart, elementEnd);
    }

    const body = elementDocs.length > 0
        ? [indent([hardline, join([hardline, hardline], elementDocs)]), hardline]
        : [hardline];

    return [join(" ", objectDeclaration), hardline, path.call(print, 'children', lBraceIdx), ...body, path.call(print, 'children', rBraceIdx)];
}

function printArrayDataType(path, options, print) {
    // Grammar: ARRAY LBRACKET INTEGER_LITERAL (COMMA INTEGER_LITERAL)* RBRACKET OF dataType;
    const children = path.node.children;
    const arrayKeyword = path.call(print, 'children', 0);
    const lbracket = path.call(print, 'children', 1);
    const rbracket = path.call(print, 'children', children.length - 3);
    const ofKeyword = path.call(print, 'children', children.length - 2);
    const dataType = path.call(print, 'children', children.length - 1);

    const dimensions = [];
    for (let i = 2; i < children.length - 3; i += 2) {
        dimensions.push(path.call(print, 'children', i));
        if (children[i + 1].symbol?.type === ALParser.COMMA) {
            dimensions.push([path.call(print, 'children', i + 1), " "]);
        }
    }

    return [arrayKeyword, lbracket, ...dimensions, rbracket, " ", ofKeyword, " ", dataType];
}

function printDictionaryDataType(path, options, print) {
    // Grammar: DICTIONARY OF LBRACKET dataType COMMA dataType RBRACKET;
    const dictTypeName = path.call(print, 'children', 0);
    const ofKeyword = path.call(print, 'children', 1);
    const lbracket = path.call(print, 'children', 2);
    const type1 = path.call(print, 'children', 3);
    const comma = path.call(print, 'children', 4);
    const type2 = path.call(print, 'children', 5);
    const rbracket = path.call(print, 'children', 6);
    return [dictTypeName, " ", ofKeyword, " ", lbracket, type1, comma, " ", type2, rbracket];
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
    // Grammar: OPTION COMMA? identifiersList?;
    const typeName = path.call(print, 'children', 0);

    const optionValues = [];
    for (let i = 1; i < path.node.children.length; i++) {
        optionValues.push(path.call(print, 'children', i));
    }

    return optionValues.length > 0
        ? [typeName, " ", optionValues]
        : [typeName];
}

function printIdentifiersList(path, options, print) {
    // Grammar: identifier (COMMA identifier)*
    const optionValues = [];
    for (let i = 0; i < path.node.children.length; i += 2) {
        optionValues.push(path.call(print, 'children', i));
    }

    return join(", ", optionValues);
}

function printObjectPermissionsList(path, options, print) {
    // Grammar: PERMISSIONS EQUAL permissionsPropertyValue (COMMA permissionsPropertyValue)*
    const children = path.node.children;
    const permissionsKeyword = path.call(print, 'children', 0);
    const equalSign = path.call(print, 'children', 1);

    const propValues = [];
    for (let i = 2; i < children.length; i += 2) {
        let value = path.call(print, 'children', i);
        if (i < children.length - 1) {
            value.push(path.call(print, 'children', i + 1));  // Print comma
        }
        propValues.push(value);
    }

    return group(indent([permissionsKeyword, " ", equalSign, line, join(line, propValues)]));
}

function printPermissionsPropertyValue(path, options, print) {
    // Grammar: identifier identifier EQUAL PERMISSION_VALUES
    const objectType = path.call(print, 'children', 0);
    const objectName = path.call(print, 'children', 1);
    const equalSign = path.call(print, 'children', 2);
    const permissions = path.call(print, 'children', 3);

    return join(" ", [objectType, objectName, equalSign, permissions]);
}

function printDecimalPlacesPropertyValue(path, options, print) {
    // Grammar: INTEGER_LITERAL (COLON INTEGER_LITERAL)?;
    const intPart = path.call(print, 'children', 0);
    if (path.node.children.length === 1)
        return intPart;

    const colon = path.call(print, 'children', 1);
    const decPart = path.call(print, 'children', 2);
    return [intPart, " ", colon, " ", decPart];
}

function printAccessByPermissionPropertyValue(path, options, print) {
    return join(" ", path.map(print, 'children'));
}

function printToken(token) {
    const text = token.symbol.text;
    return isLowerCaseToken(token) ? text.toLowerCase() : text;
}

function isLowerCaseToken(token) {
    if (!token.symbol) return false;

    const lowerCaseTokens = new Set([
        ALParser.ADDAFTER,
        ALParser.ADDBEFORE,
        ALParser.ADDFIRST,
        ALParser.ADDLAST,
        ALParser.ACTION,
        ALParser.ACTIONREF,
        ALParser.AND,
        ALParser.ARRAY,
        ALParser.BEGIN,
        ALParser.BREAK,
        ALParser.CASE,
        ALParser.CONST,
        ALParser.CONTINUE,
        ALParser.DIV,
        ALParser.DO,
        ALParser.DOWNTO,
        ALParser.ELSE,
        ALParser.END,
        ALParser.EXIT,
        ALParser.EXTENDS,
        ALParser.FIELD,
        ALParser.FIELDGROUP,
        ALParser.FIELDGROUPS,
        ALParser.FILTER,
        ALParser.FOR,
        ALParser.FOREACH,
        ALParser.IF,
        ALParser.IN,
        ALParser.LAYOUT,
        ALParser.MOD,
        ALParser.MOVEAFTER,
        ALParser.MOVEBEFORE,
        ALParser.MOVEFIRST,
        ALParser.MOVELAST,
        ALParser.NAMESPACE,
        ALParser.NOT,
        ALParser.OF,
        ALParser.OR,
        ALParser.PROCEDURE,
        ALParser.REPEAT,
        ALParser.SORTING,
        ALParser.THEN,
        ALParser.THIS,
        ALParser.TO,
        ALParser.TRIGGER,
        ALParser.UNTIL,
        ALParser.USING,
        ALParser.VAR,
        ALParser.WHILE,
        ALParser.WITH,
        ALParser.XOR,
    ]);

    return lowerCaseTokens.has(token.symbol.type);
}

//#endregion Code statements

function printAllElements(path, options, print, elementStart, elementEnd) {
    const elementDocs = [];
    for (let i = elementStart; i < elementEnd; i++) {
        const el = path.call(print, 'children', i);
        if (el !== "")
            elementDocs.push(el);
    }

    return elementDocs;
}

function printElementsInGroups(path, options, print, elementStart, elementEnd) {
    const properties = [];
    let vars = [];
    let protectedVars = [];
    const procedures = [];
    const otherElements = [];
    const elementDocs = [];

    for (let i = elementStart; i < elementEnd; i++) {
        switch (true) {
            case isALObjectPropertiesList(path.node.children[i]):
                properties.push(path.call(print, 'children', i));
                break;

            case path.node.children[i].ruleIndex === ALParser.RULE_proceduresList:
                procedures.push(path.call(print, 'children', i));
                break;

            case path.node.children[i].ruleIndex === ALParser.RULE_variablesList:
                if (path.node.children[i]?.children[0]?.symbol?.type === ALParser.PROTECTED) {
                    protectedVars.push(path.call(() => printVariablesListExcludingKeywords(path, options, print), 'children', i));
                }
                else {
                    vars.push(path.call(() => printVariablesListExcludingKeywords(path, options, print), 'children', i));
                }
                break;

            default:
                const el = path.call(print, 'children', i);
                if (el !== "")
                    otherElements.push(el);
        }
    }

    if (vars.length > 0) {
        vars = ["var", indent([hardline, join(hardline, vars)])];
    }
    if (protectedVars.length > 0) {
        if (vars.length > 0)
            vars.push(hardline, hardline);
        vars.push("protected var", indent([hardline, join(hardline, protectedVars)]));
    }

    elementDocs.push(...properties);
    if (options.groupGlobalVars === "top" && vars.length > 0)
        elementDocs.push(vars);

    elementDocs.push(...otherElements)
    if (options.groupGlobalVars === "beforeCode" && vars.length > 0)
        elementDocs.push(vars);

    if (procedures.length > 0)
        elementDocs.push(procedures);

    if (options.groupGlobalVars === "bottom" && vars.length > 0)
        elementDocs.push(vars);

    return elementDocs;
}

function printVariablesListExcludingKeywords(path, options, print) {
    const children = path.node.children;
    const vars = [];

    for (let i = 0; i < children.length; i++) {
        if (children[i].ruleIndex === ALParser.RULE_variableDeclaration) {
            vars.push(path.call(print, 'children', i));
        }
    }

    return join(hardline, vars);
}

function isALObjectPropertiesList(node) {
    if (typeof node.ruleIndex === "undefined")
        return false;

    return [
        ALParser.RULE_tablePropertiesList,
        ALParser.RULE_pagePropertiesList,
        ALParser.RULE_codeunitPropertiesList,
        ALParser.RULE_reportPropertiesList,
        ALParser.RULE_queryPropertiesList,
        ALParser.RULE_tableExtPropertiesList
    ].includes(node.ruleIndex);
}

export default {
    print,
    getVisitorKeys,
    printComment,
    canAttachComment,
    isBlockComment,
    getCommentType
}
