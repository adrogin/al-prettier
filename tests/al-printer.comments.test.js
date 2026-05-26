import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.js';

describe('Printing comments in code statements', () => {
    it('Comment at the end of a statement list', () => {
        const code = `
codeunit 50000 MyCodeunit
{
    procedure ProcedureWithComment()
    begin
        CallAnotherProcedure();
        // This is a comment
    end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure ProcedureWithComment()
  begin
    CallAnotherProcedure();
  // This is a comment
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Comment in empty procedure without statements', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure ProcedureWithComment()
  begin
    // This is a comment
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure ProcedureWithComment()
  begin
  // This is a comment
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Comment attached to a procedure attribute', () => {
        const code = `
codeunit 50000 MyCodeunit
{
// This event is never raised
[IntegrationEvent(false, false)]
local procedure OnAfterExit()
begin
end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  // This event is never raised
  [IntegrationEvent(false, false)]
  local procedure OnAfterExit()
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Obsoleted procedure with summary comment', () => {
        const code = `
codeunit 50000 MyCodeunit
{
#if not CLEAN27
/// <summary>
/// </summary>
[Obsolete('Removed Not used anymore.', '27.0')]
[IntegrationEvent(false, false)]
local procedure OnBeforeExit()
begin
end;
#endif
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  #if not CLEAN27
  /// <summary>
  /// </summary>
  [Obsolete('Removed Not used anymore.', '27.0')]
  [IntegrationEvent(false, false)]
  local procedure OnBeforeExit()
  begin
  end;
#endif
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});