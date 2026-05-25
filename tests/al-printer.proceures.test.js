import { describe, it } from 'mocha';
import { expect } from 'chai';
import antlr4 from 'antlr4';
import ALParser from '../../algrammar/JS/ALParser.js';
import printer from '../plugin/printer.js';
import * as prettier from "prettier";
import { alFormat } from './testUtils.js';

describe('Procedures', () => {
    it('Empty procedure', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoNothing()
  begin

  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoNothing()
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Procedure with attributes', () => {
        const code = `
codeunit 50000 MyCodeunit
{
[Caption('OData Caption')][CommitBehavior(CommitBehavior::Error)]

  procedure DoNothing()
  begin

  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  [Caption('OData Caption')]
  [CommitBehavior(CommitBehavior::Error)]
  procedure DoNothing()
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Protected procedure', () => {
        const code = `
codeunit 50000 MyCodeunit
{

  protected
  procedure DoNothing()
  begin
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  protected procedure DoNothing()
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Procedure with named return value', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure GetValue() 
  Value:Text
  begin
  Value := 'Value to return';
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure GetValue() Value: Text
  begin
    Value := 'Value to return';
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Long procedure declaration wraps the line', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure VeryLongProcedureNameImpossibleToType(ParameterA: Integer; ParameterB: Text[100])
  begin
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure VeryLongProcedureNameImpossibleToType(
    ParameterA: Integer;
    ParameterB: Text[100])
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
