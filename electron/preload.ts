import { contextBridge, ipcRenderer } from "electron";

// vvv....................................................................... // this copy of preload-types.ts: cannot be imported wo/ bundler
//
const ToMainKeys = {
    notify: 'notify',
    invokeFilesContent: 'tm-invoke-files-content',
};
//
// ^^^.......................................................................

const api: TmApi = {
    sendNotification: (message: string) => {
        ipcRenderer.send(ToMainKeys.notify, message);
    },
    invokeFilesContent: (filenames: string[]): Promise<FileContent[]> => {
        return ipcRenderer.invoke(ToMainKeys.invokeFilesContent, filenames);
    },
};

contextBridge.exposeInMainWorld('tmApi', api);
