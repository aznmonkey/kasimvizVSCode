'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    function checkJSON(text) {
        if (text === "") {
            vscode.window.showErrorMessage("No text selected");
        }
        try {
            JSON.parse(text);
        }
        catch (e) {
            vscode.window.showErrorMessage("Not a JSON:" + e);
        }
    }
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    
    let index = vscode.workspace.getConfiguration('kasimviz')['path'];
    
        //let index = '/Users/xingli/Documents/UIC/Research/KaSimVSExtension/kasim/src/viz/index.html'
    let filePath = vscode.Uri.file(index);
    //let registration = vscode.workspace.registerTextDocumentContentProvider('css-preview', provider);
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.kasimviz', () => {
    // The code you place here will be executed every time your command is execute
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        let fs = require('fs');
        let text = fs.readFileSync(index, 'utf8');

        
        // Display a message box to the user
        let selection = editor.selection;
        let data = editor.document.getText(selection);
        checkJSON(data);
        if(data !== "") {
            data = data.toString().replace(/\r?\n/g, " ");
<<<<<<< HEAD
            text = text.replace(/setData\(.*\)\;/, 'setData(' + data.toString() + ');');
=======
            text = text.replace(/setData\(.*\)/, 'setData(' + data.toString() + ');');
>>>>>>> f7a88ba4b7138c5dc046907ab960f76dfe70bf75
            fs.writeFileSync(index, text, 'utf8');
        }

        return vscode.commands.executeCommand('vscode.previewHtml', filePath, vscode.ViewColumn.Two).then((success) => {
		}, (reason) => {
			vscode.window.showErrorMessage(reason);
		});
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}