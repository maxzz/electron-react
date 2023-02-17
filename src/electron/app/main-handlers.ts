import { ipcMain, IpcMainEvent, IpcMainInvokeEvent, Notification } from 'electron';
import { M4RInvoke, M4R } from './ipc-main';
import { loadFilesContent } from './utils/load-files';

export function connect_ListenersForCallFromRenderer() {
    
    // call

    function callFromRendererToMain(_event: IpcMainEvent, data: any) {
        const d = data as M4R.ToMainCalls;
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
        const d = data as M4RInvoke.InvokeCalls;
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
