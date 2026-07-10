# Changelog

All notable changes to the AL Prettier VS Code extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added
- Initial release of AL Prettier for VS Code
- Document formatting support for AL language files
- Range/selection formatting support
- Configuration options for formatting preferences
  - `tabWidth`: Customize indentation width
  - `useTabs`: Toggle between spaces and tabs
  - `printWidth`: Configure line width
- Format on save support
- Format document command (Shift+Alt+F)
- Format selection command (Ctrl+K Ctrl+F)
- Error reporting with helpful error messages

### Features
- Uses ANTLR4-based AL parser for accurate parsing
- Integrates with Prettier plugin system
- Works with AL language from Microsoft Dynamics 365 Business Central
- Configurable formatting options via VS Code settings

## [Unreleased]

### Planned
- Language server support for real-time validation
- Additional formatting options
- Syntax highlighting improvements
- Support for custom formatting rules
