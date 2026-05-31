import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Elements grouping and ordering', () => {
    it('Group global variables in table at the bottom', () => {
        const code = `
table 50000 "JustSomeTable"
{
  var Variable1: Integer;
  trigger OnInsert()
  begin
  end;

  var Variable2: Text;
}`;

        const expected = `table 50000 "JustSomeTable"
{
  trigger OnInsert()
  begin
  end;

  var
    Variable1: Integer;
    Variable2: Text;
}
`;

        return alFormat(code, {
            groupGlobalVars: "bottom"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Group global variables in table at the bottom, separate protected vars', () => {
        const code = `
table 50000 "JustSomeTable"
{
  protected var pv1: Code[10];
  var Variable1: Integer;
  trigger OnInsert()
  begin
  end;

  var Variable2: Text;
  protected var pv2: Code[10];
}`;

        const expected = `table 50000 "JustSomeTable"
{
  trigger OnInsert()
  begin
  end;

  var
    Variable1: Integer;
    Variable2: Text;

  protected var
    pv1: Code[10];
    pv2: Code[10];
}
`;

        return alFormat(code, {
            groupGlobalVars: "bottom"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Group global variables in codeunit, top placement, no properties', () => {
        const code = `
codeunit 50000 "JustSomeCodeunit"
{
  var Variable1: Integer;
  trigger OnRun()
  begin
  end;

  var Variable2: Text; Variable3: Integer;
}`;

        const expected = `codeunit 50000 "JustSomeCodeunit"
{
  var
    Variable1: Integer;
    Variable2: Text;
    Variable3: Integer;

  trigger OnRun()
  begin
  end;
}
`;

        return alFormat(code, {
            groupGlobalVars: "top"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Group global variables in table, top placement, after properties', () => {
        const code = `
table 50000 "MyTable"
{
  Editable = false;

  fields {
    field(1; "Primary Key"; Code[10]){
    }
  }

  trigger OnInsert()
  begin
  end;
  protected var pv1: Code[10];
  var Variable1: Integer;

  var Variable2: Text;
  protected var pv2: Code[10];
}`;

        const expected = `table 50000 "MyTable"
{
  Editable = false;

  var
    Variable1: Integer;
    Variable2: Text;

  protected var
    pv1: Code[10];
    pv2: Code[10];

  fields
  {
    field(1; "Primary Key"; Code[10])
    {
    }
  }

  trigger OnInsert()
  begin
  end;
}
`;

        return alFormat(code, {
            groupGlobalVars: "top"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Group global variables in page, top placement, after properties', () => {
        const code = `
page 50000 "MyPage"
{
  InsertAllowed = false;
  DeleteAllowed = false;
  protected var pv1: Code[10];
  var Variable1: Integer;
  trigger OnAfterGetRecord()
  begin
  end;

  var Variable2: Text;
  protected var pv2: Code[10];
}`;

        const expected = `page 50000 "MyPage"
{
  InsertAllowed = false;
  DeleteAllowed = false;

  var
    Variable1: Integer;
    Variable2: Text;

  protected var
    pv1: Code[10];
    pv2: Code[10];

  trigger OnAfterGetRecord()
  begin
  end;
}
`;

        return alFormat(code, {
            groupGlobalVars: "top"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Group global variables in codeunit, top placement, after properties', () => {
        const code = `
codeunit 50000 "MyCodeunit"
{
  Access = internal;

  trigger OnRun()
  begin
  end;

  var GlobalVar: Text;
}`;

        const expected = `codeunit 50000 "MyCodeunit"
{
  Access = internal;

  var
    GlobalVar: Text;

  trigger OnRun()
  begin
  end;
}
`;

        return alFormat(code, {
            groupGlobalVars: "top"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('groupGlobalVars enabled, no variables in the object', () => {
        const code = `
page 50000 MyPage
{
  layout
  {
    area(content)
    {
      field(SomePageField; Rec.TableField) {}
    }
  }
  trigger OnOpenPage()
  begin
  end;
}`;

        const expected = `page 50000 MyPage
{
  layout
  {
    area(content)
    {
      field(SomePageField; Rec.TableField)
      {
      }
    }
  }

  trigger OnOpenPage()
  begin
  end;
}
`;

        return alFormat(code, {
            groupGlobalVars: "bottom"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Group global vars in page before code', () => {
        const code = `
page 50000 MyPage
{
  layout
  {
    area(content)
    {
      field(SomePageField; Rec.TableField) {}
    }
  }
  var a: Text;

  trigger OnOpenPage()
  begin
  end;
  var b: Code[10];

  procedure Code()
  begin
  end;

  var c: Integer;
}`;

        const expected = `page 50000 MyPage
{
  layout
  {
    area(content)
    {
      field(SomePageField; Rec.TableField)
      {
      }
    }
  }

  trigger OnOpenPage()
  begin
  end;

  var
    a: Text;
    b: Code[10];
    c: Integer;

  procedure Code()
  begin
  end;
}
`;

        return alFormat(code, {
            groupGlobalVars: "beforeCode"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
