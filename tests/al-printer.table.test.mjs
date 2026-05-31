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
    field(1; ID; Integer)
    {
    }
    field(2; Description; Text[100])
    {
    }
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
    field(2; Description; Text[100])
    {
    }
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
    field(1; ID; Integer)
    {
    }
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
