import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Files containing multiple objects', () => {
    it('File with namespace and two objects', () => {
        const code = `
namespace Me.AndMyBrandNew.Namespace;
using SomeOtherNamespace;

interface SomePublicInterface
{
}

codeunit 50000 MyCodeunit implements SomePublicInterface
{
}
`;

        const expected = `namespace Me.AndMyBrandNew.Namespace;

using SomeOtherNamespace;

interface SomePublicInterface
{
}

codeunit 50000 MyCodeunit implements SomePublicInterface
{
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});
