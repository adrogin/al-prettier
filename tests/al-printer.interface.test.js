import { describe, it } from 'mocha';
import { expect } from 'chai';
import antlr4 from 'antlr4';
import ALParser from '../../algrammar/JS/ALParser.js';
import printer from '../plugin/printer.js';
import * as prettier from "prettier";
import { alFormat } from './testUtils.js';

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
});
