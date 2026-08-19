import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('PermissionSet object', () => {
    it('permissionset with one permission property', () => {
        const code = `
permissionset 50000 MyAppPermissions
{
  Permissions = tabledata MyTable = RIMD;
}`;

        const expected = `permissionset 50000 MyAppPermissions
{
  Permissions = tabledata MyTable = RIMD;
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('permissionset with multiple properties', () => {
        const code = `
permissionset 50000 MyAppPermissions
{
  Assignable = true;
  Permissions = tabledata MyTable = RIMD,
  tabledata EntryTable = ri,page MyPage = X,codeunit PostingCodeunit=X;
}`;

        const expected = `permissionset 50000 MyAppPermissions
{
  Assignable = true;
  Permissions =
    tabledata MyTable = RIMD,
    tabledata EntryTable = ri,
    page MyPage = X,
    codeunit PostingCodeunit = X;
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('System permissions', () => {
        const code = `
permissionset 5378 "Page Inspection - Objects"
{
    Assignable = false;
    Permissions =system "Tools, Zoom" = X;
}
`;

        const expected = `permissionset 5378 "Page Inspection - Objects"
{
  Assignable = false;
  Permissions = System "Tools, Zoom" = X;
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('permissionsetextension object', () => {
        const code = `
permissionsetextension 50000 ExtentionPermissions extends MyAppPermissions
{
  Assignable = true;
  Permissions = tabledata MyTable = RIMD,
  tabledata EntryTable = ri,page MyPage = X,codeunit PostingCodeunit=X;
}`;

        const expected = `permissionsetextension 50000 ExtentionPermissions extends MyAppPermissions
{
  Assignable = true;
  Permissions =
    tabledata MyTable = RIMD,
    tabledata EntryTable = ri,
    page MyPage = X,
    codeunit PostingCodeunit = X;
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});
