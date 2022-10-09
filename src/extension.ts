import * as vscode from 'vscode';

function deleteFoundLogStatements(workspaceEdit: vscode.WorkspaceEdit, docUri: vscode.Uri, logs: vscode.Range[], logType: string) {
	logs.forEach((log) => {
		workspaceEdit.delete(docUri, log);
	});

	vscode.workspace.applyEdit(workspaceEdit).then(() =>
		vscode.window.showInformationMessage(`${logs.length} console.${logType} deleted`)
	);
}

function insertText(text: string) {
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

function getAllLogStatements(document: vscode.TextDocument, documentText: string, logType: string) {
	let logStatements = [];

	let match;
	let logRegex = /console.log\((.*)\);?/g;
	if (logType === 'warn') {
		logRegex = /console.warn\((.*)\);?/g;
	} else if (logType === 'error') {
		logRegex = /console.error\((.*)\);?/g;
	} else if (logType === 'debug') {
		logRegex = /console.debug\((.*)\);?/g;
	} else if (logType === 'table') {
		logRegex = /console.table\((.*)\);?/g;
	} else if (logType === 'info') {
		logRegex = /console.info\((.*)\);?/g;
	}
	while (match = logRegex.exec(documentText)) {
		let matchRange =
			new vscode.Range(
				document.positionAt(match.index),
				document.positionAt(match.index + match[0].length)
			);
		if (!matchRange.isEmpty)
			logStatements.push(matchRange);
	}
	return logStatements;
}

export function activate(context: vscode.ExtensionContext) {

	let insertLogStatement = vscode.commands.registerCommand('extension.insertLogStatement', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		const { getText, getWordRangeAtPosition, lineAt } = editor.document;
		const selection = editor.selection;
		const { lineNumber } = lineAt(selection.active.line);
		const wordRangeAtPosition = getWordRangeAtPosition(selection.active);
		let text = getText(selection).trim();
		if (!text && wordRangeAtPosition)
			text = getText(wordRangeAtPosition).trim();
		const config = vscode.workspace.getConfiguration("console-utils");
		const { icons, fontSize, fontColors, backgroundColors, logType, showLineNumber, showText, quote } = config;
		const icon = icons[Math.floor(Math.random() * icons.length)];
		const color = fontColors[Math.floor(Math.random() * fontColors.length)];
		const background = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
		let styles: string[] = [];
		if (fontSize && fontSize !== 14) styles.push(`font-size:${fontSize}px`);
		if (color) styles.push(`color:${color}`);
		if (background) styles.push(`background:${background}`);
		const prefix = ["%c", showLineNumber && `Line:${lineNumber}`, icon, showText && text].filter(Boolean).join(' ');
		const content = [`${quote}${prefix}${quote}`, `${quote}${styles.join(';')}${quote}`, text].filter(Boolean).join(', ');
		vscode.commands.executeCommand('editor.action.insertLineAfter').then(() => {
			insertText(`console.${logType}(${content});`);
		});
	});

	const deleteAllLogStatements = vscode.commands.registerCommand('extension.deleteAllLogStatements', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

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

export function deactivate() { }
