import { describe, it } from 'mocha';
import { expect } from 'chai';
import antlr4 from 'antlr4';
import ALParser from '../../algrammar/JS/ALParser.js';
import ALLexer from '../../algrammar/JS/ALLexer.js';
import printer from '../plugin/printer.js';
import * as prettier from "prettier";
import { alFormat } from './testUtils.js';

describe('Empty lines in statements list', () => {
    it('Empty lines are not printed at the beginning or end of a procedure', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var I: Integer;
  begin

    I := 1;
    CallSomeProcedure(I);

  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var
    I: Integer;
  begin
    I := 1;
    CallSomeProcedure(I);
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty lines are not printed at the beginning or end of a repeat loop', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var I: Integer;
  begin
    repeat

        I += 1;
        CallSomeProcedure(I);

    until  I = 10;
end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var
    I: Integer;
  begin
    repeat
      I += 1;
      CallSomeProcedure(I);
    until I = 10;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty lines are not printed at the beginning or end of a statement list after an if condition', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var I, J: Integer;
  begin
    if I > 10 then begin

        J := I;
        CallSomeProcedure(I, J);

    end;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var
    I, J: Integer;
  begin
    if I > 10 then begin
      J := I;
      CallSomeProcedure(I, J);
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty line is printed before a statement list after a previous statement', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var
    I: Integer;
  begin
    I := GetValueOfI();
    if I > 0 then
      CallSomeProcedure();
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var
    I: Integer;
  begin
    I := GetValueOfI();

    if I > 0 then
      CallSomeProcedure();
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty line is printed after a statement list before a following statement', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var
    I: Integer;
  begin
    for I := 1 to 10 do
      CallSomeProcedure(I);
      CallAnotherProcedure();
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var
    I: Integer;
  begin
    for I := 1 to 10 do
      CallSomeProcedure(I);

    CallAnotherProcedure();
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty line separates two compound statements', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var
    I: Integer;
  begin

    for I := 1 to 10 do begin
      CallProcedureOne(I);
      CallProcedureTwo(I);
    end;
    repeat
      CallProcedureThree();
    until false;

  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var
    I: Integer;
  begin
    for I := 1 to 10 do begin
      CallProcedureOne(I);
      CallProcedureTwo(I);
    end;

    repeat
      CallProcedureThree();
    until false;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty lines separate two compound statements and a statement block between', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var
    I, J: Integer;
  begin

    for I := 1 to 10 do begin
      CallProcedureOne(I);
      CallProcedureTwo(I);
    end;
    I := 0;
    J := 0;
    repeat
      CallProcedureThree(I);
    until I < 0;

  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  var
    I, J: Integer;
  begin
    for I := 1 to 10 do begin
      CallProcedureOne(I);
      CallProcedureTwo(I);
    end;

    I := 0;
    J := 0;

    repeat
      CallProcedureThree(I);
    until I < 0;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
