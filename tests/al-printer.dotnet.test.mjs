import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('DotNet assembly', () => {
    it('DotNet assembly declaration with proprties and one type', () => {
        const code = `
dotnet
{
    assembly("EtwPerformanceProfiler")
    {
        Version = '1.0.0.0';
        Culture = 'neutral';
        PublicKeyToken = 'null';

        type("EtwPerformanceProfiler.EtwPerformanceProfiler"; "EtwPerformanceProfiler")
        {
        }
    }
}`;

        const expected = `dotnet
{
  assembly("EtwPerformanceProfiler")
  {
    Version = '1.0.0.0';
    Culture = 'neutral';
    PublicKeyToken = 'null';

    type("EtwPerformanceProfiler.EtwPerformanceProfiler"; "EtwPerformanceProfiler") {}
  }
}
`;

        return alFormat(code, { noLineBreaksInAttributes: false }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });

    it('DotNet assembly declaration with multiple types', () => {
        const code = `
dotnet
{
    assembly("Microsoft.Dynamics.Nav.EwsWrapper.ALTestHelper")
    {
        type("Microsoft.Dynamics.Nav.Exchange.ALTest.EmailAddress"; "Microsoft.Dynamics.Nav.Exchange.ALTest.EmailAddress")
        {
        }

        type("Microsoft.Dynamics.Nav.Exchange.ALTest.EmailFolder"; "Microsoft.Dynamics.Nav.Exchange.ALTest.EmailFolder")
        {
        }

        type("Microsoft.Dynamics.Nav.Exchange.ALTest.EmailMessage"; "Microsoft.Dynamics.Nav.Exchange.ALTest.EmailMessage")
        {
        }

        type("Microsoft.Dynamics.Nav.Exchange.Attachment"; "Microsoft.Dynamics.Nav.Exchange.Attachment")
        {
        }
    }
}
`;

        const expected = `dotnet
{
  assembly("Microsoft.Dynamics.Nav.EwsWrapper.ALTestHelper")
  {
    type("Microsoft.Dynamics.Nav.Exchange.ALTest.EmailAddress"; "Microsoft.Dynamics.Nav.Exchange.ALTest.EmailAddress") {}
    type("Microsoft.Dynamics.Nav.Exchange.ALTest.EmailFolder"; "Microsoft.Dynamics.Nav.Exchange.ALTest.EmailFolder") {}
    type("Microsoft.Dynamics.Nav.Exchange.ALTest.EmailMessage"; "Microsoft.Dynamics.Nav.Exchange.ALTest.EmailMessage") {}
    type("Microsoft.Dynamics.Nav.Exchange.Attachment"; "Microsoft.Dynamics.Nav.Exchange.Attachment") {}
  }
}
`;

        return alFormat(code, { noLineBreaksInAttributes: false }).then(formattedCode => expect(formattedCode).to.equal(expected))
    });
});
