/**
 * AL Prettier VS Code Extension
 * Main extension entry point
 */

import * as vscode from 'vscode';

let alPrettierPlugin;

async function collectAlFilesInWorkspace() {
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
        return vscode.workspace.findFiles('**/*.al');
    }

    return [];
}

async function collectAlFilesInFolder() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        let currentDir = vscode.Uri.file(editor.document.uri.fsPath).fsPath;

        // Keep going up directories until we find app.json or reach root
        while (currentDir) {
            const appJsonUri = vscode.Uri.file(`${currentDir}/app.json`);

            try {
                // Check if app.json exists in this directory
                await vscode.workspace.fs.stat(appJsonUri);

                // Found app.json, return all .al files in this folder
                return vscode.workspace.findFiles(
                    new vscode.RelativePattern(currentDir, '**/*.al')
                );
            } catch {
                // app.json not found, try parent directory
                const parentDir = vscode.Uri.file(currentDir).fsPath.split(/[\\/]/).slice(0, -1).join('/');

                // Stop if we've reached root or can't go further
                if (!parentDir || parentDir === currentDir) {
                    break;
                }
                currentDir = parentDir;
            }
        }
    }

    return [];
}

async function batchFormatFiles(prettier, options, files) {
    if (!files || files.length === 0) {
        vscode.window.showInformationMessage('No AL files found to format.');
        return;
    }

    return vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title: 'AL Prettier: Formatting files',
            cancellable: true,
        },
        async (progress, token) => {
            let successCount = 0;
            let errorCount = 0;
            let cancelledCount = 0;

            for (let i = 0; i < files.length; i++) {
                // Check if user clicked cancel button
                if (token.isCancellationRequested) {
                    cancelledCount = files.length - i;
                    break;
                }

                const fileUri = files[i];
                const fileName = fileUri.fsPath.split(/[\\/]/).pop();

                // Update progress with current file
                const percentage = ((i + 1) / files.length) * 100;
                progress.report({
                    increment: percentage - (i / files.length) * 100,
                    message: `${fileName} (${i + 1}/${files.length})`,
                });

                try {
                    const document = await vscode.workspace.openTextDocument(fileUri);
                    const text = document.getText();

                    if (!text || text.trim().length === 0) {
                        continue;
                    }

                    const config = vscode.workspace.getConfiguration('alPrettier');
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
                        collapseEmptyBraces: config.get('collapseEmptyBraces'),
                    });

                    // Write formatted content directly to file without opening editor
                    const uint8Array = new TextEncoder().encode(formattedText);
                    await vscode.workspace.fs.writeFile(fileUri, uint8Array);
                    successCount++;
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    console.error(`Error formatting ${fileUri.fsPath}:`, errorMessage);
                    errorCount++;
                }
            }

            // Show final summary message
            let message = `Formatted ${successCount} file(s)`;
            if (errorCount > 0) {
                message += `, ${errorCount} error(s)`;
            }
            if (cancelledCount > 0) {
                message += `, ${cancelledCount} cancelled`;
            }
            message += '.';

            vscode.window.showInformationMessage(message);
        }
    );
}

function registerCommands(context, prettier) {
    const options = { tabSize: 4, insertSpaces: true };

    const formatInFolderCommand = vscode.commands.registerCommand(
        'al-prettier.formatFilesInFolder',
        async () => {
            const alFiles = await collectAlFilesInFolder();
            await batchFormatFiles(prettier, options, alFiles);
        });

    const formatInWorkspaceCommand = vscode.commands.registerCommand(
        'al-prettier.formatFilesInWorkspace',
        async () => {
            const alFiles = await collectAlFilesInWorkspace();
            await batchFormatFiles(prettier, options, alFiles);
        });

    context.subscriptions.push(formatInFolderCommand, formatInWorkspaceCommand);
}

function registerFormatters(context) {
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
}

export async function activate(context) {
    try {
        // Dynamically load prettier and the AL plugin
        const prettier = await import('prettier');
        alPrettierPlugin = await import('../../plugin/plugin.js');

        registerFormatters(context);
        registerCommands(context, prettier);

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
            collapseEmptyBraces: config.get('collapseEmptyBraces'),
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
            groupGlobalVars: config.get('groupGlobalVars') || "none",
            noLineBreaksInAttributes: config.get('noLineBreaksInAttributes') || false,
            removeEmptyElements: config.get('removeEmptyElements') || false,
            collapseEmptyBraces: config.get('collapseEmptyBraces') || true,
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
