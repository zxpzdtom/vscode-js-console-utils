"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function deleteFoundLogStatements(workspaceEdit, docUri, logs, logType) {
    logs.forEach((log) => {
        workspaceEdit.delete(docUri, log);
    });
    vscode.workspace.applyEdit(workspaceEdit).then(() => vscode.window.showInformationMessage(`${logs.length} console.${logType} deleted`));
}
function insertText(text) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('Can\'t insert log because no document is open');
        return;
    }
    const selection = editor.selection;
    const range = new vscode.Range(selection.start, selection.end);
    editor.edit((editBuilder) => {
        editBuilder.replace(range, text);
    });
}
function getAllLogStatements(document, documentText, logType) {
    let logStatements = [];
    let match;
    let logRegex = /console.log\((.*)\);?/g;
    if (logType === 'warn') {
        logRegex = /console.warn\((.*)\);?/g;
    }
    else if (logType === 'error') {
        logRegex = /console.error\((.*)\);?/g;
    }
    else if (logType === 'debug') {
        logRegex = /console.debug\((.*)\);?/g;
    }
    else if (logType === 'table') {
        logRegex = /console.table\((.*)\);?/g;
    }
    else if (logType === 'info') {
        logRegex = /console.info\((.*)\);?/g;
    }
    while (match = logRegex.exec(documentText)) {
        let matchRange = new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length));
        if (!matchRange.isEmpty)
            logStatements.push(matchRange);
    }
    return logStatements;
}
function activate(context) {
    let insertLogStatement = vscode.commands.registerCommand('extension.insertLogStatement', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        const { getText, getWordRangeAtPosition } = editor.document;
        for (let index = 0; index < editor.selections.length; index++) {
            const selection = editor.selections[index];
            const wordRangeAtPosition = getWordRangeAtPosition(selection.active);
            let text = getText(selection).trim();
            if (wordRangeAtPosition)
                text = getText(wordRangeAtPosition).trim();
            const config = vscode.workspace.getConfiguration("console-utils");
            const { icons, fontSize, fontColors, backgroundColors, logType } = config;
            const icon = icons[Math.floor(Math.random() * icons.length)];
            const color = fontColors[Math.floor(Math.random() * fontColors.length)];
            const background = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
            let styles = [];
            if (fontSize && fontSize !== 14)
                styles.push(`font-size:${fontSize}px`);
            if (color)
                styles.push(`color:${color}`);
            if (background)
                styles.push(`background:${background}`);
            const prefix = ["%c", icon, text].filter(Boolean).join(' ');
            const content = [`"${prefix}"`, `"${styles.join(';')}"`, text].filter(Boolean).join(', ');
            vscode.commands.executeCommand('editor.action.insertLineAfter').then(() => {
                insertText(`console.${logType}(${content});`);
            });
        }
    });
    const deleteAllLogStatements = vscode.commands.registerCommand('extension.deleteAllLogStatements', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        const document = editor.document;
        const documentText = editor.document.getText();
        let workspaceEdit = new vscode.WorkspaceEdit();
        const config = vscode.workspace.getConfiguration("console-utils");
        const { logType } = config;
        const logStatements = getAllLogStatements(document, documentText, logType);
        deleteFoundLogStatements(workspaceEdit, document.uri, logStatements, logType);
    });
    context.subscriptions.push(insertLogStatement);
    context.subscriptions.push(deleteAllLogStatements);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map