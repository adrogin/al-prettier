import { describe, it } from 'mocha';
import { expect } from 'chai';
import antlr4 from 'antlr4';
import ALParser from '../../algrammar/JS/ALParser.js';
import printer from '../plugin/printer.js';
import * as prettier from "prettier";
import { alFormat } from './testUtils.js';

describe('Conditional statements', () => {
    it('Simple "if" statement', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Compare()
  begin
    if a = b then exit('A equals B');
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Compare()
  begin
    if a = b then
      exit('A equals B');
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('"if" statement with "else" block', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Compare()
  begin
    if a = b then exit('A equals B') else exit('Not equal');
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Compare()
  begin
    if a = b then
      exit('A equals B')
    else
      exit('Not equal');
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Compound statements in both branches', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Calculate()
  begin
    if a = b then begin
      a := -a;
      b := 0;
      c := a -b; end else begin
      c := b;
      CallProcedure(a);
    end;
    exit(c);
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Calculate()
  begin
    if a = b then begin
      a := -a;
      b := 0;
      c := a - b;
    end
    else begin
      c := b;
      CallProcedure(a);
    end;

    exit(c);
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Missing semicolon after the expression in conditional statement', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Calculate()
  begin
    if a = b then
      exit(a)
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Calculate()
  begin
    if a = b then
      exit(a);
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('if..then without body: terminating semicolon is printed in the same line', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Calculate()
  begin
    if a = b then
    ;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Calculate()
  begin
    if a = b then;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty begin..end block without statements between', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    if a = b then begin end;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    if a = b then begin
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Range "if" condition', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    if a in [1..10,12,15] then DoSomething();
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    if a in [1..10, 12, 15] then
      DoSomething();
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Case statements', () => {
    it('Simple case block', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of 1: CallProcedure1(); 2: CallProcedure2(); end;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of
      1:
        CallProcedure1();
      2:
        CallProcedure2();
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Case with else branch', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of 1: CallProcedure1(); 2: CallProcedure2();else CallProcedure3(); end;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of
      1:
        CallProcedure1();
      2:
        CallProcedure2();
      else
        CallProcedure3();
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Case with compound statements in branches', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of 1: begin CallProcedure1(); end; else begin CallProcedure3(); end; end;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of
      1:
        begin
          CallProcedure1();
        end;
      else begin
        CallProcedure3();
      end;
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))

    });

    it('Missing semicolon added after else branch', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of 1: CallProcedure1(); else CallProcedure3() end;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of
      1:
        CallProcedure1();
      else
        CallProcedure3();
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Multiple options pointing to one branch', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of
    Value1, Value2, Value3:
      CallProcedure1();
    Value4: CallProcedure2();
    end;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of
      Value1,
      Value2,
      Value3:
        CallProcedure1();
      Value4:
        CallProcedure2();
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });


    it('Compound else branch without begin..end', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of
    Value1:
      CallProcedure1();
    else CallProcedure2(); CallProcedure3();
    end;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of
      Value1:
        CallProcedure1();
      else
        CallProcedure2();
        CallProcedure3();
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Case branch without body. Line break inserted before semicolon.', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of
    Value1:
      CallProcedure1();
    Value2:;
    end;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of
      Value1:
        CallProcedure1();
      Value2:
        ;
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Range case condition', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    case a of 1..10: CallProcedure1();
    12,15: CallProcedure2();
    end;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    case a of
      1..10:
        CallProcedure1();
      12,
      15:
        CallProcedure2();
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

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

describe('Statement list', () => {
    it('Dangling semicolon is printed as a separate statement in a list', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    c := a + b;;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    c := a + b;
    ;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Codeunits with namespaces', () => {
    it('Namespace declaration before a codeunit object ', () => {
        const code = `
namespace TestNamespace;
codeunit 50000 MyCodeunit
{}
`;

        const expected = `namespace TestNamespace;

codeunit 50000 MyCodeunit
{
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Namespace declaration and using references ', () => {
        const code = `
namespace TestNamespace;
using Microsoft.Sales.Customer;
using Microsoft.Purchases.Vendor;
codeunit 50000 MyCodeunit
{}
`;

        const expected = `namespace TestNamespace;

using Microsoft.Sales.Customer;
using Microsoft.Purchases.Vendor;

codeunit 50000 MyCodeunit
{
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
