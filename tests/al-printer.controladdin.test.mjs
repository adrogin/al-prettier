import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('ControlAddIn object', () => {
    it('ControlAddIn with one procedure and one event', () => {
        const code = `
controladdin "NiceUIControl"
{
    Images = 'ControlAddin/Image/*';
    Stylesheets = 'StyleSheets/style.css';
    Scripts = 'Scripts/index.js';
    RequestedWidth = 80;
    RequestedHeight = 120;

    event AddInReady();
    procedure ApplySettings(Settings: JsonObject);
}`;

        const expected = `controladdin "NiceUIControl"
{
  Images = 'ControlAddin/Image/*';
  Stylesheets = 'StyleSheets/style.css';
  Scripts = 'Scripts/index.js';
  RequestedWidth = 80;
  RequestedHeight = 120;

  event AddInReady();
  procedure ApplySettings(Settings: JsonObject);
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('ControlAddIn with multiple events', () => {
        const code = `
controladdin "NiceUIControl"
{
    event AddInReady();
    event AddInStateChanged(NewState: Text);
    event ButtonPressed(ButtonId: Text);
}`;

        const expected = `controladdin "NiceUIControl"
{
  event AddInReady();
  event AddInStateChanged(NewState: Text);
  event ButtonPressed(ButtonId: Text);
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});
