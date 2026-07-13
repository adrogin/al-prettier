import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Variable declarations', () => {
    it('Global record variable with quoted type', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var ApprovalEntry: Record "Approval Entry";
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    ApprovalEntry: Record "Approval Entry";
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Global record variable with quoted name', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var "Approval Entry": Record "Approval Entry";
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    "Approval Entry": Record "Approval Entry";
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Record variable as procedure parameter', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Approve(ApprovalEntry:Record "Approval Entry")
  begin end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Approve(ApprovalEntry: Record "Approval Entry")
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Record procedure parameter with var reference', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Approve(var ApprovalEntry:Record "Approval Entry")
  begin
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Approve(var ApprovalEntry: Record "Approval Entry")
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Interface procedure parameter', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  procedure Define(InvoicePosting: Interface "Invoice Posting")
  begin
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  procedure Define(InvoicePosting: Interface "Invoice Posting")
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Print a label with both Locked and Comment properties', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var TextLabel: Label 'Label',Locked=true,Comment='This is a label';
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    TextLabel: Label 'Label', Locked = true, Comment = 'This is a label';
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Print a multiline verbatim string label', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var TextLabel: Label @'Label line 1,
Label line 2';
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    TextLabel: Label @'Label line 1,
Label line 2';
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Label with multiple properties', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var TextLabel: Label 'This is a label',Locked=true,Comment='And it is locked',MaxLength=20;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    TextLabel: Label 'This is a label',
      Locked = true,
      Comment = 'And it is locked',
      MaxLength = 20;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Simple DotNet variable', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var Convert: DotNet Convert;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    Convert: DotNet Convert;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Variable with attribute', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var
    [SecurityFiltering(SecurityFilter::Ignored)]
    JobQueueEntry: Record "Job Queue Entry";
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    [SecurityFiltering(SecurityFilter::Ignored)]
    JobQueueEntry: Record "Job Queue Entry";
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Protected variables list', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  protected
  var
    ProtectedText: Text;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  protected var
    ProtectedText: Text;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Page with a PageStyle variable', () => {
        const code = `
page 50001 "Page with PageStyle"
{
layout
{
    area(Content)
    {
        field(Name; rec.Name)
        {
            StyleExpr = nameStyle;
        }
    }
}

var nameStyle : Text;

local procedure ChangeNameStyle(newPageStyle : PageStyle)
begin
    nameStyle := format(newPageStyle);
end;}
`;

        const expected = `page 50001 "Page with PageStyle"
{
  layout
  {
    area(Content)
    {
      field(Name; rec.Name)
      {
        StyleExpr = nameStyle;
      }
    }
  }

  var
    nameStyle: Text;

  local procedure ChangeNameStyle(newPageStyle: PageStyle)
  begin
    nameStyle := format(newPageStyle);
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('RecordRef variable', () => {
        const code = `
codeunit 50001 MyCodeunit
{
var RecRef: RecordRef;
}
`;

        const expected = `codeunit 50001 MyCodeunit
{
  var
    RecRef: RecordRef;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('FieldRef variable', () => {
        const code = `
codeunit 50001 MyCodeunit
{
var FieldRef: FieldRef;
}
`;

        const expected = `codeunit 50001 MyCodeunit
{
  var
    FieldRef: FieldRef;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('KeyRef variable', () => {
        const code = `
codeunit 50001 MyCodeunit
{
var KeyRef: KeyRef;
}
`;

        const expected = `codeunit 50001 MyCodeunit
{
  var
    KeyRef: KeyRef;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Action procedure parameter and Action::OK reference', () => {
        const code = `
page 50001 MyPage
{
trigger OnQueryClosePage(CloseAction: action): Boolean
begin
    if CloseAction = action::OK then
        CurrPage.DoPrecloseChecks();
end;
}
`;

        const expected = `page 50001 MyPage
{
  trigger OnQueryClosePage(CloseAction: Action): Boolean
  begin
    if CloseAction = Action::OK then
      CurrPage.DoPrecloseChecks();
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('"var" keyword is removed if not followed by variable declarations', () => {
        const code = `
codeunit 50001 MyCodeunit
{
  procedure DoStuff()
  var
  begin
  end;
}
`;

        const expected = `codeunit 50001 MyCodeunit
{
  procedure DoStuff()
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Complex variable types', () => {
    it('Array variable', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var TextArray: Array[10] of Text[100];
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    TextArray: array[10] of Text[100];
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Multidimensional array', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var Numbers:Array[10,5,3] of Integer;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    Numbers: array[10, 5, 3] of Integer;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('List variable', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var ListOfText: List of [Text[100]];
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    ListOfText: List of [Text[100]];
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Dictionary variable', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var Dict: Dictionary of [Code[20],Text[100]];
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    Dict: Dictionary of [Code[20], Text[100]];
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Option variables', () => {
    it('Generic Option variable without values', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var OptionVar: Option;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    OptionVar: Option;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Option with quoted value', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var OptionVar: Option Option1,"Option 2";
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    OptionVar: Option Option1, "Option 2";
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Option variable with leading comma', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var OptionVar: Option ,Option1,Option2,Option3;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    OptionVar: Option ,Option1, Option2, Option3;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Commas without identifiers in option declaration', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var OptionVar: Option Option1,,,,Option5,,Option7;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    OptionVar: Option Option1,,,, Option5,, Option7;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Quoted variable names', () => {
    it('Quote marks inside a quoted identifier', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var "This is ""Text""": Text;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    "This is ""Text""": Text;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Test data types', () => {
    it('TestRequestPage variable', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  SubType = Test;
  [Test]
  procedure LetsTestSomething()
  var TRP: TestRequestPage MyTest;
  begin
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  SubType = Test;

  [Test]
  procedure LetsTestSomething()
  var
    TRP: TestRequestPage MyTest;
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('TextConst variable', () => {
    it('TextConst variable with values in two languages', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var GlobalTextConst: TextConst ENU = 'My text', DAN = 'Min tekst';
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    GlobalTextConst: TextConst ENU = 'My text', DAN = 'Min tekst';
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('AL object variables', () => {
    it('Page variable type is printed with capitalized P', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var PageVar: page "My Page";
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    PageVar: Page "My Page";
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Codeunit variable type is printed with capitalized C', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var CodeunitVar: codeunit "My Codeunit";
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    CodeunitVar: Codeunit "My Codeunit";
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Record variable type is printed with capitalized R', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var RecordVar: record "My Record";
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    RecordVar: Record "My Record";
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Enum variable type is printed with capitalized E', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var EnumVar: enum "My Enum";
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    EnumVar: Enum "My Enum";
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Interface variable type is printed with capitalized I', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  var InterfaceVar: interface "My Interface";
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  var
    InterfaceVar: Interface "My Interface";
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Variable and function with name "Field" not changed to lowercase', () => {
        const code = `
codeunit 50000 MyCodeunit
{
  trigger OnRun()
  var
    RecRef: RecordRef;
    Field: FieldRef;
  begin
    Field := RecRef.Field(1);
  end;
}
`;

        const expected = `codeunit 50000 MyCodeunit
{
  trigger OnRun()
  var
    RecRef: RecordRef;
    Field: FieldRef;
  begin
    Field := RecRef.Field(1);
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Table field declaration is changed to lowercase', () => {
        const code = `
table 50000 MyTable
{
  FIELDS
  {
    FIELD(1; "Entry No."; Integer) {}
  }
}
`;

        const expected = `table 50000 MyTable
{
  fields
  {
    field(1; "Entry No."; Integer) {}
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('ControlAddin variable', () => {
        const code = `
codeunit 55555 MyCodeunit
{
  procedure InvokeControlAddin(var Addin: ControlAddin MyAddin)
  begin
    Addin.InvokeMethod();
  end;
}
`;

        const expected = `codeunit 55555 MyCodeunit
{
  procedure InvokeControlAddin(var Addin: ControlAddin MyAddin)
  begin
    Addin.InvokeMethod();
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Codeunit ID instead of name in variable type', () => {
        const code = `
codeunit 55555 MyCodeunit
{
  procedure TakeOverTheWorld()
  var Helper: Codeunit 10;
  begin
  end;
}
`;

        const expected = `codeunit 55555 MyCodeunit
{
  procedure TakeOverTheWorld()
  var
    Helper: Codeunit 10;
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Record ID instead of name in variable type', () => {
        const code = `
codeunit 55555 MyCodeunit
{
  procedure GetGLEntry()
  var GLEntry: Record 17;
  begin
  end;
}
`;

        const expected = `codeunit 55555 MyCodeunit
{
  procedure GetGLEntry()
  var
    Helper: Record 17;
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});
