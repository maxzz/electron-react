import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

// vvv....................................................................... // this copy of preload-types.ts: cannot be imported wo/ bundler
//
enum ToMainKeys {
    notify = 'notify',
    invokeFilesContent = 'tm-invoke-files-content',
    openFiles = 'tm-open-files',
};

enum ToRendererKeys {
    gotFilesContent = 'tm-got-files-content',
};
//
// ^^^.......................................................................

// type ToMainKeys = 'notify' | 'tm-open-files';
// type ToRendererKeys = 'tm-got-files-content';

const api: TmApi = {
    sendNotification: (message: string) => {
        ipcRenderer.send(ToMainKeys.notify, message);
    },
    invokeFilesContent: (filenames: string[]): Promise<FilesContent> => {
        return ipcRenderer.invoke(ToMainKeys.invokeFilesContent, filenames);
    },
    openFiles: (filenames: string[]) => {
        ipcRenderer.send(ToMainKeys.openFiles, filenames);
    },
    gotFilesContent: (callback: (event: IpcRendererEvent, content: FilesContent) => void) => {
        ipcRenderer.on(ToRendererKeys.gotFilesContent, callback);
    },
};

contextBridge.exposeInMainWorld('tmApi', api);
