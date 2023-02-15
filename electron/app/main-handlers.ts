import { ipcMain, IpcMainEvent, Notification } from 'electron';
import { ToMainKeys } from '../preload-enums';
import { ToMainCalls } from '../main-from-renderer';
import { loadFilesContent } from './utils/load-files';

export function connectRendererHandlers() {
    ipcMain.on(ToMainKeys.notify,
        (_event, message) => {
            new Notification({ title: 'My Noti', body: message }).show();
        }
    );

    ipcMain.on(ToMainKeys.sendToMain,
        (_event: IpcMainEvent, data: any) => {
            const d = data as ToMainCalls;
            switch (d.type) {
                case 'notify': {
                    new Notification({ title: 'My Noti', body: d.message }).show();
                    break;
                }
                case 'dark-mode': {
                    d.active
                    break;
                }
                default: {
                    const really: never = d;
                    throw new Error(really);
                }
            }

            // const handlers = {}
            console.log('on ToMainKeys.sendToMain', data);
        }
    );

    ipcMain.handle(ToMainKeys.invokeFilesContent,
        (_event, filenames: string[]) => {
            return loadFilesContent(filenames) as FileContent[];
        }
    );
}
