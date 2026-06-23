import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

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

    it('Simple obsoleted procedure', () => {
        const code = `
codeunit 50000 MyCodeunit
{
#if not CLEAN27
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

    it('Obsoleted directive with else branch', () => {
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
#else
[IntegrationEvent(false, false)]
local procedure OnBrandNewEvent()
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

#else
  [IntegrationEvent(false, false)]
  local procedure OnBrandNewEvent()
  begin
  end;
#endif
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Region marker around code statement', () => {
        const code = `
codeunit 50000 MyCodeunit
{
#region OnBeforeDoStuff

[IntegrationEvent(false, false)]
local procedure OnBeforeDoStuff()
begin
end;

#endregion

#region OnAfterDoStuff

[IntegrationEvent(false, false)]
local procedure OnAfterDoStuff()
begin
end;

#endregion
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
#region OnBeforeDoStuff

  [IntegrationEvent(false, false)]
  local procedure OnBeforeDoStuff()
  begin
  end;

#endregion

#region OnAfterDoStuff

  [IntegrationEvent(false, false)]
  local procedure OnAfterDoStuff()
  begin
  end;

#endregion
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Region marker around code statement without blank lines', () => {
        const code = `
codeunit 50000 MyCodeunit
{
#region OnBeforeDoStuff
[IntegrationEvent(false, false)]
local procedure OnBeforeDoStuff()
begin
end;
#endregion
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
#region OnBeforeDoStuff
  [IntegrationEvent(false, false)]
  local procedure OnBeforeDoStuff()
  begin
  end;
#endregion
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Region marker without blank lines and following variable', () => {
        const code = `
codeunit 50000 MyCodeunit
{
#region OnBeforeDoStuff
[IntegrationEvent(false, false)]
local procedure OnBeforeDoStuff()
begin
end;
#endregion
var GlobalText: Text;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
#region OnBeforeDoStuff
  [IntegrationEvent(false, false)]
  local procedure OnBeforeDoStuff()
  begin
  end;
#endregion

  var
    GlobalText: Text;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Two pragmas around code line', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
#pragma warning disable XX001
#pragma warning disable XX002
    CallProcedure();
#pragma warning restore XX001
#pragma warning restore XX002
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  trigger OnRun()
  begin
#pragma warning disable XX001
#pragma warning disable XX002
    CallProcedure();
#pragma warning restore XX001
#pragma warning restore XX002
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Blank line is preserved between multiple single-line comments', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  // Some public methods here

  /// <summary>
  /// Believe me, this is very important!
  /// </summary>
  procedure DoVeryImportantStuff()
  begin
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  // Some public methods here

  /// <summary>
  /// Believe me, this is very important!
  /// </summary>
  procedure DoVeryImportantStuff()
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Blank line is preserved between two procedures with summary comments, variables grouped on top', () => {
        const code = `
codeunit 70000 TestCodeunit
{
    /// <summary>
    /// This procedure is used to test the AL Prettier.
    /// </summary>
    local procedure MyProcedure()
    begin
    end;

    /// <summary>
    /// This procedure is used to test the AL Prettier.
    /// </summary>
    local procedure MyProcedure2()
    begin
    end;
}`;

        const expected = `codeunit 70000 TestCodeunit
{
  /// <summary>
  /// This procedure is used to test the AL Prettier.
  /// </summary>
  local procedure MyProcedure()
  begin
  end;

  /// <summary>
  /// This procedure is used to test the AL Prettier.
  /// </summary>
  local procedure MyProcedure2()
  begin
  end;
}
`;

        return alFormat(code, {
            groupGlobalVars: "top"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('One blank line is kept before a comment inside a procedure', () => {
        const code = `
codeunit 70000 TestCodeunit
{
  local procedure MyProcedure()
  begin
    // Calling procedure 1
    ProcedureOne();

    // Calling procedure 2
    ProcedureToo();
  end;
}`;

        const expected = `codeunit 70000 TestCodeunit
{
  local procedure MyProcedure()
  begin
    // Calling procedure 1
    ProcedureOne();

    // Calling procedure 2
    ProcedureToo();
  end;
}
`;

        return alFormat(code, {
            groupGlobalVars: "top"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Formatting preserves original indentation of region markers', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  #region First region

  local procedure ProcedureOne()
  begin
  end;

  #endregion

  #region Second region

  local procedure ProcedureToo()
  begin
  end;

  #endregion
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  #region First region

  local procedure ProcedureOne()
  begin
  end;

  #endregion

  #region Second region

  local procedure ProcedureToo()
  begin
  end;

  #endregion
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Own line comment following a trailing comment with blank line between', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure DoSomeStuff()
  begin
    CallProcedureOne(); // Calling the first procedure

    // Now calling the second one
    // And describing it in a very detailed multiline comment
    CallProcedureTwo();

    CallProcedureThree(); // And this is the third procedure
    // And the punchline for the whole block
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure DoSomeStuff()
  begin
    CallProcedureOne(); // Calling the first procedure

    // Now calling the second one
    // And describing it in a very detailed multiline comment
    CallProcedureTwo();

    CallProcedureThree(); // And this is the third procedure
  // And the punchline for the whole block
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Own line comment followed by blank line between code blocks', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  #region Do important stuff here
  procedure DoSomeStuff()
  begin
  end;
  #endregion

  var
    GlobalVar: Integer;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  #region Do important stuff here
  procedure DoSomeStuff()
  begin
  end;
  #endregion

  var
    GlobalVar: Integer;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
