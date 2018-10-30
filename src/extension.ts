'use strict';

import * as vscode from 'vscode';
import { workspace} from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let cmderLocation = workspace.getConfiguration('cmderrunner').get('cmderlocation');
    let workspaceLocation = workspace.workspaceFolders[0].uri.fsPath;

    const cp = require('child_process');

    let launchCmderAtFile = vscode.commands.registerCommand('extension.launchCmderAtFile', () => {
        
        let currentFile = vscode.window.activeTextEditor.document.uri.fsPath;
        let command = `"${cmderLocation}" /START "${currentFile.substring(0, currentFile.lastIndexOf('\\'))}"`;
        
        cp.exec(command, (err) => {
            if (err) {
                let backupCommand = `"${cmderLocation}" /START "${workspaceLocation}"`;
                cp.exec(backupCommand);
            }
        });

        vscode.window.showInformationMessage('Opening Cmder at the current file location');
    });

    let launchCmderAtWorkspace = vscode.commands.registerCommand('extension.launchCmderAtWorkspace', () => {
        let command = `"${cmderLocation}" /START "${workspaceLocation}"`;

        cp.exec(command);

        vscode.window.showInformationMessage('Opening Cmder at the current workspace folder');
    });

    context.subscriptions.push(launchCmderAtFile);
}

export function deactivate() {
}