import { describe, it } from 'mocha';
import { expect } from 'chai';
import antlr4 from 'antlr4';
import ALParser from '../../algrammar/JS/ALParser.js';
import printer from '../plugin/printer.js';
import * as prettier from "prettier";
import { alFormat } from './testUtils.js';

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
      field(SomePageField; Rec.TableField)
      {
      }
    }
  }
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode =>
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
});
