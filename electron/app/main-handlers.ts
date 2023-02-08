import { ipcMain, Notification } from 'electron';
import { win } from './main-window';
import { ToMainKeys } from '../preload-types';
import { loadFilesContent } from './utils/load-files';
export function initHandlers() {}

ipcMain.on(ToMainKeys.notify, (_event, message) => {
    new Notification({ title: 'My Noti', body: message }).show();
});

ipcMain.handle(ToMainKeys.invokeFilesContent, (event, filenames: string[]) => {
    return loadFilesContent(filenames);
});
