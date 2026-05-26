import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.js';

describe('No line breaks in attributes option', () => {
    it('Long attribute breaks line with option disabled', () => {
        const code = `
codeunit 50000 "MyCodeunit"
{
  [Obsolete('A very long and detailed text describing the reson for procedure obsolescence', '99.0')]
  procedure ProcedureWithAttribute()
  begin
  end;
}`;

        const expected = `codeunit 50000 "MyCodeunit"
{
  [Obsolete(
    'A very long and detailed text describing the reson for procedure obsolescence',
    '99.0')]
  procedure ProcedureWithAttribute()
  begin
  end;
}
`;

        return alFormat(code, { noLineBreaksInAttributes: false }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Long attribute remains in single line with option enabled', () => {
        const code = `
codeunit 50000 "MyCodeunit"
{
  [Obsolete('A very long and detailed text describing the reson for procedure obsolescence', '99.0')]
  procedure ProcedureWithAttribute()
  begin
  end;
}`;

        const expected = `codeunit 50000 "MyCodeunit"
{
  [Obsolete('A very long and detailed text describing the reson for procedure obsolescence', '99.0')]
  procedure ProcedureWithAttribute()
  begin
  end;
}
`;

        return alFormat(code, { noLineBreaksInAttributes: true }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
