import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Entitlement object', () => {
    it('Basic entitlement', () => {
        const code = `
entitlement "Delegated Admin agent - Partner"
{
    Type = Role;
    RoleType = Delegated;
    Id = '00000000-0000-0000-0000-000000000007';

    ObjectEntitlements = MyApp_PartnerFullAccessPermissionSet;
}`;

        const expected = `entitlement "Delegated Admin agent - Partner"
{
  Type = Role;
  RoleType = Delegated;
  Id = '00000000-0000-0000-0000-000000000007';
  ObjectEntitlements = MyApp_PartnerFullAccessPermissionSet;
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Multiple entitlements in one file', () => {
        const code = `
entitlement "Delegated Admin agent - Partner"
{
    Type = Role;
    RoleType = Delegated;
    Id = '00000000-0000-0000-0000-000000000007';

    ObjectEntitlements = MyApp_PartnerFullAccessPermissionSet;
    }
entitlement BC_ApplicationWithAPIRWScope
{
    Type = ApplicationScope;
    Id = 'API.ReadWrite.All';
}
entitlement BC_ApplicationWithAutomationScope
{
    Type = ApplicationScope;
    Id = 'Automation.ReadWrite.All';
}`;

        const expected = `entitlement "Delegated Admin agent - Partner"
{
  Type = Role;
  RoleType = Delegated;
  Id = '00000000-0000-0000-0000-000000000007';
  ObjectEntitlements = MyApp_PartnerFullAccessPermissionSet;
}

entitlement BC_ApplicationWithAPIRWScope
{
  Type = ApplicationScope;
  Id = 'API.ReadWrite.All';
}

entitlement BC_ApplicationWithAutomationScope
{
  Type = ApplicationScope;
  Id = 'Automation.ReadWrite.All';
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});