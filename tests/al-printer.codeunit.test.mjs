import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Codeunits with namespaces', () => {
    it('Namespace declaration before a codeunit object', () => {
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

    it('Namespace declaration and using references', () => {
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

    it('Permissions property with ID operations', () => {
        const code = `
codeunit 50000 MyCodeunit
{
permissions=tabledata MyTable = ID;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  permissions = tabledata MyTable = ID;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Access property in codeunits', () => {
    it('Codeunit with internal access property', () => {
        const code = `
codeunit 55000 "Codeunit with Access Property"
{
Access=Internal;
trigger OnRun()
begin
end;
}`;

        const expected = `codeunit 55000 "Codeunit with Access Property"
{
  Access = Internal;

  trigger OnRun()
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});
