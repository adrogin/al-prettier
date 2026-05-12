import { describe, it } from 'mocha';
import { expect } from 'chai';
import antlr4 from 'antlr4';
import ALParser from '../../algrammar/JS/ALParser.js';
import printer from '../plugin/printer.js';
import * as prettier from "prettier";
import { alFormat } from './testUtils.js';

describe('Printing comments in code statements', () => {
    it('Comment at the end of a statement list', () => {
        const code = `
codeunit 50000 MyCodeunit
{
    procedure ProcedureWithComment()
    begin
        CallAnotherProcedure();
        // This is a comment
    end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure ProcedureWithComment()
  begin
    CallAnotherProcedure();
  // This is a comment
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Comment in empty procedure without statements', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure ProcedureWithComment()
  begin
    // This is a comment
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure ProcedureWithComment()
  begin
  // This is a comment
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});