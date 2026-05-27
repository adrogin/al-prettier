import { describe, it } from 'mocha';
import { expect } from 'chai';
import printer from '../plugin/printer.js';
import {
    mockPrettyPrint,
    mockTerminalNode,
    mockRuleNode,
    mockTablePropertyItem,
    mockTablePropertiesList,
    mockTableFieldDefinition,
    mockTableFieldPropertyItem,
    mockTableFieldPropertiesList,
    mockTableFieldsList,
    mockTableObjectWithProperties,
    mockTableObjectWithFields,
    mockTableKeyDefinition,
    mockTableKeysList,
    mockTableKeyPropertyItem,
    mockTableKeyPropertiesList
} from './objectMocks.js';
import { compareIndentedList } from './testUtils.js';
import * as prettier from 'prettier';
import ALParser from '../parser/ALParser.js';

const hardline = prettier.doc.builders.hardline;
const indent = prettier.doc.builders.indent;

describe('Table elements', () => {
    it('Table object without any elements', () => {
        const ast = mockTableObjectWithProperties("50000", "\"My Test Table\"");

        const printed = printer.print(ast, null, mockPrettyPrint).flat(Infinity);
        const expected = [
            "table", " ", "50000", " ", "\"My Test Table\"", hardline, "{", hardline, "}"
        ].flat(Infinity);
        expect(printed).deep.to.equal(expected);
    });
});

describe('Table properties', () => {
    it('Printing a single table property item', () => {
        const captionProperty = mockTablePropertyItem('Caption', "'My Test Table'");
        const captionNode = mockPrettyPrint(captionProperty);

        const printed = printer.print(captionNode, null, mockPrettyPrint).flat(Infinity);

        const expected = ['Caption', ' ', '=', ' ', "'My Test Table'", ";"];

        expect(printed).deep.to.equal(expected);
    });

    it('Table with single Caption property', () => {
        const captionProperty = mockTablePropertyItem('Caption', "'My Test Table'");
        const table = mockTableObjectWithProperties("50000", "MyTestTable", [captionProperty]);

        const printedObject = printer.print(table, null, mockPrettyPrint).flat(Infinity);
        const printedProperty = printedObject.find(el => el.type === "indent").contents.flat(Infinity);

        const expected = [
            hardline,
            'Caption', ' ', '=', ' ', "'My Test Table'", ";"
        ].flat(Infinity);

        expect(printedProperty).deep.to.equal(expected);
    });

    it('Table with multiple properties: Property items separated with line breaks.', () => {
        const captionProp = mockTablePropertyItem('Caption', "'My Test Table'");
        const descriptionProp = mockTablePropertyItem('Description', "'This is a table with multiple properties'");
        const modifyAllowedProp = mockTablePropertyItem('ModifyAllowed', 'false');

        const propertiesList = mockTablePropertiesList([captionProp, descriptionProp, modifyAllowedProp]);
        const propertyListNode = mockPrettyPrint(propertiesList);

        const printed = printer.print(propertyListNode, null, mockPrettyPrint).flat(Infinity);

        const expected = [
            "Caption", " ", "=", " ", "'My Test Table'", ";", hardline,
            "Description", " ", "=", " ", "'This is a table with multiple properties'", ";", hardline,
            "ModifyAllowed", " ", "=", " ", "false", ";"
        ].flat(Infinity);

        expect(printed).deep.to.equal(expected);
    });
});

describe('Table fields definition', () => {
    it('Single field with ID, Name, and Integer type prints correctly', () => {
        const field = mockTableFieldDefinition('1', 'ID', 'Integer');
        const fieldNode = mockPrettyPrint(field);

        const printed = printer.print(fieldNode, null, mockPrettyPrint).flat(Infinity);

        const expected = [
            'field', '(', '1', ';', ' ', 'ID', ';', ' ', 'Integer', ')',
            hardline,
            '{',
            hardline,
            '}'
        ].flat();

        expect(printed).deep.to.equal(expected);
    });

    it('Field with Text data type and length prints correctly', () => {
        const field = mockTableFieldDefinition('2', 'Description', 'Text[100]');
        const fieldNode = mockPrettyPrint(field);

        const printed = printer.print(fieldNode, null, mockPrettyPrint).flat(Infinity);

        const expected = [
            'field', '(', '2', ';', ' ', 'Description', ';', ' ', 'Text[100]', ')',
            hardline,
            '{',
            hardline,
            '}'
        ].flat();

        expect(printed).deep.to.equal(expected);
    });
});

describe('Table field properties', () => {
    it('Single field property prints correctly', () => {
        const property = mockTableFieldPropertyItem('Caption', "'ID'");
        const propertyNode = mockPrettyPrint(property);

        const printed = printer.print(propertyNode, null, mockPrettyPrint).flat(Infinity);

        const expected = ['Caption', ' ', '=', ' ', "'ID'", ";"];
        expect(printed).deep.to.equal(expected);
    });

    it('Field properties list with multiple items prints correctly', () => {
        const properties = [
            mockTableFieldPropertyItem('Caption', "'ID'"),
            mockTableFieldPropertyItem('Editable', 'false'),
            mockTableFieldPropertyItem('Description', "'Unique Identifier'")];

        const propertiesList = mockTableFieldPropertiesList(properties);
        const propertiesListNode = mockPrettyPrint(propertiesList);

        const printed = printer.print(propertiesListNode, null, mockPrettyPrint).flat(Infinity);

        const expected = [
            "Caption", " ", "=", " ", "'ID'", ";", hardline,
            "Editable", " ", "=", " ", "false", ";", hardline,
            "Description", " ", "=", " ", "'Unique Identifier'", ";"
        ].flat();

        expect(printed).deep.to.equal(expected);
    });
});

