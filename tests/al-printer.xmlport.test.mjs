import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Basic XMLPort structure', () => {
    it('Minimal XMLPort with properties', () => {
        const code = `
xmlport 50000 ImportExportXml {
    Caption = 'Dummy XML Port';
    FormatEvaluate = Xml;
    UseDefaultNamespace = true;
}
`;

        const expected = `xmlport 50000 ImportExportXml
{
  Caption = 'Dummy XML Port';
  FormatEvaluate = Xml;
  UseDefaultNamespace = true;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('XMLPort with simple schema', () => {
        const code = `
xmlport 50001 MyTestXmlPort
{
    FormatEvaluate = Xml;
    UseDefaultNamespace = true;
    schema{
        textelement(RootNode){
            tableelement(TableElement; "TableElement Source")
            {
                MinOccurs = Zero;
                UseTemporary = true;
                fieldelement(DocumentNo; TableElement."Document No.")
                {
                MinOccurs = Zero;
    }}}
    }}
`;

        const expected = `xmlport 50001 MyTestXmlPort
{
  FormatEvaluate = Xml;
  UseDefaultNamespace = true;

  schema
  {
    textelement(RootNode)
    {
      tableelement(TableElement; "TableElement Source")
      {
        MinOccurs = Zero;
        UseTemporary = true;

        fieldelement(DocumentNo; TableElement."Document No.")
        {
          MinOccurs = Zero;
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Multiple field elements', () => {
        const code = `
xmlport 50001 MyTestXmlPort
{
    schema{
        textelement(RootNode){
            tableelement(TableElement; "TableElement Source")
            {
                fieldelement(DocumentType; TableElement."Document Type")
                {}
                fieldelement(DocumentNo; TableElement."Document No.")
                {}
                fieldelement(DocumentDate; TableElement."Document Date")
                {}
                }}}}
`;

        const expected = `xmlport 50001 MyTestXmlPort
{
  schema
  {
    textelement(RootNode)
    {
      tableelement(TableElement; "TableElement Source")
      {
        fieldelement(DocumentType; TableElement."Document Type") {}
        fieldelement(DocumentNo; TableElement."Document No.") {}
        fieldelement(DocumentDate; TableElement."Document Date") {}
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Field element with properties and triggers', () => {
        const code = `
xmlport 50001 MyTestXmlPort
{
    schema{
        textelement(RootNode){
            tableelement(TableElement; "TableElement Source")
            {
                XmlName = 'XmlElementName';
                UseTemporary = true;
                fieldelement(DocumentType; TableElement."Document Type")
                {
                  MinOccurs = Zero;
                  MaxOccurs = Unbounded;
                  trigger OnAfterAssignField()
                  begin
                  end;
                }
                  trigger OnAfterGetRecord()
                  begin
                  end;
                }}}}
`;

        const expected = `xmlport 50001 MyTestXmlPort
{
  schema
  {
    textelement(RootNode)
    {
      tableelement(TableElement; "TableElement Source")
      {
        XmlName = 'XmlElementName';
        UseTemporary = true;

        fieldelement(DocumentType; TableElement."Document Type")
        {
          MinOccurs = Zero;
          MaxOccurs = Unbounded;

          trigger OnAfterAssignField()
          begin
          end;
        }

        trigger OnAfterGetRecord()
        begin
        end;
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Field element with triggers and no properties', () => {
        const code = `
xmlport 50001 MyTestXmlPort
{
    schema{
        textelement(RootNode){
            tableelement(TableElement; "TableElement Source")
            {
                fieldelement(DocumentType; TableElement."Document Type")
                {
                  trigger OnAfterAssignField()
                  begin
                  end;
                  trigger OnBeforePassField()
                  begin
                  end;
                }
                }}}}
`;

        const expected = `xmlport 50001 MyTestXmlPort
{
  schema
  {
    textelement(RootNode)
    {
      tableelement(TableElement; "TableElement Source")
      {
        fieldelement(DocumentType; TableElement."Document Type")
        {
          trigger OnAfterAssignField()
          begin
          end;

          trigger OnBeforePassField()
          begin
          end;
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});
