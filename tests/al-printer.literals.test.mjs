import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Formatting of literals', () => {
    it('Date literal', () => {
        const code = `
codeunit 55000 MyCodeunit
{
  trigger OnRun()
  begin
    DateVar := 01012099D;
  end;
}
`;

        const expected = `codeunit 55000 MyCodeunit
{
  trigger OnRun()
  begin
    DateVar := 01012099D;
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Zero date literal', () => {
        const code = `
codeunit 55000 MyCodeunit
{
  trigger OnRun()
  begin
    DateVar := 0D;
  end;
}
`;

        const expected = `codeunit 55000 MyCodeunit
{
  trigger OnRun()
  begin
    DateVar := 0D;
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Time literal', () => {
        const code = `
codeunit 55000 MyCodeunit
{
  trigger OnRun()
  begin
    TimeVar := 221545T;
  end;
}
`;

        const expected = `codeunit 55000 MyCodeunit
{
  trigger OnRun()
  begin
    TimeVar := 221545T;
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Time literal with milliseconds', () => {
        const code = `
codeunit 55000 MyCodeunit
{
  trigger OnRun()
  begin
    TimeVar := 235959.999T;
  end;
}
`;

        const expected = `codeunit 55000 MyCodeunit
{
  trigger OnRun()
  begin
    TimeVar := 235959.999T;
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('DateTime literal', () => {
        const code = `
codeunit 55000 MyCodeunit
{
  trigger OnRun()
  begin
    DateTimeVar := 0DT;
  end;
}
`;

        const expected = `codeunit 55000 MyCodeunit
{
  trigger OnRun()
  begin
    DateTimeVar := 0DT;
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('BigInt literal', () => {
        const code = `
codeunit 55000 MyCodeunit
{
  trigger OnRun()
  begin
    BigIntVar := 999L;
  end;
}
`;

        const expected = `codeunit 55000 MyCodeunit
{
  trigger OnRun()
  begin
    BigIntVar := 999L;
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});
