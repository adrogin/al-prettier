import { describe, it } from 'mocha';
import { expect } from 'chai';
import antlr4 from 'antlr4';
import ALParser from '../../algrammar/JS/ALParser.js';
import printer from '../plugin/printer.js';
import * as prettier from "prettier";
import { alFormat } from './testUtils.js';

describe('Elements grouping and ordering', () => {
    it('Group global variables in table at the bottom', () => {
        const code = `
table 50000 "JustSomeTable"
{
  var Variable1: Integer;
  trigger OnInsert()
  begin
  end;

  var Variable2: Text;
}`;

        const expected = `table 50000 "JustSomeTable"
{
  trigger OnInsert()
  begin
  end;

  var
    Variable1: Integer;
    Variable2: Text;
}
`;

        return alFormat(code, {
            groupGlobalVars: "bottom"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Group global variables in table at the bottom, separate protected vars', () => {
        const code = `
table 50000 "JustSomeTable"
{
  protected var pv1: Code[10];
  var Variable1: Integer;
  trigger OnInsert()
  begin
  end;

  var Variable2: Text;
  protected var pv2: Code[10];
}`;

        const expected = `table 50000 "JustSomeTable"
{
  trigger OnInsert()
  begin
  end;

  var
    Variable1: Integer;
    Variable2: Text;

  protected var
    pv1: Code[10];
    pv2: Code[10];
}
`;

        return alFormat(code, {
            groupGlobalVars: "bottom"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Group global variables in codeunit, top placement, no properties', () => {
        const code = `
codeunit 50000 "JustSomeCodeunit"
{
  var Variable1: Integer;
  trigger OnRun()
  begin
  end;

  var Variable2: Text; Variable3: Integer;
}`;

        const expected = `codeunit 50000 "JustSomeCodeunit"
{
  var
    Variable1: Integer;
    Variable2: Text;
    Variable3: Integer;

  trigger OnRun()
  begin
  end;
}
`;

        return alFormat(code, {
            groupGlobalVars: "top"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Group global variables in page, top placement, after properties', () => {
        const code = `
table 50000 "MyPage"
{
  InsertAllowed = false;
  DeleteAllowed = false;
  protected var pv1: Code[10];
  var Variable1: Integer;
  trigger OnAfterGetRecord()
  begin
  end;

  var Variable2: Text;
  protected var pv2: Code[10];
}`;

        const expected = `table 50000 "MyPage"
{
  InsertAllowed = false;
  DeleteAllowed = false;

  var
    Variable1: Integer;
    Variable2: Text;

  protected var
    pv1: Code[10];
    pv2: Code[10];

  trigger OnAfterGetRecord()
  begin
  end;
}
`;

        return alFormat(code, {
            groupGlobalVars: "top"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
