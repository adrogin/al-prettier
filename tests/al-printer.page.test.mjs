import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Basic page structure', () => {
    it('Page with one field', () => {
        const code = `
page 50001 "Page With One Field"
{
  layout
  {
      area(content)
      {
          repeater(Control1)
          {
              ShowCaption = false;
              field("Code"; Rec.Code){}
          }
      }
  }
}`;

        const expected = `page 50001 "Page With One Field"
{
  layout
  {
    area(content)
    {
      repeater(Control1)
      {
        ShowCaption = false;

        field("Code"; Rec.Code) {}
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Page with label', () => {
        const code = `
page 50001 "Page With Label"
{
  layout
  {
      area(content)
      { label(Warning) { Caption='Read this warning!'; } }
  }
}`;

        const expected = `page 50001 "Page With Label"
{
  layout
  {
    area(content)
    {
      label(Warning)
      {
        Caption = 'Read this warning!';
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Page with field and user control', () => {
        const code = `
page 50001 "Page With User Control"
{
  layout
  {
      area(content)
      {
        field("Code"; Rec.Code){}
        usercontrol(Map;MapControl) {
          Caption='Map';
        }
      }
  }
}`;

        const expected = `page 50001 "Page With User Control"
{
  layout
  {
    area(content)
    {
      field("Code"; Rec.Code) {}
      usercontrol(Map; MapControl)
      {
        Caption = 'Map';
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Repeater control with multiple fields', () => {
        const code = `
page 50001 "Page With Three Fields"
{
  layout
  {
      area(content)
      {
          repeater(Control1)
          {
              ShowCaption = false;
              field("Code"; Rec.Code) {}
              field(Description; Rec.Description){ Caption='Description'; }
              field(Description2; Rec."Description 2") {}
          }
      }
  }
}`;

        const expected = `page 50001 "Page With Three Fields"
{
  layout
  {
    area(content)
    {
      repeater(Control1)
      {
        ShowCaption = false;

        field("Code"; Rec.Code) {}
        field(Description; Rec.Description)
        {
          Caption = 'Description';
        }
        field(Description2; Rec."Description 2") {}
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Page with empty actions segment', () => {
        const code = `
page 50001 "No Actions Page"
{
  actions
  {}
}`;

        const expected = `page 50001 "No Actions Page"
{
  actions {}
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Page with action', () => {
        const code = `
page 50001 "Page With One Action"
{
  actions
  {area(navigation)
    {group("&Action Group")
      {
        Caption = 'Action Group';
        action(RunAnotherPage)
        {Caption = 'Run Another Page';RunObject = Page "Another Page";}
      }
    }
  }
}`;

        const expected = `page 50001 "Page With One Action"
{
  actions
  {
    area(navigation)
    {
      group("&Action Group")
      {
        Caption = 'Action Group';

        action(RunAnotherPage)
        {
          Caption = 'Run Another Page';
          RunObject = Page "Another Page";
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Promoted area with actionref', () => {
        const code = `
page 50001 "Page With One Action"
{
  actions
  {area(navigation)
    {group("&Action Group")
      {
        Caption = 'Action Group';
        action(RunAnotherPage)
        {Caption = 'Run Another Page';RunObject = Page "Another Page";}
      }
    }
    area(Promoted)
    {
      group(PromotedGroup)
      {
        actionref(AnotherPage_Promoted; RunAnotherPage){}
      }}
  }
}
`;

        const expected = `page 50001 "Page With One Action"
{
  actions
  {
    area(navigation)
    {
      group("&Action Group")
      {
        Caption = 'Action Group';

        action(RunAnotherPage)
        {
          Caption = 'Run Another Page';
          RunObject = Page "Another Page";
        }
      }
    }
    area(Promoted)
    {
      group(PromotedGroup)
      {
        actionref(AnotherPage_Promoted; RunAnotherPage) {}
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('SourceTableView property', () => {
        const code = `
page 50001 "Page With One Action"
{
SourceTableView = sorting (Name, "No.") order(descending)
 where ("Balance (LCY)" = filter (>= 50000), "Sales (LCY)" = filter (<> 0));
}
`;

        const expected = `page 50001 "Page With One Action"
{
  SourceTableView = sorting(Name, "No.")
    order(descending)
    where("Balance (LCY)" = filter(>= 50000),
      "Sales (LCY)" = filter(<> 0));
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Page with subpage', () => {
        const code = `
page 50001 "Page With Subpage"
{
    layout
    {
        area(content)
        {part(Subpage;"Factbox Subpage")
            {
            Caption = 'Factbox';
            UpdatePropagation = Both;
            SubPageLink="Table No."=Const(Database::"My Table"), "No."=field("No.");
            }
        }}}
`;

        const expected = `page 50001 "Page With Subpage"
{
  layout
  {
    area(content)
    {
      part(Subpage; "Factbox Subpage")
      {
        Caption = 'Factbox';
        UpdatePropagation = Both;
        SubPageLink =
          "Table No." = const(Database::"My Table"),
          "No." = field("No.");
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('RunPageLink with pipe character', () => {
        const code = `
page 50001 "Page With One Action"
{
  actions
  {area(navigation)
    {group("&Action Group")
      {
        action(RunAnotherPage)
        {RunObject = Page "Another Page";
        RunPageLink = "Source Type" = filter(83|5407),"Source Subtype" = filter("3"|"4"|"5");}
      }
    }
  }
}`;

        const expected = `page 50001 "Page With One Action"
{
  actions
  {
    area(navigation)
    {
      group("&Action Group")
      {
        action(RunAnotherPage)
        {
          RunObject = Page "Another Page";
          RunPageLink =
            "Source Type" = filter(83 | 5407),
            "Source Subtype" = filter("3" | "4" | "5");
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Page separator element between fields', () => {
        const code = `
page 50001 "Page With Separator"
{
    layout
    {
        area(content)
        {
        field(Type; Rec.Type) {}
        separator(Navigate_Separator) {}
        field(No_; Rec."No.") {}
        }
    }
}`;

        const expected = `page 50001 "Page With Separator"
{
  layout
  {
    area(content)
    {
      field(Type; Rec.Type) {}
      separator(Navigate_Separator) {}
      field(No_; Rec."No.") {}
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Page separator element between actions', () => {
        const code = `
page 50001 "Page With Separator"
{
  actions
  {area(navigation)
    {group("&Action Group")
      {
        action(RunAnotherPage)
        {RunObject = Page "Another Page";
        RunPageLink = "Source Type";}
        separator(SeparateActions){}
        action(AnfAnotherPage)
        {RunObject = Page "Yet Another Page";
        RunPageLink = "Source Type";}
      }
    }
  }
}`;

        const expected = `page 50001 "Page With Separator"
{
  actions
  {
    area(navigation)
    {
      group("&Action Group")
      {
        action(RunAnotherPage)
        {
          RunObject = Page "Another Page";
          RunPageLink = "Source Type";
        }
        separator(SeparateActions) {}
        action(AnfAnotherPage)
        {
          RunObject = Page "Yet Another Page";
          RunPageLink = "Source Type";
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Page separator element with properties', () => {
        const code = `
page 50001 "Page With Separator"
{
    layout
    {
        area(content)
        {
        field(Type; Rec.Type) {}
        separator(Navigate_Separator) {
          IsHeader=true;
          Caption='Field Separator';
        }
        }
    }
}`;

        const expected = `page 50001 "Page With Separator"
{
  layout
  {
    area(content)
    {
      field(Type; Rec.Type) {}
      separator(Navigate_Separator)
      {
        IsHeader = true;
        Caption = 'Field Separator';
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});

describe('Page with subpage parts', () => {
    it('Simple part element', () => {
        const code = `
page 50001 "Page with factbox part"
{
    layout
    {
        area(factboxes)
        {
        part(AdditionalInfo; InfoSource) {}
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

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Page with systempart', () => {
        const code = `
page 50001 "Page with Systempart"
{
    layout
    {
        area(factboxes)
        {
        systempart(Links; Links) {}
        }
    }
}`;

        const expected = `page 50001 "Page with Systempart"
{
  layout
  {
    area(factboxes)
    {
      systempart(Links; Links) {}
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Part element inside a repeater', () => {
        const code = `
page 50001 MyPage
{
    layout
    {
        area(Content)
        {
            repeater(General)
            {
                field(customerNumber; Rec."No.") { }
                part(salesPriceItems; "Customer List")
                {
                    SubPageLink = "No." = field("No.");
                }
            }
        }
    }
}`;

        const expected = `page 50001 MyPage
{
  layout
  {
    area(Content)
    {
      repeater(General)
      {
        field(customerNumber; Rec."No.") {}
        part(salesPriceItems; "Customer List")
        {
          SubPageLink = "No." = field("No.");
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});

describe('Cuegroup', () => {
    it('Cuegroup with properties and fields', () => {
        const code = `
page 60000 "Page with Cuegroup"
{
    layout
    {
        area(content)
        {
            cuegroup(Documents)
            {
                Caption = 'Documents';
                field("Purchase Orders"; Rec."Purchase Orders")
                {
                    DrillDown = true;
                    DrillDownPageID = "Purch. Order";
                }
                field("Transfer Orders"; Rec."Transfer Orders")
                {
                    DrillDownPageID = "Transfer List";
                }
            }
    }}}
`;

        const expected = `page 60000 "Page with Cuegroup"
{
  layout
  {
    area(content)
    {
      cuegroup(Documents)
      {
        Caption = 'Documents';

        field("Purchase Orders"; Rec."Purchase Orders")
        {
          DrillDown = true;
          DrillDownPageID = "Purch. Order";
        }
        field("Transfer Orders"; Rec."Transfer Orders")
        {
          DrillDownPageID = "Transfer List";
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});
