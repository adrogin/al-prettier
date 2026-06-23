import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Asserterror assertion', () => {
    it('asserterror before procedure call', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  [Test]
  procedure TestError()
  begin
    asserterror Error('Error happened!');
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  [Test]
  procedure TestError()
  begin
    asserterror Error('Error happened!');
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('asserterror before begin..end block', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  [Test]
  procedure TestError()
  begin
    asserterror begin PrepareForError(); Error('Error happened!'); end;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  [Test]
  procedure TestError()
  begin
    asserterror begin
      PrepareForError();
      Error('Error happened!');
    end;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});