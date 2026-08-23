import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Table extension object', () => {
    it('Table extension adding one field and modifying another', () => {
        const code = `
tableextension 55111 "Let's Extend Something" extends "Something Extendable"
{
    fields{
        field(55000; "New Field"; Decimal)
        {
            AutoFormatType = 1;
            AutoFormatExpression = '';
        }
        modify("Old Field")
        {
            Editable=false;
        }
    }
}`;

        const expected = `tableextension 55111 "Let's Extend Something" extends "Something Extendable"
{
  fields
  {
    field(55000; "New Field"; Decimal)
    {
      AutoFormatType = 1;
      AutoFormatExpression = '';
    }
    modify("Old Field")
    {
      Editable = false;
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Table extension adding field property and trigger', () => {
        const code = `
tableextension 55111 "Let's Extend Something" extends "Something Extendable"
{
    fields{
        modify("Some Field")
        {
            Editable=false;
            trigger OnValidate()
            begin
            ValidateField();
            end;
        }
    }
}`;

        const expected = `tableextension 55111 "Let's Extend Something" extends "Something Extendable"
{
  fields
  {
    modify("Some Field")
    {
      Editable = false;

      trigger OnValidate()
      begin
        ValidateField();
      end;
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Table extension adding field groups', () => {
        const code = `
tableextension 55111 "Let's Extend Something" extends "Something Extendable"
{
    fields{
        modify("Some Field")
        {
            Editable=false;
        }
    }
    fieldgroups{
        addlast(DropDown; "Very Important Field", "Less Important Field")
        {
        }
    }
}`;

        const expected = `tableextension 55111 "Let's Extend Something" extends "Something Extendable"
{
  fields
  {
    modify("Some Field")
    {
      Editable = false;
    }
  }

  fieldgroups
  {
    addlast(DropDown; "Very Important Field", "Less Important Field") {}
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});
