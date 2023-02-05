import { contextBridge, ipcRenderer } from "electron";

const api: TmApi = {
    sendNotification: (message: string) => {
        ipcRenderer.send('notify', message);
    },
    openFiles: (filenames: string[]) => {
        ipcRenderer.send('tm-open-files', filenames);
    }
};

contextBridge.exposeInMainWorld('tmApi', api);
