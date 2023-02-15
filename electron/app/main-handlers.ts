import { ipcMain, Notification } from 'electron';
import { appWin } from './main-window';
import { ToMainKeys } from '../preload-enums';
import { loadFilesContent } from './utils/load-files';

export function connectRendererHandlers() {
    ipcMain.on(ToMainKeys.notify,
        (_event, message) => {
            new Notification({ title: 'My Noti', body: message }).show();
        }
    );

    ipcMain.handle(ToMainKeys.invokeFilesContent,
        (_event, filenames: string[]) => {
            return loadFilesContent(filenames) as FileContent[];
        }
    );
}
