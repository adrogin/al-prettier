import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Printing interface objects', () => {
    it('Empty interface object', () => {
        const code = `interface "Empty Interface"{}`;

        const expected = `interface "Empty Interface"
{
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Simple interface definition', () => {
        const code = `
interface "Simple Interface"
{
  procedure DoSomething()
  procedure DoSomethingWithParameter(var DummyParam: Integer)
}`;

        const expected = `interface "Simple Interface"
{
  procedure DoSomething();
  procedure DoSomethingWithParameter(var DummyParam: Integer);
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Interface with properties', () => {
        const code = `
interface "Simple Interface"
{
Access=Internal;
ObsoleteState=No;
procedure DoSomething();
}`;

        const expected = `interface "Simple Interface"
{
  Access = Internal;
  ObsoleteState = No;

  procedure DoSomething();
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Print interface extension', () => {
        const code = `
interface "Simple Interface Extended" extends "Simple Interface"
{
procedure DoSomethingVeryDifferently();
}`;

        const expected = `interface "Simple Interface Extended" extends "Simple Interface"
{
  procedure DoSomethingVeryDifferently();
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Print interface extending multiple base interfaces', () => {
        const code = `
interface IFooBar extends IFoo, IBar
{
    procedure FooBar();
}`;

        const expected = `interface IFooBar extends IFoo, IBar
{
  procedure FooBar();
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Missing semicolon after procedure declaration added on print', () => {
        const code = `
interface IAmInterface
{
    procedure FooBar()
}`;

        const expected = `interface IAmInterface
{
  procedure FooBar();
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Long procedure declaration is wrapped', () => {
        const code = `
interface IAmInterface
{
    procedure InterfaceProcedure(ParameterA: Integer; ParameterB: Integer; ParameterC: Decimal);
}`;

        const expected = `interface IAmInterface
{
  procedure InterfaceProcedure(
    ParameterA: Integer;
    ParameterB: Integer;
    ParameterC: Decimal);
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Interface cast', () => {
        const code = `
codeunit 505050 SomeCodeunit
{
procedure CastInterface(intf: Interface IFoo): Interface IBar
begin
    exit(intf as IBar);
end;
}`;

        const expected = `codeunit 505050 SomeCodeunit
{
  procedure CastInterface(intf: Interface IFoo): Interface IBar
  begin
    exit(intf as IBar);
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Interface type test', () => {
        const code = `
codeunit 505050 SomeCodeunit
{
procedure TestInterface(intf: Interface IFoo)
begin
  if intf is IBar then
    Message('I also support IBar');
end;}`;

        const expected = `codeunit 505050 SomeCodeunit
{
  procedure TestInterface(intf: Interface IFoo)
  begin
    if intf is IBar then
      Message('I also support IBar');
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
