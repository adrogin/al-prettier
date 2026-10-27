# AL Prettier VS Code Extension - Installation & Setup Guide

## Prerequisites

Before using this extension, ensure you have:

1. **VS Code 1.75.0 or later**
2. **AL Language Extension** - Install the "AL Language" extension from Microsoft (ms-dynamics-smb.al)
   - Search for "AL Language" in VS Code Extensions
   - Or install from: https://marketplace.visualstudio.com/items?itemName=ms-dynamics-smb.al
3. **Node.js 16+** (only for development/building from source)

## Installation

### From VS Code Marketplace (Recommended)

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "AL Prettier"
4. Click Install
5. Reload VS Code if prompted

### From VSIX File

1. Download the `.vsix` file from the releases page
2. Run: `code --install-extension al-prettier-vscode-1.0.0.vsix`
3. Reload VS Code

### Building from Source

```bash
# Clone the repository
git clone <repository-url>
cd al-prettier/vscode_ext

# Install dependencies
npm install

# Build the extension
npm run build

# Package as VSIX
npm run package

# Install locally
code --install-extension al-prettier-vscode-1.0.0.vsix
```

## Configuration

Add these settings to your VS Code `settings.json`:

```json
{
  "[al]": {
    "editor.defaultFormatter": "al-prettier.al-prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": false
  },
  "alPrettier.tabWidth": 4,
  "alPrettier.useTabs": false,
  "alPrettier.printWidth": 120,
  "alPrettier.removeEmptyElements": false
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `alPrettier.tabWidth` | number | 4 | Number of spaces per indentation level |
| `alPrettier.useTabs` | boolean | false | Use tabs instead of spaces |
| `alPrettier.printWidth` | number | 120 | Line length before wrapping |
| `alPrettier.removeEmptyElements` | boolean | false | Remove elements without content (this includes table fieldgroups, page actions and laout sections) |

## Usage

### Format Entire Document

- **Windows/Linux**: `Shift+Alt+F`
- **macOS**: `Shift+Option+F`
- Or: Right-click → "Format Document"
- Or: Command Palette (Ctrl+Shift+P) → "Format Document"

### Format Selection

**Selection formatting is currently not supported. This feature will be available in one of the future releases.**

### Format on Save

Enable in VS Code settings:

```json
{
  "[al]": {
    "editor.formatOnSave": true
  }
}
```

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md) for development setup and debugging instructions.

## Support

- Report issues: https://github.com/your-repo/issues
- Feature requests: https://github.com/your-repo/issues
- Documentation: Check the README.md file

## License

MIT - See LICENSE file
