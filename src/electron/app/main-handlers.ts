import { ipcMain, IpcMainEvent, IpcMainInvokeEvent, Notification } from 'electron';
import { ToMainCalls } from '../main-from-renderer';
import { loadFilesContent } from './utils/load-files';

export type FileContent2 = {
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
    
    // call

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
    }

    function connect_CallMain(channel: PreloadChannels, handler: (event: IpcMainEvent, data: any) => void) {
        ipcMain.on(channel, handler);
    }
    connect_CallMain('call-main', callFromRendererToMain);

    // invoke

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

    function connect_InvokeMain(channel: PreloadChannels, handler: (event: IpcMainInvokeEvent, data: any) => any) {
        ipcMain.handle(channel, handler);
    }
    connect_InvokeMain('invoke-main', invokeMain);
}
