import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

//....................................................................... // this copy of preload-types.ts: cannot be imported wo/ bundler
const ToMainKeys = {
    notify: 'notify',
    invokeFilesContent: 'tm-invoke-files-content',

    sendToMain: 'renderer-to-main',
};

const ToRendererKeys = {
    sendToRenderer: 'main-to-renderer',
};
//.......................................................................

const api: TmApi = {
    // sendNotification: (message: string) => {
    //     ipcRenderer.send(ToMainKeys.notify, message);
    // },
    // invokeFilesContent: (filenames: string[]): Promise<FileContent[]> => {
    //     return ipcRenderer.invoke(ToMainKeys.invokeFilesContent, filenames);
    // },

    // sendToMain: (data: any): void => {
    //     ipcRenderer.send(ToMainKeys.sendToMain, data);
    // },

    callMain: (data: any): void => {
        const channel: PreloadChannels = 'call-main';
        ipcRenderer.send(channel, data);
    },

    invokeMain: (data: any): any => {
        const channel: PreloadChannels = 'invoke-main';
        return ipcRenderer.invoke(channel, data);
    },

    setCbCallFromMain: (callback: (event: IpcRendererEvent, data: any) => void) => {
        const channel: PreloadChannels = 'send-to-renderer';
        ipcRenderer.removeAllListeners(channel);
        ipcRenderer.on(channel, callback);
    },

    // setRendererCbToMain: (callback: (event: IpcRendererEvent, data: any) => void) => {
    //     ipcRenderer.removeAllListeners(ToRendererKeys.sendToRenderer);
    //     ipcRenderer.on(ToRendererKeys.sendToRenderer, callback);
    // }
};

contextBridge.exposeInMainWorld('tmApi', api);
