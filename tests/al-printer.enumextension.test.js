import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.js';

describe('Printing EnumExtension objects', () => {
    it('Empty EnumExtension object', () => {
        const code = `
enumextension 50000 MyExtension extends "Customer Blocked"
{}`;

        const expected = `enumextension 50000 MyExtension extends "Customer Blocked"
{
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('EnumExtension and extended object with namespaces', () => {
        const code = `
namespace MyNamespace;
enumextension 50000 MyExtension extends Microsoft.Sales.Customer."Customer Blocked"
{
  value(60000; Assembly) { Caption='Assembly'; }
}`;

        const expected = `namespace MyNamespace;

enumextension 50000 MyExtension extends Microsoft.Sales.Customer."Customer Blocked"
{
  value(60000; Assembly)
  {
    Caption = 'Assembly';
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
