import * as vscode from 'vscode';
import fs from 'fs';
import { parseJsonFile } from './parser';
import { ApiAfterAddon } from '../../config/api'

export function parseApiData(uri: vscode.Uri) {
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
    const filePath = uri.fsPath;
    const wf = workspaceFolder?.uri.fsPath;
    if (wf && fs.existsSync(filePath)) {
        parseJsonFile(filePath, wf);
    }
}

export function registerJSONDataFileWatcher() {
    const fileWatcher = vscode.workspace.createFileSystemWatcher(ApiAfterAddon);
    fileWatcher.onDidChange(parseApiData);
    fileWatcher.onDidCreate(parseApiData);
    fileWatcher.onDidDelete(parseApiData);
    return fileWatcher;
}