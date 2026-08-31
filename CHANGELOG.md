# Changelog

## Version v0.5.1

### New features

- **DotNet** assembly definitions (`dotnet { assembly(...) { ... } }`, including `type()` declarations) can now be parsed and formatted.

### Parsing & formatting fixes
- Views in page extensions: page extensions can now add new views (`addfirst`/`addlast`), move existing views (`moveafter`/`movebefore`), and define analysis views.
- Page area properties (e.g. `Description`) are now parsed and printed, separated from the area's content elements.
- **OrderBy** property now supports ordering on multiple columns per direction, e.g. `OrderBy = descending(Column1, Column2), ascending(Column3, Column4);`.
- Comments placed around an interface header are now printed correctly.

## Version v0.5.0

### New features

- Batch formatting commands: new commands to format every .al file in the current folder or the whole workspace, with a cancellable progress notification.
- Dedicated output channel: parser errors are now reported once — in a new "ALPrettier" output channel — with file name, line, column, and the offending symbol.

### Parsing & formatting fixes
- **CalcFormula**: filter/upperlimit field references
- **CalcFormula** used as an identifier in expressions
- Nested parentheses in relation filter expressions now parse and print correctly
- Logical in expressions can now be combined with and/or (e.g. `X in [A, B, C] and (Y = Z)`, `if true in [A or B or C]` inside in brackets)
- **RunPageLink** property with a filter and an empty const() expression no longer fails to parse
- Page extension actions can add triggers - fixed parser error
- **OptionOrdinalValues** property
- Negative integer filters in table relations
- Verbatim strings in code statements
- Page labels in repeater controls
- Control add-in procedure/event attributes
- The **System** object in permission sets
- **FileUploadAction** in pages
- **CalcFormula** with an upperlimit filter
- **AddBefore/AddAfter** in report extension datasets
- Fixed parsing and formatting of cue groups inside grid controls
- Pragma directive placement in trigger lists now print correctly
- Trailing comments on the last procedure parameter no longer get displaced past the closing parenthesis.