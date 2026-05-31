import { describe, it } from 'mocha';
import { expect } from 'chai';
import { alFormat } from './testUtils.mjs';

describe('Query object structure', () => {
    it('Empty query object without any elements', () => {
        const code = `
query 50000 MyQuery
{}`;

        const expected = `query 50000 MyQuery
{
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Query properties', () => {
        const code = `
query 50000 MyQuery
{Caption='My Query'; Description='This is a test query'; }`;

        const expected = `query 50000 MyQuery
{
  Caption = 'My Query';
  Description = 'This is a test query';
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Query object with namespace and properties, no dataitems', () => {
        const code = `
namespace Cronus.OuterSpace;
using Microsoft.Inventory.Item;
query 50000 MyQuery
{Caption = 'My Query';
AboutText='Just a test query';}`;

        const expected = `namespace Cronus.OuterSpace;

using Microsoft.Inventory.Item;

query 50000 MyQuery
{
  Caption = 'My Query';
  AboutText = 'Just a test query';
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Query with two linked dataitems', () => {
        const code = `
query 50000 MyQuery
{
    elements
    {
        dataitem(TopLevelDataItem; "DataItem Source Table")
        {
            dataitem(NestedDataItem; "Another Source Table")
            {
                DataItemLink = ID = TopLevelDataItem.ID;
                column(Item_No; "Item No."){}
    }}}
}`;

        const expected = `query 50000 MyQuery
{
  elements
  {
    dataitem(TopLevelDataItem; "DataItem Source Table")
    {
      dataitem(NestedDataItem; "Another Source Table")
      {
        DataItemLink = ID = TopLevelDataItem.ID;

        column(Item_No; "Item No.")
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

    it('Query with two linked dataitems, links on multiple columns', () => {
        const code = `
query 50000 MyQuery
{
    elements
    {
        dataitem(TopLevelDataItem; "DataItem Source Table")
        {
            dataitem(NestedDataItem; "Another Source Table")
            {
                DataItemLink = Type = TopLevelDataItem.Type, ID = TopLevelDataItem.ID;
                column(Item_No; "Item No."){}
    }}}
}`;

        const expected = `query 50000 MyQuery
{
  elements
  {
    dataitem(TopLevelDataItem; "DataItem Source Table")
    {
      dataitem(NestedDataItem; "Another Source Table")
      {
        DataItemLink = Type = TopLevelDataItem.Type, ID = TopLevelDataItem.ID;

        column(Item_No; "Item No.")
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

    it('Long DataItemLink property breaks the line', () => {
        const code = `
query 50000 MyQuery
{
    elements
    {
        dataitem(TopLevelDataItem; "DataItem Source Table")
        {
            dataitem(NestedDataItem; "Another Source Table")
            {
                DataItemLink = Type = TopLevelDataItem.Type, ID = TopLevelDataItem.ID, "Line No." = TopLevelDataItem."Line No.";
                column(Item_No; "Item No."){}
    }}}
}`;

        const expected = `query 50000 MyQuery
{
  elements
  {
    dataitem(TopLevelDataItem; "DataItem Source Table")
    {
      dataitem(NestedDataItem; "Another Source Table")
      {
        DataItemLink =
          Type = TopLevelDataItem.Type,
          ID = TopLevelDataItem.ID,
          "Line No." = TopLevelDataItem."Line No.";

        column(Item_No; "Item No.")
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

    it('Column and filter properties', () => {
        const code = `
query 50000 MyQuery
{
    elements
    {
        dataitem(TopLevelDataItem; "DataItem Source Table")
        {
        column(Item_No; "Item No."){ Caption = 'Item No.'; }
        filter(Location_Filter; "Location Filter"){ Caption = 'Location Filter'; }
    }}
}`;

        const expected = `query 50000 MyQuery
{
  elements
  {
    dataitem(TopLevelDataItem; "DataItem Source Table")
    {
      column(Item_No; "Item No.")
      {
        Caption = 'Item No.';
      }
      filter(Location_Filter; "Location Filter")
      {
        Caption = 'Location Filter';
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('DataItemTableFilter property', () => {
        const code = `
query 50000 MyQuery
{
    elements
    {
        dataitem(TopLevelDataItem; "DataItem Source Table")
        {
            column(Item_No; "Item No."){ DataItemTableFilter=Status=filter(Planned|"Firm Planned"|Released); }
        }
    }}`;

        const expected = `query 50000 MyQuery
{
  elements
  {
    dataitem(TopLevelDataItem; "DataItem Source Table")
    {
      column(Item_No; "Item No.")
      {
        DataItemTableFilter =
          Status = filter(Planned | "Firm Planned" | Released);
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('DataItemTableFilter with const filter', () => {
        const code = `
query 50000 MyQuery
{
    elements
    {
        dataitem(TopLevelDataItem; "DataItem Source Table")
        {
            column(Item_No; "Item No."){ DataItemTableFilter=Type = const(Inventory); }
        }
    }}`;

        const expected = `query 50000 MyQuery
{
  elements
  {
    dataitem(TopLevelDataItem; "DataItem Source Table")
    {
      column(Item_No; "Item No.")
      {
        DataItemTableFilter = Type = const(Inventory);
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('DataItemTableFilter property with two filtered fields', () => {
        const code = `
query 50000 MyQuery
{
    elements
    {
        dataitem(ReservEntryFor; "Reservation Entry")
        {
            DataItemTableFilter = "Source Type" = const(Database::"Sales Line"),Positive = const(false);
        }
    }}`;

        const expected = `query 50000 MyQuery
{
  elements
  {
    dataitem(ReservEntryFor; "Reservation Entry")
    {
      DataItemTableFilter =
        "Source Type" = const(Database::"Sales Line"),
        Positive = const(false);
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Query OrderBy property', () => {
        const code = `
query 50000 MyQuery
{
OrderBy=ascending(AscColName), descending(DescColName);
}`;

        const expected = `query 50000 MyQuery
{
  OrderBy = ascending(AscColName), descending(DescColName);
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });

    it('Aggregated column without explicit source', () => {
        const code = `
query 50000 MyQuery
{
    elements
    {
        dataitem(TopLevelDataItem; "DataItem Source Table")
        {
            column(Item_No_Count){ Method=Count; }
        }
    }}`;

        const expected = `query 50000 MyQuery
{
  elements
  {
    dataitem(TopLevelDataItem; "DataItem Source Table")
    {
      column(Item_No_Count)
      {
        Method = Count;
      }
    }
  }
}
`;

        return alFormat(code).then(formattedCode =>
            expect(formattedCode).to.equal(expected))
    });
});
