import { contextBridge, ipcRenderer } from "electron";

console.log('ipcRenderer', ipcRenderer);

contextBridge.exposeInMainWorld('tmApi', {
    sendNotification: (message) => {
        ipcRenderer.send('notify', message);
    }
});
