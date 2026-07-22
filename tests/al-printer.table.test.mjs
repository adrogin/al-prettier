import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Basic table structure', () => {
    it('Table object without any elements', () => {
        return alFormat("table 50000 MyTable {}").then(formattedCode =>
            expect(formattedCode).to.equal("table 50000 MyTable\n{\n}\n"));
    });

    it('Table with two fields', () => {
        return alFormat("table 50000 MyTable {fields{field(1; ID; Integer){} field(2; Description; Text[100]){}}}").then(formattedCode =>
            expect(formattedCode).to.equal(
                `table 50000 MyTable
{
  fields
  {
    field(1; ID; Integer) {}
    field(2; Description; Text[100]) {}
  }
}
`
            ));
    });

    it('Table field with multiple properties', () => {
        return alFormat("table 50000 MyTable {fields{field(1; ID; Integer){ Caption='ID'; Editable=false;} }}").then(formattedCode =>
            expect(formattedCode).to.equal(
                `table 50000 MyTable
{
  fields
  {
    field(1; ID; Integer)
    {
      Caption = 'ID';
      Editable = false;
    }
  }
}
`
            ));
    });


    it('Table with properties and fields', () => {
        return alFormat("table 50000 MyTable {Caption='My Table';DataClassification = CustomerContent; TableType = Temporary; fields{field(1; ID; Integer){ Caption='ID'; Editable=false;} field(2; Description; Text[100]){} }}").then(formattedCode =>
            expect(formattedCode).to.equal(
                `table 50000 MyTable
{
  Caption = 'My Table';
  DataClassification = CustomerContent;
  TableType = Temporary;

  fields
  {
    field(1; ID; Integer)
    {
      Caption = 'ID';
      Editable = false;
    }
    field(2; Description; Text[100]) {}
  }
}
`
            ));
    });

    it('Table with one field as clustered key', () => {
        return alFormat("table 50000 MyTable { fields{field(1; ID; Integer){ }} keys{key(PK; ID){ Clustered=true; }} }").then(formattedCode =>
            expect(formattedCode).to.equal(
                `table 50000 MyTable
{
  fields
  {
    field(1; ID; Integer) {}
  }

  keys
  {
    key(PK; ID)
    {
      Clustered = true;
    }
  }
}
`
            ));
    });

    it('Caption with Locked property', () => {
        return alFormat("table 50000 MyTable {Caption='My Table', Locked=true;}").then(formattedCode =>
            expect(formattedCode).to.equal(
                `table 50000 MyTable
{
  Caption = 'My Table', Locked = true;
}
`
            ));
    });

    it('Table field with DecimalPlaces property', () => {
        return alFormat("table 50000 MyTable { fields{field(1; Amount; Decimal){ DecimalPlaces=2; }} }").then(formattedCode =>
            expect(formattedCode).to.equal(
                `table 50000 MyTable
{
  fields
  {
    field(1; Amount; Decimal)
    {
      DecimalPlaces = 2;
    }
  }
}
`
            ));
    });

    it('Table field with DecimalPlaces property, values separated with colon', () => {
        return alFormat("table 50000 MyTable { fields{field(1; Amount; Decimal){ DecimalPlaces=2:4; }} }").then(formattedCode =>
            expect(formattedCode).to.equal(
                `table 50000 MyTable
{
  fields
  {
    field(1; Amount; Decimal)
    {
      DecimalPlaces = 2 : 4;
    }
  }
}
`
            ));
    });

    it('Table field with TableRelation property', () => {
        return alFormat(`table 50000 MyTable { fields{field(1; Code; Code[20]){ TableRelation=Customer where(Blocked=const("Customer Blocked"::" ")); }} }`).then(formattedCode =>
            expect(formattedCode).to.equal(
                `table 50000 MyTable
{
  fields
  {
    field(1; Code; Code[20])
    {
      TableRelation = Customer where(Blocked = const("Customer Blocked"::" "));
    }
  }
}
`
            ));
    });

    it('Table relation with multiple filters', () => {
        const code = `table 50000 MyTable
        { fields{
         field(2; "Allowance Posting"; Code[20]){
            TableRelation = IF ("Allowance Posting Type" = CONST(Item)) Item
            ELSE
            IF ("Allowance Posting Type" = CONST("Income Account")) "Income/Expense Account"."No.";
    }}}`;

        const expected = `table 50000 MyTable
{
  fields
  {
    field(2; "Allowance Posting"; Code[20])
    {
      TableRelation = if("Allowance Posting Type" = const(Item))
        Item
        else if("Allowance Posting Type" = const("Income Account"))
          "Income/Expense Account"."No.";
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Table field with AccessByPermission property', () => {
        return alFormat(`table 50000 MyTable { fields{field(1; Code; Code[20]){ AccessByPermission = TableData MyOtherTable=R; }} }`).then(formattedCode =>
            expect(formattedCode).to.equal(
                `table 50000 MyTable
{
  fields
  {
    field(1; Code; Code[20])
    {
      AccessByPermission = TableData MyOtherTable = R;
    }
  }
}
`
            ));
    });
});

describe('Printing of table keys', () => {
    it('Key with SumIndexFields property', () => {
        return alFormat("table 50000 MyTable { keys{key(KeyWithView; ID){ SumIndexFields=Amount,Quantity; }} }").then(formattedCode =>
            expect(formattedCode).to.equal(
                `table 50000 MyTable
{
  keys
  {
    key(KeyWithView; ID)
    {
      SumIndexFields = Amount, Quantity;
    }
  }
}
`
            ));
    });
});

describe('Table field properties', () => {
    it('Option field with OptionMembers having a leading comma', () => {
        const code = `table 50000 MyTable
        { fields{
          field(1; OptionField; Option){
          OptionMembers=,Option1,Option2,"Option 3";
          }
        }}`;

        const expected = `table 50000 MyTable
{
  fields
  {
    field(1; OptionField; Option)
    {
      OptionMembers = ,Option1, Option2, "Option 3";
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});

describe('Table triggers and procedures', () => {
    it('Procedures list after triggers', () => {
        const code = `table 50000 MyTable
        { fields{
          field(1; "Primary Key"; Code[10]){}}

          trigger OnAfterGetRecord()
          begin
            DoSomething();
          end;
          procedure DoSomething()
          begin
            RelaxAndDoNothing();
          end;
        }`;

        const expected = `table 50000 MyTable
{
  fields
  {
    field(1; "Primary Key"; Code[10]) {}
  }

  trigger OnAfterGetRecord()
  begin
    DoSomething();
  end;

  procedure DoSomething()
  begin
    RelaxAndDoNothing();
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Triggers and procedures mixed', () => {
        const code = `table 50000 MyTable
        { fields{
          field(1; "Primary Key"; Code[10]){}}

          procedure DoSomething()
          begin
            RelaxAndDoNothing();
          end;
          var RelaxTimeMs: Integer;
          trigger OnAfterGetRecord()
          begin
            DoSomething();
          end;
          procedure DoNothing()
          begin
          Sleep(RelaxTimeMs);
          end;
          trigger OnModify()
          begin
          end;
        }`;

        const expected = `table 50000 MyTable
{
  fields
  {
    field(1; "Primary Key"; Code[10]) {}
  }

  procedure DoSomething()
  begin
    RelaxAndDoNothing();
  end;

  var
    RelaxTimeMs: Integer;

  trigger OnAfterGetRecord()
  begin
    DoSomething();
  end;

  procedure DoNothing()
  begin
    Sleep(RelaxTimeMs);
  end;

  trigger OnModify()
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});

describe('Table relation formula', () => {
    it('Combined filter conditions in CalcFormula property', () => {
        const code = `table 50000 MyTable
        { fields{
        field(100; "Total Amount"; Decimal)
        {
            CalcFormula = sum("Posted Customer Order Line".Amount where(Status = filter((<> Shortage) & (<> Canceled)),
                                                                         "Document ID" = field("Document ID")));
            FieldClass = FlowField;
            Editable = false;
        }
    }}`;

        const expected = `table 50000 MyTable
{
  fields
  {
    field(100; "Total Amount"; Decimal)
    {
      CalcFormula = sum("Posted Customer Order Line".Amount
        where(Status = filter((<> Shortage) & (<> Canceled)),
          "Document ID" = field("Document ID")));
      FieldClass = FlowField;
      Editable = false;
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Combined filter conditions in CalcFormula without parenthesis', () => {
        const code = `table 50000 MyTable
        { fields{
        field(100; "Total Amount"; Decimal)
        {
            CalcFormula = sum("Posted Customer Order Line".Amount where(Status = filter(<> Shortage & <> Canceled)));
            FieldClass = FlowField;
            Editable = false;
        }
    }}`;

        const expected = `table 50000 MyTable
{
  fields
  {
    field(100; "Total Amount"; Decimal)
    {
      CalcFormula = sum("Posted Customer Order Line".Amount
        where(Status = filter(<> Shortage & <> Canceled)));
      FieldClass = FlowField;
      Editable = false;
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Combined filter conditions in TableRelation property', () => {
        const code = `table 50000 MyTable
        { fields{
        field(3; "Field No."; Integer)
        {
            Caption = 'Field No.';
            TableRelation = Field."No." where(TableNo = field("Table No."),
                                             Class = const(Normal),
                                             "Type Name" = filter(<> 'BLOB' & <> 'Media' & <> 'MediaSet'));
        }
    }}`;

        const expected = `table 50000 MyTable
{
  fields
  {
    field(3; "Field No."; Integer)
    {
      Caption = 'Field No.';
      TableRelation = Field."No."
        where(TableNo = field("Table No."),
          Class = const(Normal),
          "Type Name" = filter(<> 'BLOB' & <> 'Media' & <> 'MediaSet'));
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});
