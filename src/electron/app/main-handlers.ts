import { ipcMain, IpcMainEvent, IpcMainInvokeEvent, Notification } from 'electron';
import { ToMainKeys } from '../preload-enums';
import { ToMainCalls } from '../main-from-renderer';
import { loadFilesContent } from './utils/load-files';

type FileContent2 = {
    name: string;                   // file name
    fullPath: string;               // file full path
    cnt: string;                    // file content or error message
    failed?: boolean;               // if failed the cnt member has error text

    entry?: FileSystemFileEntry;    // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    file?: File;                    // File object from async entry.file() call
};

type DoLoadfiles = {
    type: 'load-files';
    filenames: string[];
};

type DoLoadfiles2 = {
    type: 'load-files2';
    filenames: string[];
};

type DoLoadfiles3 = {
    type: 'load-files3';
    filenames: string[];
};

type InvokeCalls = DoLoadfiles | DoLoadfiles2/* | DoLoadfiles3*/;

export function connectRendererHandlers() {
    // ipcMain.on(ToMainKeys.notify,
    //     (_event, message) => {
    //         new Notification({ title: 'My Noti', body: message }).show();
    //     }
    // );

    function connectCallMain(channel: PreloadChannels, handler: (event: IpcMainEvent, data: any) => void) {
        ipcMain.on(channel, handler);
    }

    function connectInvokeMain(channel: PreloadChannels, handler: (event: IpcMainEvent, data: any) => Promise<any>) {
        ipcMain.on(channel, handler);
    }

    function callFromRendererToMain(_event: IpcMainEvent, data: any) {
        const d = data as ToMainCalls;
        switch (d.type) {
            case 'notify': {
                new Notification({ title: 'My Noti', body: d.message }).show();
                break;
            }
            case 'dark-mode': {
                d.active;
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

    connectCallMain('call-main', callFromRendererToMain);
    //ipcMain.on(ToMainKeys.sendToMain, callFromRendererToMain);

    function invokeMain(event: IpcMainInvokeEvent, data: any): any {
        const d = data as InvokeCalls;
        switch (d.type) {
            case 'load-files': {
                return loadFilesContent(d.filenames);
                break;
            }
            case 'load-files2': {
                return loadFilesContent(d.filenames);
                break;
            }
            default: {
                const really: never = d;
                throw new Error(really);
            }
        }
    }

    connectInvokeMain('invoke-main', invokeMain);

    //ipcMain.handle(ToMainKeys.invokeFilesContent, invokeMain);

    // ipcMain.handle(ToMainKeys.invokeFilesContent,
    //     (_event, filenames: string[]) => {
    //         return loadFilesContent(filenames) as FileContent[];
    //     }
    // );
}
