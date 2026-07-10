# AL Prettier VS Code Extension - Project Summary

## Overview

A complete VS Code extension that wraps the AL Prettier plugin to provide professional code formatting for the AL language (Microsoft Dynamics 365 Business Central).

## Project Structure

```
vscode_ext/
├── .vscode/
│   ├── launch.json           # Debug launch configurations
│   ├── tasks.json            # Build and watch tasks
│   ├── settings.json         # Development workspace settings
│   └── extensions.json       # Recommended extensions
├── src/
│   ├── extension.js          # Main extension entry point
│   └── plugin.js             # Plugin wrapper
├── dist/                     # Build output (generated)
│   └── extension.js          # Compiled extension
├── resources/
│   └── icon.png              # Extension icon (optional)
├── .gitignore               # Git ignore rules
├── .vscodeignore             # VSIX package ignore rules
├── package.json              # Extension manifest
├── tsconfig.json             # TypeScript configuration (optional)
├── build.js                  # Build script using esbuild
├── README.md                 # User documentation
├── INSTALL.md                # Installation guide
├── DEVELOPMENT.md            # Development guide
├── CHANGELOG.md              # Version history
└── LICENSE                   # MIT License
```

## Key Files

### Extension Manifest (`package.json`)

- **name**: `al-prettier-vscode`
- **main**: Points to compiled extension at `dist/extension.js`
- **activationEvents**: Activates on `onLanguage:al`
- **contributes**: Configuration options for formatting preferences
- **engines**: Requires VS Code 1.75.0+

### Main Entry Point (`vscode_ext/src/extension.js`)

Implements:
- `activate()`: Registers the formatter provider when extension loads
- `deactivate()`: Cleanup on extension unload
- `formatDocument()`: Handles full document formatting
- `formatRange()`: Handles selection/range formatting

Features:
- Dynamically loads prettier and the AL plugin
- Registers both document and range formatters
- Reads configuration from VS Code settings
- Shows error messages in UI
- Supports format on save

### Build System (`build.js`)

- Uses esbuild for fast bundling
- Outputs to `vscode_ext/dist/extension.js`
- Supports watch mode for development
- Generates source maps for debugging

## How It Works

1. **Extension Activation**
   - When a `.al` file is opened or edited
   - Registers the document formatting provider
   - Registers the range formatting provider

2. **Formatting Request**
   - User triggers format (keyboard shortcut or menu)
   - VS Code calls the provider's format function
   - Extension reads configuration from VS Code settings
   - Calls prettier with the AL plugin

3. **Code Processing**
   - Prettier receives the AL code text
   - AL plugin parses using ANTLR4 grammar
   - Printer generates formatted output
   - Formatted text replaces original

4. **Error Handling**
   - Catches parsing/formatting errors
   - Shows user-friendly error messages
   - Logs details to extension output

## Configuration

The extension provides three configuration options:

```json
{
  "alPrettier.tabWidth": 4,
  "alPrettier.useTabs": false,
  "alPrettier.printWidth": 120
}
```

## Building the Extension

### Development Build
```bash
npm run build
```

### Watch Mode
```bash
npm run watch
```

### Production Build
```bash
npm run vscode:prepublish
```

### Package as VSIX
```bash
npm run package
```

## Development & Testing

1. Open the project in VS Code
2. Press `F5` to launch Extension Development Host
3. A new VS Code window opens with the extension
4. Open or create `.al` files to test formatting
5. Make changes to `src/extension.js`
6. Reload (Ctrl+R) to test changes

## Integration Points

### With AL Language
- Registers formatter for `al` language
- Works seamlessly with AL Language extension from Microsoft
- Uses AL parser from algrammar project

### With Prettier
- Registers as a Prettier plugin
- Uses Prettier's document formatting pipeline
- Leverages Prettier's configuration system

### With VS Code
- Uses DocumentFormattingEditProvider API
- Registers with `vscode.languages`
- Reads settings from VS Code workspace configuration
- Shows errors in VS Code UI

## Publishing

### To Marketplace

1. Create publisher account on https://marketplace.visualstudio.com
2. Create Personal Access Token (PAT)
3. Update `package.json` with correct publisher
4. Run: `vsce publish`

### Package for Distribution

```bash
npm run package
# Creates: al-prettier-vscode-1.0.0.vsix
```

## Features Implemented

✓ Document formatting (Shift+Alt+F)
✓ Range/selection formatting (Ctrl+K Ctrl+F)
✓ Format on save support
✓ Configuration options
✓ Error reporting
✓ ANTLR-based AL parsing
✓ Prettier plugin integration
✓ Source maps for debugging
✓ Build system with esbuild

## Future Enhancements

- [ ] Language Server Protocol (LSP) support
- [ ] Real-time validation
- [ ] Custom formatting rules
- [ ] Syntax highlighting improvements
- [ ] Code snippets
- [ ] Quick fixes
- [ ] Symbol navigation
- [ ] Debugger support

## Dependencies

**Runtime**:
- `vscode`: Provided by VS Code
- `prettier`: ^3.8.1 (for formatting engine)
- `antlr4`: ^4.13.2 (for AL parsing)

**Development**:
- `esbuild`: ^0.19.0 (for bundling)
- `vsce`: ^2.15.0 (for packaging)
- `@types/vscode`: ^1.75.0 (for TypeScript support)

## Files Generated During Build

```
dist/
├── extension.js              # Bundled extension code
└── extension.js.map          # Source map for debugging
```

## Installation for Users

1. Search "AL Prettier" in VS Code Extensions
2. Click Install
3. Reload VS Code
4. Start formatting AL files!

## Technical Details

- **Language**: JavaScript (with TypeScript support)
- **Platform**: Node.js 16+
- **Module System**: CommonJS
- **Build Tool**: esbuild
- **Parser**: ANTLR4
- **Formatter**: Prettier
- **Target**: VS Code 1.75.0+

---

This extension provides a seamless, professional code formatting experience for AL language developers using VS Code.
