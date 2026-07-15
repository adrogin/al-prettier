# AL Prettier for VS Code

A [Prettier](https://prettier.io/) plugin for AL language and a VS Code extension that provides code formatting using this plugin.

<img width="1412" height="868" alt="Code_QmgRFcuCtz" src="https://github.com/user-attachments/assets/ccc4096f-a785-4199-aa7f-abe2ea134885" />


## Installation

1. Install from VS Code Extensions Marketplace (direct link: [AL Prettier](https://marketplace.visualstudio.com/items?itemName=alexander-drogin.al-prettier-vscode) or search for "AL Prettier")
2. Or install manually by downloading the `.vsix` file and running `code --install-extension al-prettier-vscode-0.4.1.vsix`

## Usage

### Format Document
- Use the keyboard shortcut: `Shift+Alt+F` (Windows/Linux) or `Shift+Option+F` (macOS)
- Or right-click and select "Format Document"

### Format Selection
**Selection formatting is currently not supported. This feature will be available in future releases.**

### Format on Save
Enable format on save in VS Code settings:
```json
{
  "[al]": {
    "editor.defaultFormatter": "alexander-drogin.al-prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

## Configuration

You can customize the formatting behavior in VS Code settings:

```json
{
  "alPrettier.tabWidth": 4,
  "alPrettier.useTabs": false,
  "alPrettier.printWidth": 120,
  "alPrettier.groupGlobalVars": "none",
  "alPrettier.noLineBreaksInAttributes": false,
  "alPrettier.removeEmptyElements": false,
  "alPrettier.collapseEmptyBraces": true
}
```

### Options

- **tabWidth** (default: 4): Number of spaces per indentation level
- **useTabs** (default: false): Use tabs instead of spaces for indentation
- **printWidth** (default: 120): Specify the line length that the printer will wrap on
- **groupGlobalVars** (default: "none"): Group all global vars in the object. Available options: "none" - keep the variables as is; "top": move all variable declarations to the top, after the object properties; "bottom": move variables to the bottom; "beforeCode": place variables before procedures.
- **noLineBreaksInAttributes** (default: false): Disable wrapping of procedure attributes even if the line exceeds maximum print width. Attributes are always printed in a single line.
- **removeEmptyElements** (default false): Remove elements without content (this includes table fieldgroups, page actions and layout sections)
- **collapseEmptyBraces** (default true): Place curly braces without content between them on one line. This option applies, for example, to table field or key definitions without properties.

## Requirements

- VS Code 1.75 or later
- AL language support (from Microsoft Dynamics 365 Business Central AL Language extension)

## Known issues and limitations

- Requires valid AL syntax to format correctly. Formatting of an AL statement that cannot be parsed correctly will throw an error.
- Range formatting is in development and currently not implemented.
- Report objects with embedded RDLC layout are not supported.

## Contributing

Contributions are welcome! Please submit issues and pull requests to the repository.

## License

MIT
