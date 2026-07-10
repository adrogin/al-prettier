# VS Code Settings for Extension Development

The following settings are recommended for development:

## In `.vscode/settings.json`:

```json
{
  "[al]": {
    "editor.defaultFormatter": "al-prettier.al-prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": false
  },
  "alPrettier.tabWidth": 4,
  "alPrettier.useTabs": false
}
```

## Build and Test

```bash
# Install dependencies
npm install

# Build the extension
npm run build

# Watch mode
npm run watch

# Package as VSIX
npx vsce package
```

## Debugging

1. Open the project in VS Code
2. Press `F5` to launch the Extension Development Host
3. The extension will start in a new VS Code window
4. Test formatting with AL files

## Extension Development Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Language Server Extension Guide](https://code.visualstudio.com/api/language-extensions/overview)
- [Prettier Plugin Development](https://prettier.io/docs/en/plugins.html)
