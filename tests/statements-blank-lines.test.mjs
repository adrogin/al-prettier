import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

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

    it('Blank line is not inserted when original statement is wrapped in two lines', () => {
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

    it('No extra line break before case if one existed in source', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  internal procedure ShowDocument()
  begin
      if SourceDocumentNo = '' then
          exit;

      case SourceDocument of
          SourceDocument::"Sales Return Order":
              ;
      end;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  internal procedure ShowDocument()
  begin
    if SourceDocumentNo = '' then
      exit;

    case SourceDocument of
      SourceDocument::"Sales Return Order":
        ;
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('No extra line break after case if one existed in source', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  internal procedure ShowDocument()
  begin
      case SourceDocument of
          SourceDocument::"Sales Return Order":
              ;
      end;

      if SourceDocumentNo = '' then
          exit;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  internal procedure ShowDocument()
  begin
    case SourceDocument of
      SourceDocument::"Sales Return Order":
        ;
    end;

    if SourceDocumentNo = '' then
      exit;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Blank line added between two consecutive case blocks', () => {
        const code = `
codeunit 50000 MyCodeunit
{
procedure TwoCases()
begin
  case a of
    1: exit;
  end;
  case b of
    2: exit;
  end;
end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure TwoCases()
  begin
    case a of
      1:
        exit;
    end;

    case b of
      2:
        exit;
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('No line break added between two consecutive case blocks if one exists in source', () => {
        const code = `
codeunit 50000 MyCodeunit
{
procedure TwoCases()
begin
  case a of
    1: exit;
  end;

  case b of
    2: exit;
  end;
end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure TwoCases()
  begin
    case a of
      1:
        exit;
    end;

    case b of
      2:
        exit;
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
