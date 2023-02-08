import path from 'node:path';
import { readFileSync, statSync } from 'node:fs';
import { ipcMain, Notification } from 'electron';
import { win } from './main-window';
import { ToMainKeys, ToRendererKeys } from '../preload-types';

export function initHandlers() {}

ipcMain.on(ToMainKeys.notify, (_event, message) => {
    new Notification({ title: 'My Noti', body: message }).show();
});

function loadFilesContent(filenames: string[]): FilesContent {
    console.log('filenames', filenames);

    const files: string[] = [];
    const folders: string[] = [];
    const failed: FileContent[] = [];

    (filenames || []).forEach((filename) => {
        try {
            const st = statSync(filename);
            if (st.isFile()) {
                files.push(filename);
            } else if (st.isDirectory()) {
                folders.push(filename);
            }
        } catch (error) {
            failed.push({
                path: filename,
                cnt: error.message,
            });
        }
    });

    const loaded: FileContent[] = files.map((filename) => {
        const cnt = readFileSync(filename).toString();
        return {
            path: filename,
            cnt,
        };
    });

    return {
        files: loaded,
        failed,
    };
}

ipcMain.on(ToMainKeys.openFiles, (event, filenames: string[]) => {
    const res = loadFilesContent(filenames);

    win?.webContents.send(ToRendererKeys.gotFilesContent, {
        files: res.files,
    });
});

ipcMain.handle(ToMainKeys.invokeFilesContent, (event, filenames: string[]) => {
    const res = loadFilesContent(filenames);
    return res;
});
