import { contextBridge, ipcRenderer } from "electron";

const api: TmApi = {
    sendNotification: (message: string) => {
        ipcRenderer.send('notify', message);
    },
};

contextBridge.exposeInMainWorld('tmApi', api);
