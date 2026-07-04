import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Collapse empty braces option', () => {
    it('Empty braces collapsed with default option value', () => {
        const code = `
table 50000 "Setup Table"
{
  fields
  {
    field(1; "Primary Key"; Code[10])
    {}
    field(2; "Setup Option"; Code[20])
    {}
  }
}`;

        const expected = `table 50000 "Setup Table"
{
  fields
  {
    field(1; "Primary Key"; Code[10]) {}
    field(2; "Setup Option"; Code[20]) {}
  }
}
`;

        return alFormat(code, { noLineBreaksInAttributes: false }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Empty braces collapsed when the option is set to true', () => {
        const code = `
table 50000 "Setup Table"
{
  fields
  {
    field(1; "Primary Key"; Code[10])
    {}
    field(2; "Setup Option"; Code[20])
    {}
  }
}`;

        const expected = `table 50000 "Setup Table"
{
  fields
  {
    field(1; "Primary Key"; Code[10]) {}
    field(2; "Setup Option"; Code[20]) {}
  }
}
`;

      return alFormat(code, {
          collapseEmptyBraces: true
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Empty braces expanded when the option is set to false', () => {
        const code = `
table 50000 "Setup Table"
{
  fields
  {
    field(1; "Primary Key"; Code[10])
    {}
    field(2; "Setup Option"; Code[20])
    {}
  }
}`;

        const expected = `table 50000 "Setup Table"
{
  fields
  {
    field(1; "Primary Key"; Code[10])
    {
    }
    field(2; "Setup Option"; Code[20])
    {
    }
  }
}
`;

      return alFormat(code, {
          collapseEmptyBraces: false
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Empty braces collapsed in table key definition', () => {
        const code = `
table 50000 "Setup Table"
{
  fields
  {
    field(1; "Primary Key"; Code[10])
    {
    }
  }
    keys
    {
      key(PK; "Primary Key") {

      }
    }
}`;

        const expected = `table 50000 "Setup Table"
{
  fields
  {
    field(1; "Primary Key"; Code[10]) {}
  }

  keys
  {
    key(PK; "Primary Key") {}
  }
}
`;

      return alFormat(code, {
          collapseEmptyBraces: true
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Empty braces collapsed in page field definition', () => {
        const code = `
page 50000 MyPage
{
    layout
    {
        area(content)
        {
            repeater(Group)
            {
            field(FieldName; FieldSource) {
    }}}}
}`;

        const expected = `page 50000 MyPage
{
  layout
  {
    area(content)
    {
      repeater(Group)
      {
        field(FieldName; FieldSource) {}
      }
    }
  }
}
`;

      return alFormat(code, {
          collapseEmptyBraces: true
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Empty braces expanded in page field definition when collapse option is false', () => {
        const code = `
page 50000 MyPage
{
    layout
    {
        area(content)
        {
            repeater(Group)
            {
            field(FieldName; FieldSource) {
    }}}}
}`;

        const expected = `page 50000 MyPage
{
  layout
  {
    area(content)
    {
      repeater(Group)
      {
        field(FieldName; FieldSource)
        {
        }
      }
    }
  }
}
`;

      return alFormat(code, {
          collapseEmptyBraces: false
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Empty braces collapsed in page action without properties', () => {
        const code = `
page 50000 MyPage
{
    actions
    {
        area(processing)
        {
            action(DoAction)
            {}
    }}
}`;

        const expected = `page 50000 MyPage
{
  actions
  {
    area(processing)
    {
      action(DoAction) {}
    }
  }
}
`;

      return alFormat(code, {
          collapseEmptyBraces: true
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Empty braces collapsed in empty page actions section', () => {
        const code = `
page 50000 MyPage
{
    actions
    {}
}`;

        const expected = `page 50000 MyPage
{
  actions {}
}
`;

      return alFormat(code, {
          collapseEmptyBraces: true
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Braces collapsed in fieldgroup definition when the option is enabled', () => {
        const code = `
table 50000 MyTable
{
  fields {
  field(1; "Primary Key"; Code[10]) {
  }
  field(2; "Customer No."; Code[20]) {
    }}
  keys {
  key(PK; "Primary Key") {
    }}
  fieldgroups{
  fieldgroup(Brick; "Customer No."){
  }
  }
}`;

        const expected = `table 50000 MyTable
{
  fields
  {
    field(1; "Primary Key"; Code[10]) {}
    field(2; "Customer No."; Code[20]) {}
  }

  keys
  {
    key(PK; "Primary Key") {}
  }

  fieldgroups
  {
    fieldgroup(Brick; "Customer No.") {}
  }
}
`;

      return alFormat(code, {
          collapseEmptyBraces: true
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Braces expanded in fieldgroup definition when the option is disabled', () => {
        const code = `
table 50000 MyTable
{
  fields {
  field(1; "Primary Key"; Code[10]) {
  }
  field(2; "Customer No."; Code[20]) {
    }}
  keys {
  key(PK; "Primary Key") {
    }}
  fieldgroups{
  fieldgroup(Brick; "Customer No."){
  }
  }
}`;

        const expected = `table 50000 MyTable
{
  fields
  {
    field(1; "Primary Key"; Code[10])
    {
    }
    field(2; "Customer No."; Code[20])
    {
    }
  }

  keys
  {
    key(PK; "Primary Key")
    {
    }
  }

  fieldgroups
  {
    fieldgroup(Brick; "Customer No.")
    {
    }
  }
}
`;

      return alFormat(code, {
          collapseEmptyBraces: false
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Empty braces collapsed in action reference without properties', () => {
        const code = `
page 50000 MyPage
{
    actions
    {
        area(processing)
        {
            action(DoAction)
            {}
    }
    area(Promoted) {
    actionref(DoActionPromoted; DoAction) {
    }
    }
  }
}`;

        const expected = `page 50000 MyPage
{
  actions
  {
    area(processing)
    {
      action(DoAction) {}
    }
    area(Promoted)
    {
      actionref(DoActionPromoted; DoAction) {}
    }
  }
}
`;

      return alFormat(code, {
          collapseEmptyBraces: true
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Empty braces expanded in action reference without properties when collapse option is false', () => {
        const code = `
page 50000 MyPage
{
    actions
    {
        area(processing)
        {
            action(DoAction)
            {}
    }
    area(Promoted) {
    actionref(DoActionPromoted; DoAction) {
    }
    }
  }
}`;

        const expected = `page 50000 MyPage
{
  actions
  {
    area(processing)
    {
      action(DoAction)
      {
      }
    }
    area(Promoted)
    {
      actionref(DoActionPromoted; DoAction)
      {
      }
    }
  }
}
`;

      return alFormat(code, {
          collapseEmptyBraces: false
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Printing collapsed query column and filter', () => {
        const code = `
query 50000 MyQuery
{
elements {
      dataitem(DataItemName; SourceTable)
      {
      column(ColumnName; SourceFieldName) {
      }
      filter(FilterName;SourceField){}
      }
}
}`;

        const expected = `query 50000 MyQuery
{
  elements
  {
    dataitem(DataItemName; SourceTable)
    {
      column(ColumnName; SourceFieldName) {}
      filter(FilterName; SourceField) {}
    }
  }
}
`;

      return alFormat(code, {
          collapseEmptyBraces: true
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Printing expanded query column and filter', () => {
        const code = `
query 50000 MyQuery
{
elements {
      dataitem(DataItemName; SourceTable)
      {
      column(ColumnName; SourceFieldName) {
      }
      filter(FilterName;SourceField){}
      }
}
}`;

        const expected = `query 50000 MyQuery
{
  elements
  {
    dataitem(DataItemName; SourceTable)
    {
      column(ColumnName; SourceFieldName)
      {
      }
      filter(FilterName; SourceField)
      {
      }
    }
  }
}
`;

      return alFormat(code, {
          collapseEmptyBraces: false
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

  describe('Empty labels list', () => {
    it('Empty labels list collapsed with collapse option enabled', () => {
        const code = `
report 50000 MyReport
{
labels
{}
}`;

        const expected = `report 50000 MyReport
{
  labels {}
}
`;

      return alFormat(code, {
          collapseEmptyBraces: true
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Empty labels list expanded with collapse option disabled', () => {
        const code = `
report 50000 MyReport
{
labels
{}
}`;

        const expected = `report 50000 MyReport
{
  labels
  {
  }
}
`;

        return alFormat(code, {
            collapseEmptyBraces: false
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
  });

  describe('Empty page part', () => {
    it('Empty page part collapsed with collapse option enabled', () => {
        const code = `
page 50001 "Page with factbox part"
{
  layout
  {
    area(factboxes)
    {
      part(AdditionalInfo; InfoSource)
      {}
    }
  }
}`;

        const expected = `page 50001 "Page with factbox part"
{
  layout
  {
    area(factboxes)
    {
      part(AdditionalInfo; InfoSource) {}
    }
  }
}
`;

      return alFormat(code, {
          collapseEmptyBraces: true
      }).then(formattedCode =>
          expect(formattedCode).to.equal(expected))
  });

    it('Empty page part expanded with collapse option disabled', () => {
        const code = `
page 50001 "Page with factbox part"
{
  layout
  {
    area(factboxes)
    {
      part(AdditionalInfo; InfoSource)
      {}
    }
  }
}`;

        const expected = `page 50001 "Page with factbox part"
{
  layout
  {
    area(factboxes)
    {
      part(AdditionalInfo; InfoSource)
      {
      }
    }
  }
}
`;

        return alFormat(code, {
            collapseEmptyBraces: false
        }).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
  });
});
