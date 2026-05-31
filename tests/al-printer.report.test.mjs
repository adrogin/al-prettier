import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Report objects', () => {
    it('Empty report without content', () => {
        const code = `
report 50000 "Income/Expense Report"
{}`;

        const expected = `report 50000 "Income/Expense Report"
{
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });


    it('Report with dataset, one dataitem', () => {
        const code = `
report 50000 "Report with Dataset"
{
dataset{
        dataitem(Item; Item)
        {
            RequestFilterFields = "No.";
            column(COMPANYNAME; CompanyName){}
            column(FORMAT_TODAY_0_4_; Format(Today, 0, 4)){}
        }
}
}`;

        const expected = `report 50000 "Report with Dataset"
{
  dataset
  {
    dataitem(Item; Item)
    {
      RequestFilterFields = "No.";

      column(COMPANYNAME; CompanyName)
      {
      }
      column(FORMAT_TODAY_0_4_; Format(Today, 0, 4))
      {
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Report with one dataitem and properties', () => {
        const code = `
report 50000 "Report with Dataset"
{
DefaultLayout = RDLC;
UsageCategory = ReportsAndAnalysis;
dataset{
        dataitem(Item; Item)
        {
            RequestFilterFields = "No.";
            column(COMPANYNAME; CompanyName){}
        }
}
}`;

        const expected = `report 50000 "Report with Dataset"
{
  DefaultLayout = RDLC;
  UsageCategory = ReportsAndAnalysis;

  dataset
  {
    dataitem(Item; Item)
    {
      RequestFilterFields = "No.";

      column(COMPANYNAME; CompanyName)
      {
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });


    it('Report with dataset, two linked dataitems', () => {
        const code = `
report 50000 "Report with Dataset"
{
  dataset
  {
    dataitem(Item; Item)
    {
    column(Item__No__; "No.")
    {
        IncludeCaption = true;
    }
    column(Item_Item_Description; Description)
    {
        IncludeCaption = true;
    }
    dataitem("BOM Component"; "BOM Component")
    {
        DataItemLink = "Parent Item No." = FIELD("No.");
        DataItemTableView = SORTING("LSC BOM Component Type");
        PrintOnlyIfDetail = false;
        column(BOM_Component__No__; "No."){}
    }}
  }
}
`;

        const expected = `report 50000 "Report with Dataset"
{
  dataset
  {
    dataitem(Item; Item)
    {
      column(Item__No__; "No.")
      {
        IncludeCaption = true;
      }
      column(Item_Item_Description; Description)
      {
        IncludeCaption = true;
      }
      dataitem("BOM Component"; "BOM Component")
      {
        DataItemLink = "Parent Item No." = field("No.");
        DataItemTableView = sorting("LSC BOM Component Type");
        PrintOnlyIfDetail = false;

        column(BOM_Component__No__; "No.")
        {
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Report request page', () => {
    it('Dataset and request page separated with a line break', () => {
        const code = `
report 50000 "Report with Request page"
{
  dataset {}
  requestpage {
  Caption='This is a request page';
  }
}
`;

        const expected = `report 50000 "Report with Request page"
{
  dataset
  {
  }

  requestpage
  {
    Caption = 'This is a request page';
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Report request page with layout', () => {
        const code = `
report 50000 "Report with Request page"
{
  requestpage {
  Caption='This is a request page';
        layout
        {
            area(content)
            {
                group(Options)
                {
                    Caption = 'Options';
                    Visible = OptionsVisible;
                    field(FinancialReport; FinancialReportName) {}
            }
        }
    }
  }
}
`;

        const expected = `report 50000 "Report with Request page"
{
  requestpage
  {
    Caption = 'This is a request page';

    layout
    {
      area(content)
      {
        group(Options)
        {
          Caption = 'Options';
          Visible = OptionsVisible;

          field(FinancialReport; FinancialReportName)
          {
          }
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Report rendering options', () => {
    it('Report with rendering section', () => {
        const code = `
report 50000 "Report with Rendering"
{
  DefaultLayout = RDLC;
  rendering
  {
    layout("DefaultLayout")
    {
      layoutfile="DefaultLayout.rdlc"; Type=RDLC;
    }
    layout("WordLayout")
    {
      layoutfile="WordLayout.docx"; Type = Word;
    }
  }
}`;

        const expected = `report 50000 "Report with Rendering"
{
  DefaultLayout = RDLC;

  rendering
  {
    layout("DefaultLayout")
    {
      layoutfile = "DefaultLayout.rdlc";
      Type = RDLC;
    }
    layout("WordLayout")
    {
      layoutfile = "WordLayout.docx";
      Type = Word;
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Report labels', () => {
    it('Report with label section', () => {
        const code = `
report 50000 "Report with Labels"
{
  dataset {}
  labels
  {
    CompanyNameLabel = 'Company Name';
    DateLabel = 'Report Date';
    PageNoLabel = 'Page';
    TotalLabel = 'Total Amount';
  }
}`;

        const expected = `report 50000 "Report with Labels"
{
  dataset
  {
  }

  labels
  {
    CompanyNameLabel = 'Company Name';
    DateLabel = 'Report Date';
    PageNoLabel = 'Page';
    TotalLabel = 'Total Amount';
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Long label with properties breaks the line', () => {
        const code = `
report 50000 "Report with Labels"
{
  labels
  {
    CompanyNameLabel = 'This is a very long report label', Comment='And the comment is even longer',MaxLength=1024;
  }
}`;

        const expected = `report 50000 "Report with Labels"
{
  labels
  {
    CompanyNameLabel = 'This is a very long report label',
      Comment = 'And the comment is even longer',
      MaxLength = 1024;
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
