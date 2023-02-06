import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const api: TmApi = {
    sendNotification: (message: string) => {
        ipcRenderer.send('notify', message);
    },
    openFiles: (filenames: string[]) => {
        ipcRenderer.send('tm-open-files', filenames);
    },
    gotFilesContent: (callback: (event: IpcRendererEvent, content: FilesContent) => void) => {
        ipcRenderer.on('tm-got-files-content', callback);
    }
};

contextBridge.exposeInMainWorld('tmApi', api);
