import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

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

    it('Compound if branch', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Calculate()
  begin
    if a = b then begin
      a := -a;
      b := 0;
      c := a -b; end
      else
      c := b;
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
    end else
      c := b;
    exit(c);
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
      c := a -b; end
      else begin
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
    end else begin
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

    it('Blank line inserted after compound if without else', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Calculate()
  begin
    if a = b then begin
      a := -a;
      b := 0;
      c := a -b; end;
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

    it('Case block without trailing semicolon', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    case a of 
    1: CallProcedure1();
    2: CallProcedure2()
    end;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    case a of
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
});

describe('Blank lines in statements list', () => {
    it('Blank lines are not printed at the beginning or end of a procedure', () => {
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

    it('Blank lines are not printed at the beginning or end of a repeat loop', () => {
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

    it('Blank lines are not printed at the beginning or end of a statement list after an if condition', () => {
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

    it('Blank line is not inserted before "if" statement', () => {
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

    it('Blank line is not inserted after a "for" loop', () => {
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

    it('Blank line separates two compound statements', () => {
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

    it('Blank line is inserted after begin..end block, but not before loop', () => {
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

    it('Blank line between two statements is peserved after formatting', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    I := 0;

    J := 0;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    I := 0;

    J := 0;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Blank like is not inserted when original statement is wrapped in two lines', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    CallProcedureWithManyArguments(
    ArgA, ArgB, ArgC, ArgD);
    I := 0;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    CallProcedureWithManyArguments(ArgA, ArgB, ArgC, ArgD);
    I := 0;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Blank line preserved after conditional statement', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Calculate()
  begin
    if a = b then begin
      a := -a;
      b := 0;
      c := a -b; end
      else
      c := b;

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
    end else
      c := b;

    exit(c);
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

describe('Codeunit permissions', () => {
    it('Short permissions string', () => {
        const code = `
codeunit 50000 MyCodeunit
{
permissions=tabledata "G/LEntry" = r;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  permissions = tabledata "G/LEntry" = r;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Long permissions string breaks line', () => {
        const code = `
codeunit 50000 MyCodeunit
{
permissions=tabledata "G/LEntry" = rim,tabledata "Dimension Set Entry"=rim, tabledata "Item Ledger Entry"=r,tabledata "Value Entry"=r;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  permissions =
    tabledata "G/LEntry" = rim,
    tabledata "Dimension Set Entry" = rim,
    tabledata "Item Ledger Entry" = r,
    tabledata "Value Entry" = r;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Permissions referencing object with namespace', () => {
        const code = `
codeunit 50000 MyCodeunit
{
permissions=tabledata Microsoft.Finance.GeneralLedger.Ledger."G/LEntry" = r;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  permissions = tabledata Microsoft.Finance.GeneralLedger.Ledger."G/LEntry" = r;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
  });

describe('Array access', () => {
    it('Accessing value in a single-dimensional array', () => {
        const code = `
codeunit 50000 MyCodeunit
{
procedure ArrayAccess()
begin
ArrayA[i] := ArrayB[i+1];
end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure ArrayAccess()
  begin
    ArrayA[i] := ArrayB[i + 1];
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Accessing value in a multidimensional array', () => {
        const code = `
codeunit 50000 MyCodeunit
{
procedure ArrayAccess()
begin
ArrayA[i,j,k] := ArrayB[1,i+1,Table."Field Name" - CallProcedure()];
end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure ArrayAccess()
  begin
    ArrayA[i, j, k] := ArrayB[1, i + 1, Table."Field Name" - CallProcedure()];
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
