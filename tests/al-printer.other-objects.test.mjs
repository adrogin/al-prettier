import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Profile object', () => {
    it('Print profile', () => {
        const code = `
profile TheBoss
{
    Description = 'The Boss';
    RoleCenter = "Business Manager Role Center";
    Customizations = MyCustomization;
    Caption = 'Boss';
}`;

        const expected = `profile TheBoss
{
  Description = 'The Boss';
  RoleCenter = "Business Manager Role Center";
  Customizations = MyCustomization;
  Caption = 'Boss';
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Print profile extension', () => {
        const code = `
profileextension MyProfileExt extends "Business Manager"
{ 
    ProfileDescription = 'A detailed description of who is this profile for, why/how to use it (etc)'; 
    RoleCenter = MyNewRoleCenter;
    Customizations = MyCustomization;
} `;

        const expected = `profileextension MyProfileExt extends "Business Manager"
{
  ProfileDescription = 'A detailed description of who is this profile for, why/how to use it (etc)';
  RoleCenter = MyNewRoleCenter;
  Customizations = MyCustomization;
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});

describe('Page customization object', () => {
    it('Print page customization', () => {
        const code = `
pagecustomization MyCustomization customizes "Customer List"
{
    actions
    {
        moveafter(Orders; "Blanket Orders")

        modify(NewSalesBlanketOrder)
        {
            Visible = false;
        }

    }
}`;

        const expected = `pagecustomization MyCustomization customizes "Customer List"
{
  actions
  {
    moveafter(Orders; "Blanket Orders")
    modify(NewSalesBlanketOrder)
    {
      Visible = false;
    }
  }
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});

describe('Namespace tests', () => {
    it('Source file containing only namespace without object', () => {
        return alFormat('namespace My.Namespace;').then(formattedCode => expect(formattedCode).to.equal('namespace My.Namespace;\n'));
    });
});
