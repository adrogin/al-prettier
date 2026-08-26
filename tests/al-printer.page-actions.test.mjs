import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

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

    it('RunObject property in page action referencing an object with namespace', () => {
        const code = `
page 50001 "Page With One Action"
{
  actions
  {area(navigation)
    {group("&Action Group")
      {
        action(RunSomePage)
        {RunObject = Page Contoso.Extensions.Interplanetary.Express.Page;}
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
          RunObject = Page Contoso.Extensions.Interplanetary.Express.Page;
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

    it('Page customaction', () => {
        const code = `
page 50001 "Page With Flow Action"
{
  actions
  {area(processing)
    {group(Flow)
      {
                customaction(CreateFlowFromTemplate)
                {
                    ApplicationArea = Basic, Suite;
                    Visible = IsSaaS and IsPowerAutomatePrivacyNoticeApproved;
                    CustomActionType = FlowTemplateGallery;
                    FlowTemplateCategoryName = 'd365bc_jobqueue';
                }
      }
    }
  }
}`;

        const expected = `page 50001 "Page With Flow Action"
{
  actions
  {
    area(processing)
    {
      group(Flow)
      {
        customaction(CreateFlowFromTemplate)
        {
          ApplicationArea = Basic, Suite;
          Visible = IsSaaS and IsPowerAutomatePrivacyNoticeApproved;
          CustomActionType = FlowTemplateGallery;
          FlowTemplateCategoryName = 'd365bc_jobqueue';
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Page systemaction', () => {
        const code = `
page 50001 "Page With Action"
{
  actions
  {area(processing)
{                systemaction(Act)
                {
                Tooltip = 'Let''s do some action!';
                trigger OnAction()
                begin
                    ActNow();
                end;
                }
    }
  }
}`;

        const expected = `page 50001 "Page With Action"
{
  actions
  {
    area(processing)
    {
      systemaction(Act)
      {
        Tooltip = 'Let''s do some action!';

        trigger OnAction()
        begin
          ActNow();
        end;
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});
