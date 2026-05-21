import { describe, it } from 'mocha';
import { expect } from 'chai';
import antlr4 from 'antlr4';
import ALParser from '../../algrammar/JS/ALParser.js';
import printer from '../plugin/printer.js';
import * as prettier from "prettier";
import { alFormat } from './testUtils.js';

describe('Variable declarations', () => {
    it('Global record variable with quoted type', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var ApprovalEntry: Record "Approval Entry";
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    ApprovalEntry: Record "Approval Entry";
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Global record variable with quoted name', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var "Approval Entry": Record "Approval Entry";
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    "Approval Entry": Record "Approval Entry";
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Record variable as procedure parameter', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Approve(ApprovalEntry:Record "Approval Entry")
  begin end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Approve(ApprovalEntry: Record "Approval Entry")
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Record procedure parameter with var reference', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Approve(var ApprovalEntry:Record "Approval Entry")
  begin
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Approve(var ApprovalEntry: Record "Approval Entry")
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Interface procedure parameter', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Define(InvoicePosting: Interface "Invoice Posting")
  begin
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Define(InvoicePosting: Interface "Invoice Posting")
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Print a label with both Locked and Comment properties', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var TextLabel: Label 'Label',Locked=true,Comment='This is a label';
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    TextLabel: Label 'Label', Locked = true, Comment = 'This is a label';
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Print a multiline verbatim string label', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var TextLabel: Label @'Label line 1,
Label line 2';
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    TextLabel: Label @'Label line 1,
Label line 2';
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Label with multiple properties', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var TextLabel: Label 'This is a label',Locked=true,Comment='And it is locked',MaxLength=20;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    TextLabel: Label 'This is a label',
      Locked = true,
      Comment = 'And it is locked',
      MaxLength = 20;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Simple DotNet variable', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var Convert: DotNet Convert;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    Convert: DotNet Convert;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Variable with attribute', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var
    [SecurityFiltering(SecurityFilter::Ignored)]
    JobQueueEntry: Record "Job Queue Entry";
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    [SecurityFiltering(SecurityFilter::Ignored)]
    JobQueueEntry: Record "Job Queue Entry";
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Protected variables list', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  protected
  var
    ProtectedText: Text;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  protected var
    ProtectedText: Text;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Complex variable types', () => {
    it('Array variable', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var TextArray: Array[10] of Text[100];
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    TextArray: array[10] of Text[100];
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Multidimensional array', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var Numbers:Array[10,5,3] of Integer;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    Numbers: array[10, 5, 3] of Integer;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('List variable', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var ListOfText: List of [Text[100]];
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    ListOfText: List of [Text[100]];
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Dictionary variable', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var Dict: Dictionary of [Code[20],Text[100]];
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    Dict: Dictionary of [Code[20], Text[100]];
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Option variables', () => {
    it('Generic Option variable without values', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var OptionVar: Option;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    OptionVar: Option;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Option with quoted value', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var OptionVar: Option Option1,"Option 2";
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    OptionVar: Option Option1, "Option 2";
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Option variable with leading comma', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var OptionVar: Option ,Option1,Option2,Option3;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    OptionVar: Option ,Option1, Option2, Option3;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
})

describe('Quoted variable names', () => {
    it('Quote marks inside a quoted identifier', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var "This is ""Text""": Text;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    "This is ""Text""": Text;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
