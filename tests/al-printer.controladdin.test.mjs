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

    it('Internal procedure in addin', () => {
        const code = `
controladdin "NiceUIControl"
{
internal procedure PaintItBlack();
}`;

        const expected = `controladdin "NiceUIControl"
{
  internal procedure PaintItBlack();
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('ControlAddIn with multiple scripts and stylesheets, long line', () => {
        const code = `
controladdin "NiceUIControl"
{
    Images = 'ControlAddin/Images/Image1.png', 'ControlAddin/Images/Image2.png', 'ControlAddin/Images/Image3.png';
    Stylesheets = 'StyleSheets/style1.css', 'StyleSheets/style2.css', 'StyleSheets/style3.css';
    Scripts = 'Scripts/index.js', 'Scripts/chunk1.js', 'Scripts/chunk2.js', 'Scripts/chunk3.js';
}`;

        const expected = `controladdin "NiceUIControl"
{
  Images =
    'ControlAddin/Images/Image1.png',
    'ControlAddin/Images/Image2.png',
    'ControlAddin/Images/Image3.png';
  Stylesheets =
    'StyleSheets/style1.css',
    'StyleSheets/style2.css',
    'StyleSheets/style3.css';
  Scripts =
    'Scripts/index.js',
    'Scripts/chunk1.js',
    'Scripts/chunk2.js',
    'Scripts/chunk3.js';
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('ControlAddIn with multiple scripts and stylesheets, short line', () => {
        const code = `
controladdin "NiceUIControl"
{
    Images = 'Images/Image1.png', 'Images/Image2.png';
    Stylesheets = 'StyleSheets/style1.css', 'StyleSheets/style2.css';
    Scripts = 'Scripts/index.js', 'Scripts/chunk1.js', 'Scripts/chunk2.js';
}`;

        const expected = `controladdin "NiceUIControl"
{
  Images = 'Images/Image1.png', 'Images/Image2.png';
  Stylesheets = 'StyleSheets/style1.css', 'StyleSheets/style2.css';
  Scripts = 'Scripts/index.js', 'Scripts/chunk1.js', 'Scripts/chunk2.js';
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Long ControlAddIn event declaration', () => {
        const code = `
controladdin "NiceUIControl"
{
  event VeryLongControlAddInEventName(AndVeryLongParameterNameToo: Text; AnotherVeryLongParameterName: Text);
}`;

        const expected = `controladdin "NiceUIControl"
{
  event VeryLongControlAddInEventName(
    AndVeryLongParameterNameToo: Text;
    AnotherVeryLongParameterName: Text);
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Printer adds a missing semicolon after event declaration', () => {
        const code = `
controladdin "MyControl"
{
  event EventOne()
  event EventTwo()
}`;

        const expected = `controladdin "MyControl"
{
  event EventOne();
  event EventTwo();
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Print event declaration with attributes', () => {
        const code = `
controladdin "MyControl"
{
  [Obsolete('Use EventTwo instead', '28.0')]
  event EventOne();
  event EventTwo();
}`;

        const expected = `controladdin "MyControl"
{
  [Obsolete('Use EventTwo instead', '28.0')]
  event EventOne();
  event EventTwo();
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('Print control add-in procedure with attributes', () => {
        const code = `
controladdin "MyControl"
{
  [Obsolete('Not used anymore, use NewProcedure', '28.0')]
  procedure OldProcedure();
  procedure NewProcedure();
}`;

        const expected = `controladdin "MyControl"
{
  [Obsolete('Not used anymore, use NewProcedure', '28.0')]
  procedure OldProcedure();
  procedure NewProcedure();
}
`;

        return alFormat(code, { removeEmptyElements: true }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});
