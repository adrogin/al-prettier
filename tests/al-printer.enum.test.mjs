import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Formatting of the Enum object', () => {
    it('Enum with multiple values', () => {
        const code = `
enum 55000 MyEnum
{
    value(0; Value0) { Caption = 'Value 0'; }
    value(1; Value1) { Caption = 'Value 1'; }
    value(2; Value2) { Caption = 'Value 2'; }
}`;

        const expected = `enum 55000 MyEnum
{
  value(0; Value0)
  {
    Caption = 'Value 0';
  }
  value(1; Value1)
  {
    Caption = 'Value 1';
  }
  value(2; Value2)
  {
    Caption = 'Value 2';
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Enum with implementation properties', () => {
        const code = `
enum 55000 "Enum with implementation" implements ITestInterface
{
    Extensible=true;
    DefaultImplementation=ITestInterface="Default Impl. Codeunit";
    value(0; Value0) { Caption = 'Value 0'; Implementation = ITestInterface = "Option 0 Implementation"; }
}`;

        const expected = `enum 55000 "Enum with implementation" implements ITestInterface
{
  Extensible = true;
  DefaultImplementation = ITestInterface = "Default Impl. Codeunit";

  value(0; Value0)
  {
    Caption = 'Value 0';
    Implementation = ITestInterface = "Option 0 Implementation";
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});
