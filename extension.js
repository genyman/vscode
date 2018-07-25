var path = require('path');

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.genyman', function (fileUrl) {

        let selectedFile = '';

        if (fileUrl === undefined)
        {
            selectedFile = vscode.window.activeTextEditor.document.uri.fsPath;
        }
        else
        {
            selectedFile = fileUrl.fsPath;
        }


        const filename = path.basename(selectedFile);
        const filePath = path.dirname(selectedFile);

        // current issue:
        // - do not create if genyman terminal already exist

        var terminal = vscode.window.createTerminal('genyman');
        terminal.sendText(`cd "${filePath}"`);
        terminal.show(false);
        terminal.sendText('genyman ' + filename);
        
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;


