import { describe, it } from 'mocha';
import { expect } from 'chai';
import antlr4 from 'antlr4';
import ALParser from '../../algrammar/JS/ALParser.js';
import printer from '../plugin/printer.js';
import * as prettier from "prettier";
import { alFormat } from './testUtils.js';

describe('Elements grouping and ordering', () => {
    it('Group global variable in table at the bottom', () => {
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
});
