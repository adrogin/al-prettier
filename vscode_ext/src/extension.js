/**
 * AL Prettier VS Code Extension
 * Main extension entry point
 */

import * as vscode from 'vscode';

let alPrettierPlugin;

export async function activate(context) {
    try {
        // Dynamically load prettier and the AL plugin
        const prettier = await import('prettier');
        alPrettierPlugin = await import('../../plugin/plugin.js');

        // Register the formatter for AL language
        const alFormatter = vscode.languages.registerDocumentFormattingEditProvider('al', {
            async provideDocumentFormattingEdits(document, options, token) {
                return formatDocument(document, options, prettier);
            }
        });

        // Register the range formatter
        const alRangeFormatter = vscode.languages.registerDocumentRangeFormattingEditProvider('al', {
            async provideDocumentRangeFormattingEdits(document, range, options, token) {
                return formatRange(document, range, options, prettier);
            }
        });

        context.subscriptions.push(alFormatter, alRangeFormatter);

        console.log('AL Prettier extension activated');
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Failed to activate AL Prettier: ${errorMessage}`);
        console.error('Activation error:', error);
    }
}

export function deactivate() {
    console.log('AL Prettier extension deactivated');
}

async function formatDocument(document, options, prettier) {
    try {
        const config = vscode.workspace.getConfiguration('alPrettier');
        const text = document.getText();

        if (!text || text.trim().length === 0) {
            return [];
        }

        const plugin = alPrettierPlugin.default || alPrettierPlugin;

        const formattedText = await prettier.format(text, {
            parser: 'al-parse',
            plugins: [plugin],
            tabWidth: config.get('tabWidth') || options.tabSize || 4,
            useTabs: config.get('useTabs') || !options.insertSpaces || false,
            printWidth: config.get('printWidth') || 120,
            groupGlobalVars: config.get('groupGlobalVars') || "none",
            noLineBreaksInAttributes: config.get('noLineBreaksInAttributes') || false,
            removeEmptyElements: config.get('removeEmptyElements') || false,
        });

        // Return a single edit that replaces the entire document
        const lastLine = document.lineCount - 1;
        const lastCharacter = document.lineAt(lastLine).text.length;

        return [
            vscode.TextEdit.replace(
                new vscode.Range(
                    new vscode.Position(0, 0),
                    new vscode.Position(lastLine, lastCharacter)
                ),
                formattedText
            )
        ];
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`AL Prettier: ${errorMessage}`);
        console.error('Formatting error:', error);
        return [];
    }
}

async function formatRange(document, range, options, prettier) {
    try {
        const config = vscode.workspace.getConfiguration('alPrettier');
        const text = document.getText(range);

        if (!text || text.trim().length === 0) {
            return [];
        }

        const plugin = alPrettierPlugin.default || alPrettierPlugin;

        const formattedText = await prettier.format(text, {
            parser: 'al-parse',
            plugins: [plugin],
            tabWidth: config.get('tabWidth') || options.tabSize || 4,
            useTabs: config.get('useTabs') || !options.insertSpaces || false,
            printWidth: config.get('printWidth') || 120,
            removeEmptyElements: config.get('removeEmptyElements') || false,
        });

        return [
            vscode.TextEdit.replace(range, formattedText)
        ];
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`AL Prettier: ${errorMessage}`);
        console.error('Formatting error:', error);
        return [];
    }
}
