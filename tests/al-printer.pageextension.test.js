import { describe, it } from 'mocha';
import { expect } from 'chai';
import antlr4 from 'antlr4';
import ALParser from '../../algrammar/JS/ALParser.js';
import printer from '../plugin/printer.js';
import * as prettier from "prettier";
import { alFormat } from './testUtils.js';

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

});
