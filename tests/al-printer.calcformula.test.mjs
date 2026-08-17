import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('FlowField CalcFormula', () => {
    it('Line breaks in a long formula', () => {
        const code = `
table 50000 TableWithFlowField
{
  fields
  {
  field(1; PK; Code[10]) {}
  field(2; CalculatedField; Decimal)
  {
    FieldClass=FlowField;
    CalcFormula=sum("G/L Entry".Amount where ("G/L Account No."=const('9999'),Reversed=filter(false),"Global Dimension 1 Code"=const('DIMENSION_VALUE')));
  }
  }
}`;

        const expected = `table 50000 TableWithFlowField
{
  fields
  {
    field(1; PK; Code[10]) {}
    field(2; CalculatedField; Decimal)
    {
      FieldClass = FlowField;
      CalcFormula = sum("G/L Entry".Amount
        where("G/L Account No." = const('9999'),
          Reversed = filter(false),
          "Global Dimension 1 Code" = const('DIMENSION_VALUE')));
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Negative calcformula', () => {
        const code = `
table 50000 TableWithFlowField
{
  fields
  {
  field(1; PK; Code[10]) {}
  field(2; CalculatedField; Decimal)
  {
    FieldClass=FlowField;
    CalcFormula=-sum("G/L Entry".Amount where ("G/L Account No."=const('9999')));
  }
  }
}`;

        const expected = `table 50000 TableWithFlowField
{
  fields
  {
    field(1; PK; Code[10]) {}
    field(2; CalculatedField; Decimal)
    {
      FieldClass = FlowField;
      CalcFormula = -sum("G/L Entry".Amount
        where("G/L Account No." = const('9999')));
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Database reference with scope operator', () => {
        const code = `
table 50000 TableWithFlowField
{
  fields
  {
  field(1; PK; Code[10]) {}
  field(2; CalculatedField; Decimal)
  {
    FieldClass=FlowField;
    CalcFormula = exist("CRM Integration Record" where("Table ID" = const(Database::"Service Item")));
  }
  }
}`;

        const expected = `table 50000 TableWithFlowField
{
  fields
  {
    field(1; PK; Code[10]) {}
    field(2; CalculatedField; Decimal)
    {
      FieldClass = FlowField;
      CalcFormula = exist("CRM Integration Record"
        where("Table ID" = const(Database::"Service Item")));
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Filter keyword inside a field reference', () => {
        const code = `
table 50000 TableWithFlowField
{
  fields
  {
  field(1; PK; Code[10]) {}
  field(2; CalculatedField; Decimal)
  {
    FieldClass=FlowField;
    CalcFormula = sum("G/L Entry".Amount where("G/L Account No." = field("No."),
                                                "G/L Account No."=field(filter(Totaling))));  }
  }
}`;

        const expected = `table 50000 TableWithFlowField
{
  fields
  {
    field(1; PK; Code[10]) {}
    field(2; CalculatedField; Decimal)
    {
      FieldClass = FlowField;
      CalcFormula = sum("G/L Entry".Amount
        where("G/L Account No." = field("No."),
          "G/L Account No." = field(filter(Totaling))));
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Filter with upperlimit filter', () => {
        const code = `
table 50000 TableWithFlowField
{
  fields
  {
  field(1; PK; Code[10]) {}
  field(2; CalculatedField; Decimal)
  {
    FieldClass=FlowField;
    CalcFormula = sum("G/L Entry".Amount where("G/L Account No." = field("No."),
                                                "Posting Date" = field(UpperLimit("Date Filter"))));  }
  }
}`;

        const expected = `table 50000 TableWithFlowField
{
  fields
  {
    field(1; PK; Code[10]) {}
    field(2; CalculatedField; Decimal)
    {
      FieldClass = FlowField;
      CalcFormula = sum("G/L Entry".Amount
        where("G/L Account No." = field("No."),
          "Posting Date" = field(upperlimit("Date Filter"))));
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
