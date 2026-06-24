import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('While loop', () => {
    it('Simple "while" loop', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoWhile()
  begin
    while 1 > 0 do CountToInfinity();
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoWhile()
  begin
    while 1 > 0 do
      CountToInfinity();
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('"while" without action statement', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoWhile()
  begin
    while 1 > 0 do;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoWhile()
  begin
    while 1 > 0 do;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('"for..to" without action statement', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoWhile()
  begin
    for i := 1 to 100 do;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoWhile()
  begin
    for i := 1 to 100 do;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('"foreach" without action statement', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoWhile(ListOfNumbers:List of [Integer])
  var OneNumber:Integer;
  begin
    foreach OneNumber in ListOfNumbers do;
  end;
}`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoWhile(ListOfNumbers: List of [Integer])
  var
    OneNumber: Integer;
  begin
    foreach OneNumber in ListOfNumbers do;
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
