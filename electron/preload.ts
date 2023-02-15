import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

//....................................................................... // this copy of preload-types.ts: cannot be imported wo/ bundler
const ToMainKeys = {
    notify: 'notify',
    invokeFilesContent: 'tm-invoke-files-content',
};

const ToRendererKeys = {
    menuCommand: 'tm-menu-command',
};
//.......................................................................

const api: TmApi = {
    sendNotification: (message: string) => {
        ipcRenderer.send(ToMainKeys.notify, message);
    },
    invokeFilesContent: (filenames: string[]): Promise<FileContent[]> => {
        return ipcRenderer.invoke(ToMainKeys.invokeFilesContent, filenames);
    },

    menuCommand: (callback: (event: /*IpcRendererEvent*/any, data: any) => void) => {
        ipcRenderer.on(ToRendererKeys.menuCommand, callback);
    }
};

contextBridge.exposeInMainWorld('tmApi', api);
