import ALParser from "../../algrammar/JS/ALParser.js";
import printer from '../printer.js';

export function mockPrettyPrint(node) {
    return {
        node: node,
        call: (callback, elementName, index) => {
            return printer.print(mockPrettyPrint(node[elementName][index]))
        },
        map: (callback, elementName) => {
            return node[elementName].map((child, index) => {
                return printer.print(mockPrettyPrint(child))
            })
        }
    }
}

export function mockTerminalNode(text, type = null) {
    return {
        symbol: { text, type },
        children: undefined
    };
}

export function mockRuleNode(ruleIndex, children = []) {
    return {
        ruleIndex,
        children,
        symbol: undefined
    };
}

export function mockTableProperty(propertyName, propertyValue) {
    // Mock: tableProperty - e.g., Caption = 'My Table'
    return mockRuleNode(ALParser.RULE_tableProperty, [
        mockTerminalNode(propertyName),
        mockTerminalNode('='),
        mockTerminalNode(propertyValue)
    ]);
}

export function mockTablePropertyItem(propertyName, propertyValue) {
    // Mock: tablePropertyItem - wraps a tableProperty
    return mockRuleNode(ALParser.RULE_tablePropertyItem, [
        mockTableProperty(propertyName, propertyValue),
        mockTerminalNode(";")
    ]);
}

export function mockTablePropertiesList(properties = []) {
    // Mock: tablePropertiesList - list of property items
    return mockRuleNode(ALParser.RULE_tablePropertiesList, properties);
}

export function mockTableFieldDefinition(fieldId, fieldName, dataType, properties = []) {
    // Mock: tableFieldDefinition
    // FIELD LPAREN INTEGER_LITERAL SEMICOLON identifier SEMICOLON dataType RPAREN LBRACE tableFieldProperties* RBRACE
    const children = [
        mockTerminalNode('field', ALParser.FIELD),
        mockTerminalNode('(', ALParser.LPAREN),
        mockTerminalNode(fieldId),
        mockTerminalNode(';', ALParser.SEMICOLON),
        mockTerminalNode(fieldName),
        mockTerminalNode(';', ALParser.SEMICOLON),
        mockTerminalNode(dataType),
        mockTerminalNode(')', ALParser.RPAREN),
        mockTerminalNode('{', ALParser.LBRACE),
        ...properties,
        mockTerminalNode('}', ALParser.RBRACE)
    ];
    return mockRuleNode(ALParser.RULE_tableFieldDefinition, children);
}

export function mockTableFieldProperty(propertyName, propertyValue) {
    // Mock: tableFieldProperty - e.g., Caption = 'ID'
    return mockRuleNode(ALParser.RULE_tableFieldProperty, [
        mockTerminalNode(propertyName),
        mockTerminalNode('='),
        mockTerminalNode(propertyValue)
    ]);
}

export function mockTableFieldPropertyItem(propertyName, propertyValue) {
    // Mock: tableFieldPropertyItem
    return mockRuleNode(ALParser.RULE_tableFieldPropertyItem, [
        mockTableProperty(propertyName, propertyValue),
        mockTerminalNode(";")
    ]);
}

export function mockTableFieldPropertiesList(properties = []) {
    return mockRuleNode(ALParser.RULE_tableFieldPropertiesList, properties);
}

export function mockTableFieldsList(fields = []) {
    // Mock: tableFieldsList
    // FIELDS LBRACE tableFieldDefinition* RBRACE
    const children = [
        mockTerminalNode('fields', ALParser.FIELDS),
        mockTerminalNode('{', ALParser.LBRACE),
        ...fields,
        mockTerminalNode('}', ALParser.RBRACE)
    ];
    return mockRuleNode(ALParser.RULE_tableFieldsList, children);
}

export function mockTableObjectWithProperties(tableId, tableName, properties = []) {
    // Mock: tableObject with properties
    const children = [
        mockTerminalNode('table', ALParser.TABLE),
        mockTerminalNode(tableId),
        mockTerminalNode(tableName),
        mockTerminalNode('{', ALParser.LBRACE),
        ...properties,
        mockTerminalNode('}', ALParser.RBRACE)
    ];
    return mockPrettyPrint(mockRuleNode(ALParser.RULE_tableObject, children));
}

export function mockTableObjectWithFields(tableId, tableName, fields = []) {
    // Mock: tableObject with fields
    const fieldsList = mockTableFieldsList(fields);
    const children = [
        mockTerminalNode('table', ALParser.TABLE),
        mockTerminalNode(tableId),
        mockTerminalNode(`"${tableName}"`),
        mockTerminalNode('{', ALParser.LBRACE),
        fieldsList,
        mockTerminalNode('}', ALParser.RBRACE)
    ];
    return mockPrettyPrint(mockRuleNode(ALParser.RULE_tableObject, children));
}