describe('Table fields list', () => {
    it('Empty fields list prints correctly', () => {
        const fieldsList = mockTableFieldsList([]);
        const fieldsListNode = mockPrettyPrint(fieldsList);

        const printed = printer.print(fieldsListNode, null, mockPrettyPrint).flat(Infinity);

        const expected = ["fields", hardline, "{", indent([hardline, []]), hardline, "}"].flat();
        expect(printed).deep.to.equal(expected);
    });

    it('Fields list with single field prints correctly', () => {
        const field = mockTableFieldDefinition('1', 'ID', 'Integer');
        const fieldsList = mockTableFieldsList([field]);
        const fieldsListNode = mockPrettyPrint(fieldsList);

        const printed = printer.print(fieldsListNode, null, mockPrettyPrint).flat(Infinity);

        const expected = [
            "fields", hardline,
            "{", indent([hardline, [
                'field', '(', '1', ';', ' ', 'ID', ';', ' ', 'Integer', ')', hardline,
                '{', hardline,
                '}']
            ]), hardline,
            "}"
        ].flat();

        compareIndentedList(expected, printed);
    });

    it('Fields list with multiple fields prints correctly', () => {
        const fields = [
            mockTableFieldDefinition('1', 'ID', 'Integer'),
            mockTableFieldDefinition('2', 'Description', 'Text[100]'),
            mockTableFieldDefinition('3', 'Amount', 'Decimal')];

        const fieldsList = mockTableFieldsList(fields);
        const fieldsListNode = mockPrettyPrint(fieldsList);

        const printed = printer.print(fieldsListNode, null, mockPrettyPrint).flat(Infinity);

        const expected = [
            "fields", hardline,
            "{", indent([
                hardline, [
                    'field', '(', '1', ';', ' ', 'ID', ';', ' ', 'Integer', ')', hardline, '{', hardline, '}', hardline,
                    'field', '(', '2', ';', ' ', 'Description', ';', ' ', 'Text[100]', ')', hardline, '{', hardline, '}', hardline,
                    'field', '(', '3', ';', ' ', 'Amount', ';', ' ', 'Decimal', ')', hardline, '{', hardline, '}']
            ]), hardline,
            "}"
        ].flat();

        compareIndentedList(expected, printed);
    });
});

describe('Table keys', () => {
    it('Print table keys list with one clustered key', () => {
        const key = mockTableKeyDefinition('PK', ['ID'], mockTableKeyPropertiesList([mockTableKeyPropertyItem('Clustered', 'true')]));
        const keysListNode = mockPrettyPrint(mockTableKeysList([key]));

        const printed = printer.print(keysListNode, null, mockPrettyPrint).flat(Infinity);

        const expected = [
            "keys", hardline,
            "{", indent([hardline, [
                'key(', 'PK', '; ', 'ID', ')', hardline,
                '{', indent([hardline, [
                    "Clustered", " ", "=", " ", "true", ";"
                ]]), hardline,
                '}'
            ]]), hardline,
            "}"
        ].flat();

        compareIndentedList(expected, printed);
    });
});

describe('Field definitions with properties', () => {
    it('Field with single property prints correctly', () => {
        const property = mockTableFieldPropertyItem("Caption", "'Customer No.'");
        const propertiesList = mockTableFieldPropertiesList([property]);
        const field = mockTableFieldDefinition("1", "Customer No.", "Code[20]", [propertiesList]);
        const fieldNode = mockPrettyPrint(field);

        const printed = printer.print(fieldNode, null, mockPrettyPrint).flat(Infinity);

        const expected = [
            "field", "(", "1", ";", " ", "Customer No.", ";", " ", "Code[20]", ")", hardline,
            "{", indent(
                [hardline, [
                    "Caption", " ", "=", " ", "'Customer No.'", ";"
                ]
                ]), hardline,
            "}"
        ].flat();

        compareIndentedList(expected, printed);
    });

    it('Field with multiple properties prints correctly', () => {
        const properties = [
            mockTableFieldPropertyItem('Caption', "'Amount'"),
            mockTableFieldPropertyItem('Description', "'Amount to be invoiced'"),
            mockTableFieldPropertyItem('Editable', 'true')
        ];

        const propertiesList = mockTableFieldPropertiesList(properties);
        const field = mockTableFieldDefinition('2', 'Invoice Amount', 'Decimal', [propertiesList]);
        const fieldNode = mockPrettyPrint(field);

        const printed = printer.print(fieldNode, null, mockPrettyPrint).flat(Infinity);

        const expected = [
            "field", "(", "2", ";", " ", "Invoice Amount", ";", " ", "Decimal", ")", hardline,
            "{", indent([hardline,
                [
                    "Caption", " ", "=", " ", "'Amount'", ";", hardline,
                    "Description", " ", "=", " ", "'Amount to be invoiced'", ";", hardline,
                    "Editable", " ", "=", " ", "true", ";"
                ]]),
            hardline,
            "}"
        ].flat();

        compareIndentedList(expected, printed);
    });
});

describe('AL keywords as identifiers', () => {

});
