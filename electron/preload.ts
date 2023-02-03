import { contextBridge, ipcRenderer } from "electron";
import { domReady, useLoading } from "./preload_/init";


console.log('ipcRenderer', ipcRenderer);

contextBridge.exposeInMainWorld('tmApi', {
    sendNotification: (message) => {
        ipcRenderer.send('notify', message);
    }
});

//const { useLoading, domReady } = require(us);

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
    ev.data.payload === 'removeLoading' && removeLoading();
};

setTimeout(removeLoading, 4999);
