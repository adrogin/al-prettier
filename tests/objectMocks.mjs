import ALParser from "../parser/ALParser.js";
import printer from '../plugin/printer.js';

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
    return mockRuleNode(ALParser.RULE_tableProperty, [
        mockRuleNode(ALParser.RULE_genericObjectProperty, [
            mockTerminalNode(propertyName),
            mockTerminalNode('='),
            mockTerminalNode(propertyValue)
        ])
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
    return mockRuleNode(ALParser.RULE_tableFieldProperty, [
        mockTerminalNode(propertyName),
        mockTerminalNode('='),
        mockTerminalNode(propertyValue)
    ]);
}

export function mockTableFieldPropertyItem(propertyName, propertyValue) {
    return mockRuleNode(ALParser.RULE_tableFieldPropertyItem, [
        mockTableProperty(propertyName, propertyValue),
        mockTerminalNode(";")
    ]);
}

export function mockTableFieldPropertiesList(properties = []) {
    return mockRuleNode(ALParser.RULE_tableFieldPropertiesList, properties);
}

export function mockTableFieldsList(fields = []) {
    const children = [
        mockTerminalNode('fields', ALParser.FIELDS),
        mockTerminalNode('{', ALParser.LBRACE),
        ...fields,
        mockTerminalNode('}', ALParser.RBRACE)
    ];
    return mockRuleNode(ALParser.RULE_tableFieldsList, children);
}

export function mockTableKeysList(keys = []) {
    const children = [
        mockTerminalNode('keys', ALParser.KEYS),
        mockTerminalNode('{', ALParser.LBRACE),
        ...keys,
        mockTerminalNode('}', ALParser.RBRACE)
    ];
    return mockRuleNode(ALParser.RULE_tableKeysSection, children);
}

export function mockTableKeyDefinition(keyName, keyFields, propertiesList) {
    const keyFieldNodes = keyFields.map(field => mockTerminalNode(field));

    for (let i = 0; i < keyFieldNodes.length - 1; i++) {
        keyFieldNodes.splice(2 * i + 1, 0, mockTerminalNode(',', ALParser.COMMA));
    }

    const children = [
        mockTerminalNode('key', ALParser.KEY),
        mockTerminalNode('(', ALParser.LPAREN),
        mockTerminalNode(keyName),
        mockTerminalNode(';', ALParser.SEMICOLON),
        ...keyFieldNodes,
        mockTerminalNode(')', ALParser.RPAREN),
        mockTerminalNode('{', ALParser.LBRACE),
        propertiesList,
        mockTerminalNode('}', ALParser.RBRACE)
    ];
    return mockRuleNode(ALParser.RULE_keyItem, children);
}

export function mockTableKeyPropertyItem(propertyName, propertyValue) {
    return mockRuleNode(ALParser.RULE_keyPropertyItem, [
        mockTableKeyProperty(propertyName, propertyValue),
        mockTerminalNode(";")
    ]);
}

export function mockTableKeyProperty(propertyName, propertyValue) {
    return mockRuleNode(ALParser.RULE_keyProperty, [
        mockRuleNode(ALParser.RULE_genericObjectProperty, [
            mockTerminalNode(propertyName),
            mockTerminalNode('='),
            mockTerminalNode(propertyValue)
        ])
    ]);
}

export function mockTableKeyPropertiesList(properties = []) {
    return mockRuleNode(ALParser.RULE_keyPropertiesList, properties);
}

export function mockTableObjectWithProperties(tableId, tableName, properties = []) {
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
