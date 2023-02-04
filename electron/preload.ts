import { contextBridge, ipcRenderer } from "electron";

const api: TmApi = {
    sendNotification: (message: string) => {
        ipcRenderer.send('notify', message);
    },
    startDrag: (filename: string) => {
        ipcRenderer.send('ondragstart', filename);
    }
};

contextBridge.exposeInMainWorld('tmApi', api);
