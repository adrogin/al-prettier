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

    it('SubPageView property', () => {
        const code = `
page 50001 MyPage
{
    layout
    {
        area(Content)
        {
            part(AdditionalInfo; "Subpage Source")
            {
                SubPageLink = "No." = field("No.");
                SubPageView = sorting("Customer No.", "Start Date") order(descending);
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
      part(AdditionalInfo; "Subpage Source")
      {
        SubPageLink = "No." = field("No.");
        SubPageView = sorting("Customer No.", "Start Date") order(descending);
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Filter inside field reference in SubPageLink', () => {
        const code = `
page 50001 MyPage
{
    layout
    {
        area(Content)
        {
            part(AdditionalInfo; "Subpage Source")
            {
                SubPageLink = "Order No." = field(filter("Order No.")),"Line No." = field("Line No.");
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
      part(AdditionalInfo; "Subpage Source")
      {
        SubPageLink =
          "Order No." = field(filter("Order No.")),
          "Line No." = field("Line No.");
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

describe('Grid layout', () => {
    it('Grid with two groups', () => {
        const code = `
page 60000 "Page with Grid"
{
    layout
    {
        area(content)
        {
            grid(Grid)
            {
                Caption = 'Grid View';
                group(Group1) {
                field("Purchase Orders"; Rec."Purchase Orders")
                {
                    DrillDown = true;
                    DrillDownPageID = "Purch. Order";
                }}
                group(Group2) {
                field("Transfer Orders"; Rec."Transfer Orders")
                {
                    DrillDownPageID = "Transfer List";
            }}
            }
    }}}
`;

        const expected = `page 60000 "Page with Grid"
{
  layout
  {
    area(content)
    {
      grid(Grid)
      {
        Caption = 'Grid View';

        group(Group1)
        {
          field("Purchase Orders"; Rec."Purchase Orders")
          {
            DrillDown = true;
            DrillDownPageID = "Purch. Order";
          }
        }
        group(Group2)
        {
          field("Transfer Orders"; Rec."Transfer Orders")
          {
            DrillDownPageID = "Transfer List";
          }
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Grid with groups and fields', () => {
        const code = `
page 60000 "Page with Grid"
{
    layout
    {
        area(content)
        {
            grid(Grid)
            {
                Caption = 'Grid View';
                group(Group1) {
                field("Purchase Orders"; Rec."Purchase Orders")
                {
                    DrillDown = true;
                    DrillDownPageID = "Purch. Order";
                }}
                field(JustAnotherField; Rec."Source for Another Field") {}
                group(Group2) {
                field("Transfer Orders"; Rec."Transfer Orders")
                {
                    DrillDownPageID = "Transfer List";
            }}
            }
    }}}
`;

        const expected = `page 60000 "Page with Grid"
{
  layout
  {
    area(content)
    {
      grid(Grid)
      {
        Caption = 'Grid View';

        group(Group1)
        {
          field("Purchase Orders"; Rec."Purchase Orders")
          {
            DrillDown = true;
            DrillDownPageID = "Purch. Order";
          }
        }
        field(JustAnotherField; Rec."Source for Another Field") {}
        group(Group2)
        {
          field("Transfer Orders"; Rec."Transfer Orders")
          {
            DrillDownPageID = "Transfer List";
          }
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Grid inside a group', () => {
        const code = `
page 60000 "Page with Grid"
{
    layout
    {
        area(content)
        {
            group(GridGroup) {
            grid(Grid)
            {
                Caption = 'Grid View';
                field("Purchase Orders"; Rec."Purchase Orders")
                {
                }}
            }}
            }
    }
`;

        const expected = `page 60000 "Page with Grid"
{
  layout
  {
    area(content)
    {
      group(GridGroup)
      {
        grid(Grid)
        {
          Caption = 'Grid View';

          field("Purchase Orders"; Rec."Purchase Orders") {}
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Subpage in grid', () => {
        const code = `
page 60000 "Page with Grid"
{
    layout
    {
        area(content)
        {
            grid(Grid)
            {
                field("Purchase Orders"; Rec."Purchase Orders")
                {
                }
                part(Subpage; "Subpage Source")
                {}
            }
            }}
    }
`;

        const expected = `page 60000 "Page with Grid"
{
  layout
  {
    area(content)
    {
      grid(Grid)
      {
        field("Purchase Orders"; Rec."Purchase Orders") {}
        part(Subpage; "Subpage Source") {}
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Nested grids', () => {
        const code = `
page 60000 "Page with Grid"
{
    layout
    {
        area(content)
        {
            grid(Grid)
            {
            grid(SubGrid) {
                field("Purchase Orders"; Rec."Purchase Orders")
                {
    }}
            }
            }}
    }
`;

        const expected = `page 60000 "Page with Grid"
{
  layout
  {
    area(content)
    {
      grid(Grid)
      {
        grid(SubGrid)
        {
          field("Purchase Orders"; Rec."Purchase Orders") {}
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});

describe('SourceTable and SourceTableView properties', () => {
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

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Open left range in filter', () => {
        const code = `
page 50001 "Page With Filtered Source"
{
SourceTableView = where(Status = filter(.. "In Process"));
}
`;

        const expected = `page 50001 "Page With Filtered Source"
{
  SourceTableView = where(Status = filter(.."In Process"));
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Open right range in filter', () => {
        const code = `
page 50001 "Page With Filtered Source"
{
SourceTableView = where(Status = filter("In Process"..));
}
`;

        const expected = `page 50001 "Page With Filtered Source"
{
  SourceTableView = where(Status = filter("In Process"..));
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Open left range in literal filter', () => {
        const code = `
page 50001 "Page With Filtered Source"
{
SourceTableView = where(SomeIntValue = filter(.. 10));
}
`;

        const expected = `page 50001 "Page With Filtered Source"
{
  SourceTableView = where(SomeIntValue = filter(..10));
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Open right range in literal filter', () => {
        const code = `
page 50001 "Page With Filtered Source"
{
SourceTableView = where(SomeIntValue = filter(1..));
}
`;

        const expected = `page 50001 "Page With Filtered Source"
{
  SourceTableView = where(SomeIntValue = filter(1..));
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('SourceTable property', () => {
        const code = `
page 50001 "Page With Source"
{
SourceTable=MyTable;
}
`;

        const expected = `page 50001 "Page With Source"
{
  SourceTable = MyTable;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('SourceTable property, table with namespace', () => {
        const code = `
page 50001 "Page With Source"
{
SourceTable=My.Namespace.MyTable;
}
`;

        const expected = `page 50001 "Page With Source"
{
  SourceTable = My.Namespace.MyTable;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});

describe('Page actions', () => {
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

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
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

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
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

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
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

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Empty const value in RunPageLink property', () => {
        const code = `
page 50001 "Page With One Action"
{
  actions
  {area(navigation)
    {group("&Action Group")
      {
        action(RunSomePage)
        {RunObject = Page "Some Page";
        RunPageLink = "Source Type" = const();}
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
        action(RunSomePage)
        {
          RunObject = Page "Some Page";
          RunPageLink = "Source Type" = const();
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('RunPageLink with filter and empty const', () => {
        const code = `
page 50001 "Page With One Action"
{
  actions
  {area(navigation)
    {group("&Action Group")
      {
        action(RunSomePage)
        {RunObject = Page "Some Page";
        RunPageLink = "Item No." = field("Item No."),"Variant Code" = const();}
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
        action(RunSomePage)
        {
          RunObject = Page "Some Page";
          RunPageLink =
            "Item No." = field("Item No."),
            "Variant Code" = const();
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Page FileUploadAction', () => {
        const code = `
page 50001 "Page With File Upload"
{
  actions
  {area(processing)
    {group("&Action Group")
      {
        fileuploadaction(UploadAttachments)
        {
        Caption='Upload Attachments';
        trigger OnAction(files: List of [FileUpload])
        begin
        UploadMultipleAttachments(files);
        end;
        }
      }
    }
  }
}`;

        const expected = `page 50001 "Page With File Upload"
{
  actions
  {
    area(processing)
    {
      group("&Action Group")
      {
        fileuploadaction(UploadAttachments)
        {
          Caption = 'Upload Attachments';

          trigger OnAction(files: List of [FileUpload])
          begin
            UploadMultipleAttachments(files);
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

describe('Fixed layout', () => {
    it('Fixed layout with properties and fields', () => {
        const code = `
page 50001 "Page With Fixed Layout"
{
    layout
    {
        area(Content)
        {
            fixed(Fixed)
            {
            ShowCaption = false;
            group(FixedGroup)
            {
                field(FixedField1; FieldDataSource1) {}
                field(FixedField2; FieldDataSource2) {}
    }}}}}
`;

        const expected = `page 50001 "Page With Fixed Layout"
{
  layout
  {
    area(Content)
    {
      fixed(Fixed)
      {
        ShowCaption = false;

        group(FixedGroup)
        {
          field(FixedField1; FieldDataSource1) {}
          field(FixedField2; FieldDataSource2) {}
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Fixed layout in group', () => {
        const code = `
page 50001 "Page With Fixed Layout"
{
    layout
    {
        area(Content)
        {
        group(MyGroup) {
            fixed(Fixed)
            {
            ShowCaption = false;
            group(FixedGroup)
            {
                field(FixedField1; FieldDataSource1) {}
                field(FixedField2; FieldDataSource2) {}
    }}}}}}
`;

        const expected = `page 50001 "Page With Fixed Layout"
{
  layout
  {
    area(Content)
    {
      group(MyGroup)
      {
        fixed(Fixed)
        {
          ShowCaption = false;

          group(FixedGroup)
          {
            field(FixedField1; FieldDataSource1) {}
            field(FixedField2; FieldDataSource2) {}
          }
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});

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
});

describe('Page triggers', () => {
    it('Simple page with two triggers', () => {
        const code = `
page 55555 MyPageWithTriggers
{
    trigger OnOpenPage()
    begin
    end;
    trigger OnFindRecord(Which: Text): Boolean
    begin end;
}
`;

        const expected = `page 55555 MyPageWithTriggers
{
  trigger OnOpenPage()
  begin
  end;

  trigger OnFindRecord(Which: Text): Boolean
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('DotNet trigger with scope operator', () => {
        const code = `
page 806 "Online Map Location"
{
    trigger LocationProvider::LocationChanged(location: DotNet Location)
    begin
    end;
}
`;

        const expected = `page 806 "Online Map Location"
{
  trigger LocationProvider::LocationChanged(location: DotNet Location)
  begin
  end;
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});
