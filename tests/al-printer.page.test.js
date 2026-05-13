import { describe, it } from 'mocha';
import { expect } from 'chai';
import antlr4 from 'antlr4';
import ALParser from '../../algrammar/JS/ALParser.js';
import printer from '../plugin/printer.js';
import * as prettier from "prettier";
import { alFormat } from './testUtils.js';

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

        field("Code"; Rec.Code)
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
              field("Code"; Rec.Code)
              {
              }
              field(Description; Rec.Description){ Caption='Description'; }
              field(Description2; Rec."Description 2")
              {
              }
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

        field("Code"; Rec.Code)
        {
        }
        field(Description; Rec.Description)
        {
          Caption = 'Description';
        }
        field(Description2; Rec."Description 2")
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
        actionref(AnotherPage_Promoted; RunAnotherPage)
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
