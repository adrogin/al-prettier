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

    it('Enum value implementing two interfaces', () => {
        const code = `
enum 55000 "Enum with implementation" implements ITestInterface, IAnotherTestInterface
{
    value(0; Value0) { Caption = 'Value 0'; 
    Implementation = ITestInterface = InterfaceImplementationCodeunit,IAnotherTestInterface = SomeOtherCodeunit;
    }
}`;

        const expected = `enum 55000 "Enum with implementation" implements ITestInterface, IAnotherTestInterface
{
  value(0; Value0)
  {
    Caption = 'Value 0';
    Implementation =
      ITestInterface = InterfaceImplementationCodeunit,
      IAnotherTestInterface = SomeOtherCodeunit;
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Enum value implementing three interfaces', () => {
        const code = `
enum 55000 "Enum with implementation" implements ITestInterface1, ITestInterface2, ITestInterface3
{
    value(0; Value0) { Caption = 'Value 0'; 
    Implementation = ITestInterface1 = InterfaceImplementation1,ITestInterface2 = InterfaceImplementation2,ITestInterface3 = InterfaceImplementation3;
    }
}`;

        const expected = `enum 55000 "Enum with implementation" implements ITestInterface1, ITestInterface2, ITestInterface3
{
  value(0; Value0)
  {
    Caption = 'Value 0';
    Implementation =
      ITestInterface1 = InterfaceImplementation1,
      ITestInterface2 = InterfaceImplementation2,
      ITestInterface3 = InterfaceImplementation3;
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Enum with default implementation for multiple interfaces', () => {
        const code = `
enum 55000 "Enum with implementation" implements ITestInterface, IAnotherTestInterface
{
    DefaultImplementation = ITestInterface = InterfaceImplementationCodeunit,IAnotherTestInterface = SomeOtherCodeunit;
    value(0; Value0) { Caption = 'Value 0'; 
    }
}`;

        const expected = `enum 55000 "Enum with implementation" implements ITestInterface, IAnotherTestInterface
{
  DefaultImplementation =
    ITestInterface = InterfaceImplementationCodeunit,
    IAnotherTestInterface = SomeOtherCodeunit;

  value(0; Value0)
  {
    Caption = 'Value 0';
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});
