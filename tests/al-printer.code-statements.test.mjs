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

    describe('"in" condition', () => {
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

        it('Mixed "in" and "or" conditions in one statement' , () => {
            const code = `
codeunit 50000 MyCodeunit
{
  procedure EvaluateConditions(CodeValue: Code[10]; IntegerValue: Integer): Boolean
  begin
    exit(CodeValue in ['CodeA', 'CodeB', 'CodeC'] or (IntegerValue < 0 and IntegerValue > -99));
  end;
}
`;

            const expected = `codeunit 50000 MyCodeunit
{
  procedure EvaluateConditions(
    CodeValue: Code[10];
    IntegerValue: Integer): Boolean
  begin
    exit(
      CodeValue in ['CodeA', 'CodeB', 'CodeC'] or
      (IntegerValue < 0 and IntegerValue > -99));
  end;
}
`;

            return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
        });

        it('"in" and "and" conditions in one statement' , () => {
            const code = `
codeunit 50000 MyCodeunit
{
  procedure EvaluateConditions(CodeValue: Code[10]; IntegerValue: Integer): Boolean
  begin
    exit(CodeValue in ['CodeA', 'CodeB', 'CodeC'] and (IntegerValue < 0 and IntegerValue > -99));
  end;
}
`;

            const expected = `codeunit 50000 MyCodeunit
{
  procedure EvaluateConditions(
    CodeValue: Code[10];
    IntegerValue: Integer): Boolean
  begin
    exit(
      CodeValue in ['CodeA', 'CodeB', 'CodeC'] and
      (IntegerValue < 0 and IntegerValue > -99));
  end;
}
`;

            return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
        });

        it('"OR" expressions inside the "IN" expression' , () => {
            const code = `
codeunit 50000 MyCodeunit
{
  procedure EvaluateConditions(): Boolean
  begin
    exit(true in [ValueA or ValueB or ValueC]);
  end;
}
`;

            const expected = `codeunit 50000 MyCodeunit
{
  procedure EvaluateConditions(): Boolean
  begin
    exit(true in [ValueA or ValueB or ValueC]);
  end;
}
`;

            return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
        });

        it('"IN" operator with long list of conditions wraps line' , () => {
            const code = `
codeunit 50000 MyCodeunit
{
  procedure EvaluateConditions(CodeValue: Code[10])
  begin
    if CodeValue in ['LongCodeValue1', 'LongCodeValue2', 'LongCodeValue3', 'LongCodeValue4', 'LongCodeValue5'] then;
  end;
}
`;

            const expected = `codeunit 50000 MyCodeunit
{
  procedure EvaluateConditions(CodeValue: Code[10])
  begin
    if CodeValue in [
      'LongCodeValue1',
      'LongCodeValue2',
      'LongCodeValue3',
      'LongCodeValue4',
      'LongCodeValue5']
    then;
  end;
}
`;

            return alFormat(code).then(formattedCode =>
                expect(formattedCode).to.equal(expected))
        });
    });

    describe('Long "if" condition breaking the line', () => {
        it('Long condition breaking the line must be printed with indent', () => {
            const code = `
codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    if VeryLongVariableName = AnotherLongVariableName and YetAnotherConditionCheckInThisProcedure() then begin a := b;end;
  end;
}
`;

            const expected = `codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    if VeryLongVariableName = AnotherLongVariableName and
      YetAnotherConditionCheckInThisProcedure()
    then begin
      a := b;
    end;
  end;
}
`;

            return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
        });
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

    it('Empty else branch without trailing semicolon - printer adds the missing semicolon', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of
    Value1:
      CallProcedure1();
    else
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
        ;
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty else branch with trailing semicolon - extra semicolon is not added', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomething()
  begin
    case Option of
    Value1:
      CallProcedure1();
    else;
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
        ;
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

    it('Case without options', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    case a of end;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    case a of
    end;
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

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Boolean assignment with a long "in" operator breaking the line', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    BoolValue := SomeVariable in [LongVariableName1, LongVariableName2,LongVariableName3,LongVariableName4];
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    BoolValue :=
      SomeVariable in [
        LongVariableName1,
        LongVariableName2,
        LongVariableName3,
        LongVariableName4];
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Verbatim string in procedure arguments', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin CallProcedure(@'multiple
        string
        argument');
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
    CallProcedure(@'multiple
        string
        argument');
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
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

    it('Get character from an array of strings', () => {
        const code = `
codeunit 50000 MyCodeunit
{
procedure ArrayAccess()
var
  ArrayOfStrings: array[10] of Text[50];
begin
Char := ArrayOfStrings[1][20];
end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure ArrayAccess()
  var
    ArrayOfStrings: array[10] of Text[50];
  begin
    Char := ArrayOfStrings[1][20];
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Get character from a text function return value', () => {
        const code = `
codeunit 50000 MyCodeunit
{
    internal procedure GetDecimalSeparator(): Text
    begin
        exit(Format(5.5) [2]);
    end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  internal procedure GetDecimalSeparator(): Text
  begin
    exit(Format(5.5)[2]);
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});

describe('Ternary operator', () => {
    it('Simple ternary operator', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Ternary()
  begin
    A := B = C ? D : E;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Ternary()
  begin
    A := B = C ? D : E;
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Long ternary with line wrapping', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Ternary()
  begin
    VeryLongVariableName := AnotherVeryLongVariable = SomeValueProbablyZero ? AssignSomethingHere : OtherwiseAssignSomethingElse;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Ternary()
  begin
    VeryLongVariableName :=
      AnotherVeryLongVariable = SomeValueProbablyZero
        ? AssignSomethingHere
        : OtherwiseAssignSomethingElse;
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});

describe('Shorthand operators', () => {
    it('Plus assign operator', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Shorthand()
  begin
    A += B;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Shorthand()
  begin
    A += B;
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Minus assign operator', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Shorthand()
  begin
    A -= B;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Shorthand()
  begin
    A -= B;
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Multiply assign operator', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Shorthand()
  begin
    A *= B;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Shorthand()
  begin
    A *= B;
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Divide assign operator', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Shorthand()
  begin
    A /= B;
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Shorthand()
  begin
    A /= B;
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});

describe('Data types and identifiers as object members', () => {
    it('Record function on FieldRef', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure CallRecord()
  begin
    RecRef := FieldRef.Record();
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure CallRecord()
  begin
    RecRef := FieldRef.Record();
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});

describe('Object definition keywords as AL identifiers', () => {
    it('Adding value to list', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure AddOne()
  var NumbersList:List of [Integer];
  begin
    NumbersList.Add(1);
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure AddOne()
  var
    NumbersList: List of [Integer];
  begin
    NumbersList.Add(1);
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Record Modify function', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure ModifyRecord(var Buf: Record "Name/Value Buffer")
  begin
    Buf.Modify(true);
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure ModifyRecord(var Buf: Record "Name/Value Buffer")
  begin
    Buf.Modify(true);
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('OptionMembers as a function name must be successfully parsed', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure GetOptionMembers(FieldRef: FieldRef): Text
  begin
    exit(FieldRef.OptionMembers());
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure GetOptionMembers(FieldRef: FieldRef): Text
  begin
    exit(FieldRef.OptionMembers());
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});

describe('Repeat..until loop', () => {
    it('Empty repeat..util without code statements', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Compare()
  begin
    repeat until a=b;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Compare()
  begin
    repeat
    until a = b;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Code inside repeat..util loop is correctly indented', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Compare()
  begin
    repeat a := c+d;until a=b;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Compare()
  begin
    repeat
      a := c + d;
    until a = b;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
