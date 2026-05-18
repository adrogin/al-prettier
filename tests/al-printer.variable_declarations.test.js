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
