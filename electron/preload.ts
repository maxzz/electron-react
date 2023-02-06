import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { ToMainKeys, ToRendererKeys } from "./preload-types";

// type ToMainKeys = 'notify' | 'tm-open-files';
// type ToRendererKeys = 'tm-got-files-content';

const api: TmApi = {
    sendNotification: (message: string) => {
        ipcRenderer.send(ToMainKeys.notify, message);
    },
    openFiles: (filenames: string[]) => {
        ipcRenderer.send(ToMainKeys.openFiles, filenames);
    },
    gotFilesContent: (callback: (event: IpcRendererEvent, content: FilesContent) => void) => {
        ipcRenderer.on(ToRendererKeys.gotFilesContent, callback);
    }
};

contextBridge.exposeInMainWorld('tmApi', api);
