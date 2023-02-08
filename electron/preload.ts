import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

//vvvvvvvvvvvv this copy of preload-types.ts: cannot be imported wo/ bundler
//import { ToMainKeys, ToRendererKeys } from "./preload-types";
enum ToMainKeys {
    notify = 'notify',
    openFiles = 'tm-open-files',
};

enum ToRendererKeys {
    gotFilesContent = 'tm-got-files-content',
    invokeFilesContent = 'tm-invoke-files-content',
};
//^^^^^^^^^^^^ this copy of preload-types.ts: cannot be imported wo/ bundler

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
    },
    invokeFilesContent: (filenames: string[]): Promise<FilesContent> => {
        return ipcRenderer.invoke(ToRendererKeys.invokeFilesContent, filenames);
    }
};

contextBridge.exposeInMainWorld('tmApi', api);
