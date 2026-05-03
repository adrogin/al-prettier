import { describe, it } from 'mocha';
import { expect } from 'chai';
import antlr4 from 'antlr4';
import ALParser from '../../algrammar/JS/ALParser.js';
import ALLexer from '../../algrammar/JS/ALLexer.js';
import printer from '../printer.js';
import * as prettier from "prettier";
import { alFormat } from './testUtils.js';

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
});
