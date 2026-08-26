import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Remove Empty Elements option', () => {
    it('Table fieldgroups', () => {
        const code = `
table 50000 "Table with empty fieldgroups"
{
  fieldgroups
  {
  }
}`;

        const expected = `table 50000 "Table with empty fieldgroups"
{
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty page layout', () => {
        const code = `
page 50000 "Page with empty layout"
{
  layout
  {
  }
  actions {
  area(navigation) {
      action(RunAnotherPage)
      {
        RunObject = Page "Another Page";
      }
    }
  }
}`;

        const expected = `page 50000 "Page with empty layout"
{
  actions
  {
    area(navigation)
    {
      action(RunAnotherPage)
      {
        RunObject = Page "Another Page";
      }
    }
  }
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty page actions block', () => {
        const code = `
page 50000 "Page with empty actions"
{
  layout
  {
    area(content)
    {
      field(SomePageField; Rec.TableField) {}
    }
  }
  actions {
  }
}`;

        const expected = `page 50000 "Page with empty actions"
{
  layout
  {
    area(content)
    {
      field(SomePageField; Rec.TableField) {}
    }
  }
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty page actions between layout and triggers', () => {
        const code = `
page 50000 "Page with empty actions"
{
  layout
  {
    area(content)
    {
      field(SomePageField; Rec.TableField) {}
    }
  }

  actions {
  }

  trigger OnOpenPage()
  begin
  end;
}`;

        const expected = `page 50000 "Page with empty actions"
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
}
`;

        return alFormat(code, {
            removeEmptyElements: true
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty page actions, both options enabled', () => {
        const code = `
page 50000 "Page with empty actions"
{
  layout
  {
    area(content)
    {
      field(SomePageField; Rec.TableField) {}
    }
  }

  actions {
  }

  trigger OnOpenPage()
  begin
  end;
}`;

        const expected = `page 50000 "Page with empty actions"
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
}
`;

        return alFormat(code, {
            removeEmptyElements: true,
            groupGlobalVars: "bottom"
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Report with empty request page', () => {
        const code = `
report 50000 "Report with empty request page"
{
  Caption = 'Report with empty request page';
  requestpage {
    layout {}
    actions {}
  }
    trigger OnPreReport()
    begin
    end;
}`;

        const expected = `report 50000 "Report with empty request page"
{
  Caption = 'Report with empty request page';

  trigger OnPreReport()
  begin
  end;
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Report with empty labels section', () => {
        const code = `
report 50000 "Report with empty labels section"
{
  Caption = 'This is a report';
  labels {}
    trigger OnPreReport()
    begin
    end;
}`;

        const expected = `report 50000 "Report with empty labels section"
{
  Caption = 'This is a report';

  trigger OnPreReport()
  begin
  end;
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty request page in XMLport is removed when option is on', () => {
        const code = `
xmlport 50001 MyTestXmlPort
{
  schema
  {
    textelement(RootNode)
    {
      tableelement(TableElement; "TableElement Source")
      {
        fieldelement(DocumentType; TableElement."Document Type") {}
      }
    }
  }

  requestpage
  {
    layout
    {
    }
  }
}`;

        const expected = `xmlport 50001 MyTestXmlPort
{
  schema
  {
    textelement(RootNode)
    {
      tableelement(TableElement; "TableElement Source")
      {
        fieldelement(DocumentType; TableElement."Document Type") {}
      }
    }
  }
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty request page in XMLport is preserved when option is off', () => {
        const code = `
xmlport 50001 MyTestXmlPort
{
  schema
  {
    textelement(RootNode)
    {
      tableelement(TableElement; "TableElement Source")
      {
        fieldelement(DocumentType; TableElement."Document Type") {}
      }
    }
  }

  requestpage
  {
    layout
    {
    }
  }
}`;

        const expected = `xmlport 50001 MyTestXmlPort
{
  schema
  {
    textelement(RootNode)
    {
      tableelement(TableElement; "TableElement Source")
      {
        fieldelement(DocumentType; TableElement."Document Type") {}
      }
    }
  }

  requestpage
  {
    layout {}
  }
}
`;

        return alFormat(code, { removeEmptyElements: false }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Printing page views with Remove Empty Elements option', () => {
    it('Empty views section is deleted with Remove Empty Elements on', () => {
        const code = `
page 50001 "Page With View"
{
  layout
  {
    area(Content)
    {
        field(FixedField1; FieldDataSource1) {}
    }
  }

  views
  {
  }
}`;

        const expected = `page 50001 "Page With View"
{
  layout
  {
    area(Content)
    {
      field(FixedField1; FieldDataSource1) {}
    }
  }
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty views section is preserved with Remove Empty Elements off', () => {
        const code = `
page 50001 "Page With View"
{
  layout
  {
    area(Content)
    {
        field(FixedField1; FieldDataSource1) {}
    }
  }

  views
  {
  }
}`;

        const expected = `page 50001 "Page With View"
{
  layout
  {
    area(Content)
    {
      field(FixedField1; FieldDataSource1) {}
    }
  }

  views {}
}
`;

        return alFormat(code, { removeEmptyElements: false }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Printing analysis views with Remove Empty Elements option', () => {
    it('Empty analysisviews section is deleted with Remove Empty Elements on', () => {
        const code = `
page 50001 "Page With View"
{
  layout
  {
    area(Content)
    {
        field(FixedField1; FieldDataSource1) {}
    }
  }

  analysisviews
  {
  }
}`;

        const expected = `page 50001 "Page With View"
{
  layout
  {
    area(Content)
    {
      field(FixedField1; FieldDataSource1) {}
    }
  }
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty analysisviews section is preserved with Remove Empty Elements off', () => {
        const code = `
page 50001 "Page With View"
{
  layout
  {
    area(Content)
    {
        field(FixedField1; FieldDataSource1) {}
    }
  }

  analysisviews
  {
  }
}`;

        const expected = `page 50001 "Page With View"
{
  layout
  {
    area(Content)
    {
      field(FixedField1; FieldDataSource1) {}
    }
  }

  analysisviews {}
}
`;

        return alFormat(code, { removeEmptyElements: false }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
