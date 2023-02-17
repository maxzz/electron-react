import { ipcMain, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { callFromRendererToMain } from './ipc-main/ipc-calls';
import { invokeFromRenderer } from './ipc-main/ipc-invoke';

export function connect_ListenersForCallFromRenderer() {
    
    // call

    function connect_CallMain(channel: PreloadChannels, handler: (event: IpcMainEvent, data: any) => void) {
        ipcMain.on(channel, handler);
    }
    connect_CallMain('call-main', callFromRendererToMain);

    // invoke

    function connect_InvokeMain(channel: PreloadChannels, handler: (event: IpcMainInvokeEvent, data: any) => any) {
        ipcMain.handle(channel, handler);
    }
    connect_InvokeMain('invoke-main', invokeFromRenderer);
}
