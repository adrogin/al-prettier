import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Page extension elements', () => {
    it('Page extension modifies one action', () => {
        const code = `
pageextension 50050 "Some Extended Page" extends "My Base Page"
{
  actions
  {
    modify("Post Document")
    { Enabled = false; Visible = false; }
  }
}`;

        const expected = `pageextension 50050 "Some Extended Page" extends "My Base Page"
{
  actions
  {
    modify("Post Document")
    {
      Enabled = false;
      Visible = false;
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Page extension with two action modifications', () => {
        const code = `
pageextension 50050 "Some Extended Page" extends "My Base Page"
{
  actions
  {
    modify("Post Document")
    { Enabled = false; Visible = false; }
    modify("Open Posted Document")
    { Enabled = false; Visible = false; }
  }
}`;

        const expected = `pageextension 50050 "Some Extended Page" extends "My Base Page"
{
  actions
  {
    modify("Post Document")
    {
      Enabled = false;
      Visible = false;
    }
    modify("Open Posted Document")
    {
      Enabled = false;
      Visible = false;
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Page extension moves multiple actions and adds a new action group', () => {
        const code = `
pageextension 50050 "Some Extended Page" extends "My Base Page"
{
  actions
  {
    moveafter("Post Document"; MyAction1, MyAction2)
    movebefore("Open Posted Document"; MyAction3, MyAction4)
    addlast(Creation) {
    group(NewActionGroup){
    action(CreateRelatedDocument) {
    Caption ='Create New Document';
    }
    }
    }
  }
}`;

        const expected = `pageextension 50050 "Some Extended Page" extends "My Base Page"
{
  actions
  {
    moveafter("Post Document"; MyAction1, MyAction2)
    movebefore("Open Posted Document"; MyAction3, MyAction4)
    addlast(Creation)
    {
      group(NewActionGroup)
      {
        action(CreateRelatedDocument)
        {
          Caption = 'Create New Document';
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Grid as the top element in page extension', () => {
        const code = `
pageextension 50050 "Some Extended Page" extends "My Base Page"
{
        layout {
        addafter(Header)
        {
            grid(BaseAppRow)
            {
                ShowCaption = false;
                GridLayout = Rows;
                group(ServiceConnectionsGroup)
                {
                    ShowCaption = false;
                    field(ServiceConnections; ServiceConnectionsLbl)
    {}

    }}}}
}`;

        const expected = `pageextension 50050 "Some Extended Page" extends "My Base Page"
{
  layout
  {
    addafter(Header)
    {
      grid(BaseAppRow)
      {
        ShowCaption = false;
        GridLayout = Rows;

        group(ServiceConnectionsGroup)
        {
          ShowCaption = false;

          field(ServiceConnections; ServiceConnectionsLbl) {}
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Page extension modifies action adding a trigger', () => {
        const code = `
pageextension 50050 "Some Extended Page" extends "My Base Page"
{
  actions
  {
    modify("Post Document")
    {             trigger OnAfterAction()
            var
                PostingCodeunit: Codeunit "Funky Custom Document - Post";
            begin
                PostingCodeunit.Post(Rec);
            end;
    }
  }
}`;

        const expected = `pageextension 50050 "Some Extended Page" extends "My Base Page"
{
  actions
  {
    modify("Post Document")
    {
      trigger OnAfterAction()
      var
        PostingCodeunit: Codeunit "Funky Custom Document - Post";
      begin
        PostingCodeunit.Post(Rec);
      end;
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('CueGroup in page extension layout', () => {
        const code = `
pageextension 50100 "Cuegroup Addafter Repro" extends "O365 Activities"
{
    layout
    {
        addafter(Intercompany)
        {
            cuegroup(MyCues)
            {
                Caption = 'Messages';

                field(MyCue; Rec.SystemId)
                {
                    ApplicationArea = All;
                }
            }
        }
    }
}`;

        const expected = `pageextension 50100 "Cuegroup Addafter Repro" extends "O365 Activities"
{
  layout
  {
    addafter(Intercompany)
    {
      cuegroup(MyCues)
      {
        Caption = 'Messages';

        field(MyCue; Rec.SystemId)
        {
          ApplicationArea = All;
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

describe('Custom action in page extension', () => {
    it('Page extension adding a custom action', () => {
        const code = `
pageextension 50100 CustomerCardExt extends "Customer Card"
{
    actions
    {
        
        addlast(processing)
        {
            customaction(MyFlowAction)
            {
                ApplicationArea = All;
                CustomActionType = Flow;
                FlowId = '00001111-aaaa-2222-bbbb-3333cccc4444';
                FlowEnvironmentId = 'Default-44445555-eeee-6666-ffff-7777aaaa8888';
            }
        }
        addfirst(Promoted)
        {
            actionref(MyFlowPromoted; MyFlowAction)
            {
            }
        }

    }
}`;

        const expected = `pageextension 50100 CustomerCardExt extends "Customer Card"
{
  actions
  {
    addlast(processing)
    {
      customaction(MyFlowAction)
      {
        ApplicationArea = All;
        CustomActionType = Flow;
        FlowId = '00001111-aaaa-2222-bbbb-3333cccc4444';
        FlowEnvironmentId = 'Default-44445555-eeee-6666-ffff-7777aaaa8888';
      }
    }
    addfirst(Promoted)
    {
      actionref(MyFlowPromoted; MyFlowAction) {}
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});

describe('Views in page extensions', () => {
    it('Page extension object adding a view', () => {
        const code = `
pageextension 50050 "Some Extended Page" extends "My Base Page"
{
    views
    {
        addlast
        {
            view(BellaVista)
            {
                Caption = 'Bella Vista View';
                layout{
                movefirst(Control1; Control2)
                }
            }
        }
    }
}`;

        const expected = `pageextension 50050 "Some Extended Page" extends "My Base Page"
{
  views
  {
    addlast
    {
      view(BellaVista)
      {
        Caption = 'Bella Vista View';

        layout
        {
          movefirst(Control1; Control2)
        }
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Page extension object adding an analysis view', () => {
        const code = `
pageextension 50050 "Some Extended Page" extends "My Base Page"
{
analysisviews
{
    analysisview(PrettyView)
    {
        DefinitionFile='.\Resources\Views\Analysis.json';
    }
}
}`;

        const expected = `pageextension 50050 "Some Extended Page" extends "My Base Page"
{
  analysisviews
  {
    analysisview(PrettyView)
    {
      DefinitionFile = '.\Resources\Views\Analysis.json';
    }
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });

    it('Page extension moving views in the extended page', () => {
        const code = `
pageextension 50050 "Some Extended Page" extends "My Base Page"
{
    views
    {
        moveafter(AnchorView;View1,View2,View3)
    }
}`;

        const expected = `pageextension 50050 "Some Extended Page" extends "My Base Page"
{
  views
  {
    moveafter(AnchorView; View1, View2, View3)
  }
}
`;

        return alFormat(code).then(formattedCode => expect(formattedCode).to.equal(expected));
    });
});
