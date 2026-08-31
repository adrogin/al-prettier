import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Page with views', () => {
    it('Page views', () => {
        const code = `
page 50001 "Page With View"
{
    layout
    {
        area(Content)
        {
            group(FieldGroup)
            {
                field(FixedField1; FieldDataSource1) {}
                field(FixedField2; FieldDataSource2) {}
            }
        }
    }
    views
    {
        view("Last 30 Days")
        {
            Caption = 'Last 30 Days';Filters=where("Date Filter Type"=const(Last30Days));}
        view("Year to Date")
        {
            Caption = 'Year to Date';
Filters = where("Date Filter Type" = const(YearToDate));
        }
    }
}
`;

        const expected = `page 50001 "Page With View"
{
  layout
  {
    area(Content)
    {
      group(FieldGroup)
      {
        field(FixedField1; FieldDataSource1) {}
        field(FixedField2; FieldDataSource2) {}
      }
    }
  }

  views
  {
    view("Last 30 Days")
    {
      Caption = 'Last 30 Days';
      Filters = where("Date Filter Type" = const(Last30Days));
    }
    view("Year to Date")
    {
      Caption = 'Year to Date';
      Filters = where("Date Filter Type" = const(YearToDate));
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Page views with complex Filters property', () => {
        const code = `
page 50001 "Page With View"
{
    layout
    {
    area(Content){}}
    views
    {
        view(Released)
        {
            Caption = 'Released';
            Filters = where(Status = const(Released));
        }
        view(PickedShipmentsToday)
        {
            Caption = 'Picked Shipments Today';
            Filters = where("Shipment Date" = filter('%workdate'), "Document Status" = filter('Partially Picked' | 'Completely Picked'));
        }
    }
}
`;

        const expected = `page 50001 "Page With View"
{
  layout
  {
    area(Content) {}
  }

  views
  {
    view(Released)
    {
      Caption = 'Released';
      Filters = where(Status = const(Released));
    }
    view(PickedShipmentsToday)
    {
      Caption = 'Picked Shipments Today';
      Filters = where("Shipment Date" = filter('%workdate'),
        "Document Status" = filter('Partially Picked' | 'Completely Picked'));
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Page view with layout', () => {
        const code = `
page 50001 "Page With View"
{
    layout
    {
    area(Content){}}
    views
    {
view(UniqueView)
{
    Caption = 'View With Unique Layout';
    Filters = where ("Balance (LCY)" = filter (> 500), Name = filter ('G*')); 
    SharedLayout = false;
    
    layout
    {
        movefirst(Control1; "Balance Due (LCY)")
    }
}    }
}
`;

        const expected = `page 50001 "Page With View"
{
  layout
  {
    area(Content) {}
  }

  views
  {
    view(UniqueView)
    {
      Caption = 'View With Unique Layout';
      Filters = where("Balance (LCY)" = filter(> 500),
        Name = filter('G*'));
      SharedLayout = false;

      layout
      {
        movefirst(Control1; "Balance Due (LCY)")
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});

describe('Analysis views', () => {
    it('Page with analysis views', () => {
        const code = `
page 55555 MyPageWithView
{
    layout
    {
        area(content)
        {
            repeater(Control1)
            {
                field("Posting Date"; Rec."Posting Date"){}
    }}}
    analysisviews
    {
        analysisview("Aged accounts by month")
        {
            Caption = 'Aged accounts by month';
            DefinitionFile = './analysis1.json';
            ToolTip = 'A very helpful tooltip text.';
        }
        analysisview("Customer sales by volume")
        {
            Caption = 'Customer sales by volume';
            DefinitionFile = './analysis2.json';
            ToolTip = 'A very helpful tooltip text.';
        }
    }
}
`;

        const expected = `page 55555 MyPageWithView
{
  layout
  {
    area(content)
    {
      repeater(Control1)
      {
        field("Posting Date"; Rec."Posting Date") {}
      }
    }
  }

  analysisviews
  {
    analysisview("Aged accounts by month")
    {
      Caption = 'Aged accounts by month';
      DefinitionFile = './analysis1.json';
      ToolTip = 'A very helpful tooltip text.';
    }
    analysisview("Customer sales by volume")
    {
      Caption = 'Customer sales by volume';
      DefinitionFile = './analysis2.json';
      ToolTip = 'A very helpful tooltip text.';
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});
