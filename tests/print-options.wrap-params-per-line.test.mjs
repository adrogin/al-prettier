import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Wrap one parameter per line option - arguments list', () => {
    it('Each argument is printed on a separate line with option enabled', () => {
        const code = `
codeunit 50000 "MyCodeunit"
{
  procedure DoSomeStuff()
  begin
    CallAnotherProcedureWithManyParameters(LongVariableName1,LongVariableName2,LongVariableName3,LongVariableName4,AndYetAnotherEvenLongerVariableName);
  end;
}`;

        const expected = `codeunit 50000 "MyCodeunit"
{
  procedure DoSomeStuff()
  begin
    CallAnotherProcedureWithManyParameters(
      LongVariableName1,
      LongVariableName2,
      LongVariableName3,
      LongVariableName4,
      AndYetAnotherEvenLongerVariableName);
  end;
}
`;

        return alFormat(code, { wrapOneParameterPerLine: true }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Arguments are wrapped on max print width with option disabled', () => {
        const code = `
codeunit 50000 "MyCodeunit"
{
  procedure DoSomeStuff()
  begin
    CallAnotherProcedureWithManyParameters(LongVariableName1,LongVariableName2,LongVariableName3,LongVariableName4,AndYetAnotherEvenLongerVariableName);
  end;
}`;

        const expected = `codeunit 50000 "MyCodeunit"
{
  procedure DoSomeStuff()
  begin
    CallAnotherProcedureWithManyParameters(
      LongVariableName1, LongVariableName2, LongVariableName3, LongVariableName4,
      AndYetAnotherEvenLongerVariableName);
  end;
}
`;

        return alFormat(code, { wrapOneParameterPerLine: false }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Wrap one argument per line option - procedure declaration', () => {
    it('Each parameter in procedure declaration is printed on a separate line with option enabled', () => {
        const code = `
codeunit 50000 "MyCodeunit"
{
  procedure ProcedureWithAVeryLongNameAndParametersList(SomeLongParameterName1: Text; SomeLongParameterName2: Text; AnotherVeryLongParameterName: Integer; AndTheLongestOfAllParameterNames: Decimal)
  begin
  end;
}`;

        const expected = `codeunit 50000 "MyCodeunit"
{
  procedure ProcedureWithAVeryLongNameAndParametersList(
    SomeLongParameterName1: Text;
    SomeLongParameterName2: Text;
    AnotherVeryLongParameterName: Integer;
    AndTheLongestOfAllParameterNames: Decimal)
  begin
  end;
}
`;

        return alFormat(code, { wrapOneParameterPerLine: true }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Parameters are wrapped on max print width with option disabled', () => {
        const code = `
codeunit 50000 "MyCodeunit"
{
  procedure ProcedureWithAVeryLongNameAndParametersList(SomeLongParameterName1: Text; SomeLongParameterName2: Text; AnotherVeryLongParameterName: Integer; AndTheLongestOfAllParameterNames: Decimal)
  begin
  end;
}`;

        const expected = `codeunit 50000 "MyCodeunit"
{
  procedure ProcedureWithAVeryLongNameAndParametersList(
    SomeLongParameterName1: Text; SomeLongParameterName2: Text;
    AnotherVeryLongParameterName: Integer;
    AndTheLongestOfAllParameterNames: Decimal)
  begin
  end;
}
`;

        return alFormat(code, { wrapOneParameterPerLine: false }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
