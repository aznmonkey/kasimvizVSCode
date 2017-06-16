'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    let index = vscode.workspace.getConfiguration('kasimviz')['path'];
    let fs = require('fs');
    let filePath = vscode.Uri.file(index);
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.kasimviz', () => {
    // The code you place here will be executed every time your command is execute
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let text = fs.readFileSync(index, 'utf8');
        
        // Display a message box to the user
        let selection = editor.selection;
        let data = editor.document.getText(selection);
        let check = checkJSON(data);
        if(data !== "" && check) {
            data = data.toString().replace(/\r?\n/g, " ");
            text = text.replace(/setData\(.*\)\;/, 'setData(' + data.toString() + ');');
            fs.writeFileSync(index, text, 'utf8');
            return vscode.commands.executeCommand('vscode.previewHtml', filePath, vscode.ViewColumn.Two).then((success) => {
                    vscode.window.showInformationMessage("Text parsed successfully");
                }, (reason) => {
                    vscode.window.showErrorMessage(reason);
                });
        }        
    });

    context.subscriptions.push(disposable);
}

// checks whether text is selected and whether it's a valid json file
function checkJSON(text) {
        if (text === "") {
            vscode.window.showErrorMessage("No text selected, please selected the text that you wish to visualize (ctrl/cmd+a) to select the whole text");
            return false;
        }
        try {
            JSON.parse(text);
            return true;
        }
        catch (e) {
            vscode.window.showErrorMessage(e);
            return false;
        }
    }
    
// this method is called when your extension is deactivated
export function deactivate() {
}