import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

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

    it('Procedure declaration can end in semicolon', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething();
  begin
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Trigger declaration can end in semicolon', () => {
        const code = `
table 50000 MyTable
{
  trigger OnInsert();
  begin
  end;
}`;

        const expected = `table 50000 MyTable
{
  trigger OnInsert()
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Trigger with return type', () => {
        const code = `
pageextension 50000 MyPageExt extends SomeExtendedPage
{
  trigger OnDeleteRecord(): Boolean;
  begin
  end;
}`;

        const expected = `pageextension 50000 MyPageExt extends SomeExtendedPage
{
  trigger OnDeleteRecord(): Boolean
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Wrapping long procedure call', () => {
        const code = `
codeunit 60000 CodeunitWithProcedure
{
  procedure CallSomething()
  begin
    InvokeProcedureWithVeryLongNameAndListOfArguments(LongArgumentName1, LongArgumentName2, LongArgumentName3);
  end;
}`;

        const expected = `codeunit 60000 CodeunitWithProcedure
{
  procedure CallSomething()
  begin
    InvokeProcedureWithVeryLongNameAndListOfArguments(
      LongArgumentName1,
      LongArgumentName2,
      LongArgumentName3);
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
